import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderItem } from '@prisma/client';
import { CreateOrderDto } from 'src/dto/Order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: number, orderItems: CreateOrderDto) {
    try {
      const { addressId, items } = orderItems;

      return await this.prisma.$transaction(async (prisma) => {
        //Getting the address
        const address = await prisma.address.findUnique({
          where: { id: addressId },
        });
        if (!address) throw new BadRequestException('Address not found');

        const shippingAddressSnapshot = `${address.street}, ${address.city}, ${address.state}, CP: ${address.zipCode}`;

        let orderTotal = 0;
        const orderItemsData: Array<{
          comicId: number;
          quantity: number;
          price: number;
        }> = [];

        // Check price and inventory for the items
        for (const item of items) {
          const comic = await prisma.comic.findUnique({
            where: { id: item.comicId },
            include: { inventory: true },
          });

          if (
            !comic ||
            !comic.inventory ||
            comic.inventory.quantity < item.quantity
          ) {
            throw new BadRequestException(
              `Insufficient inventory for comic ID: ${item.comicId || comic?.title}`,
            );
          }

          // Calculate total price
          orderTotal += comic.price * item.quantity;
          orderItemsData.push({
            comicId: item.comicId,
            quantity: item.quantity,
            price: comic.price,
          });

          // Update inventory
          await prisma.inventory.update({
            where: { comicId: comic.id },
            data: { quantity: { decrement: item.quantity } },
          });
        }

        // Create the order
        const order = await prisma.order.create({
          data: {
            userId,
            total: orderTotal,
            shippingAddress: shippingAddressSnapshot,
            status: 'PENDING',
            items: {
              create: orderItemsData,
            },
          },
          include: {
            items: true,
          },
        });
        return {
          success: true,
          message: 'Order created successfully',
          order,
        };
      });
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create order',
        details: error.message,
      };
    }
  }
}
