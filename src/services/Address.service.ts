import { Injectable } from '@nestjs/common';
import { AddressDto } from 'src/dto/Address.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const addresses = await this.prisma.address.findMany();
      return {
        success: true,
        message: 'Addresses obtained',
        data: addresses,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error obtaining addresses',
        details: error.message,
      };
    }
  }

  async findAddressById(id: number) {
    try {
      const address = await this.prisma.address.findUnique({
        where: { id: id },
      });
      return {
        success: true,
        message: 'Address obtained',
        data: address,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error obtaining address',
        details: error.message,
      };
    }
  }

  async createAddress(address: AddressDto, userId: number) {
    try {
      // verifyif this new address is default, if so, set previous default to false
      if (address.isDefault) {
        await this.prisma.address.updateMany({
          where: {
            userId: userId,
            isDefault: true,
          },
          data: {
            isDefault: false,
          },
        });
      }

      // if the user has no addresses, set this one as default
      const addressCount = await this.prisma.address.count({
        where: { userId: userId },
      });
      const shouldBeDefault = addressCount === 0 ? true : address.isDefault;

      //Create new address
      const newAddress = await this.prisma.address.create({
        data: {
          ...address,
          userId,
          isDefault: shouldBeDefault || false,
        },
      });
      return {
        success: true,
        message: 'Address created',
        data: newAddress,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error creating address',
        details: error.message,
      };
    }
  }
}
