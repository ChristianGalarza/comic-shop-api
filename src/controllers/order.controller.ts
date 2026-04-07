import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateOrderDto } from 'src/dto/Order.dto';
import { OrderService } from 'src/services/Order.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post(':userId')
  async createOrder(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.createOrder(userId, createOrderDto);
  }
}
