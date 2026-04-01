import { ApiProperty } from '@nestjs/swagger';
import { InventoryDto } from './Inventory.dto';

export class ComicDto {
  @ApiProperty({
    description: 'Title',
    example: 'Batman #1',
  })
  title: string;
  @ApiProperty({
    description: 'Publisher ID',
    example: '1',
  })
  publisherId: number;
  @ApiProperty({
    description: 'Description',
    example:
      'Bruce Wayne has a second life as batman and fight the crime at nights',
  })
  description: string;
  @ApiProperty({
    description: 'Writer ID',
    example: '1',
  })
  writerId: number;
  @ApiProperty({
    description: 'Drawer ID',
    example: '1',
  })
  drawerId: number;
  @ApiProperty({
    description: 'Price',
    example: '91.00',
  })
  price: number;
  @ApiProperty({
    description: 'Image File',
    type: 'string',
    format: 'binary',
    required: false,
  })
  image: any;
  @ApiProperty({
    description: 'Release Date',
    example: '2025-12-03T00:00:00.000Z',
  })
  releaseDate: Date;
  @ApiProperty({
    description: 'Inventory',
    example: '1000',
  })
  inventory?: number;
}
