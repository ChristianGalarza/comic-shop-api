import { ApiProperty } from '@nestjs/swagger';

export class InventoryDto {
  @ApiProperty({
    description: 'Quantity',
    example: '1000',
  })
  quantity: number;
}
