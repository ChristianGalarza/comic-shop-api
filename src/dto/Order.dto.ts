import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty({
    description: 'The id of the comic to be included in the order',
    example: '1',
  })
  comicId: number;
  @ApiProperty({
    description: 'The quantity of the comic to be included in the order',
    example: '2',
  })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'The id of the address to which the order will be shipped',
    example: '1',
  })
  addressId: number;
  @ApiProperty({
    description: 'The items that will be included in the order',
    example: [
      {
        comicId: 1,
        quantity: 2,
      },
    ],
  })
  items: OrderItemDto[];
}
