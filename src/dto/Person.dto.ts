import { ApiProperty } from '@nestjs/swagger';

export class PersonDto {
  @ApiProperty({
    description: 'Name of the person',
    example: 'Stan Lee',
  })
  name: string;
  @ApiProperty({
    description: 'Indica si es escritor',
    example: true,
  })
  isWriter: boolean;
  @ApiProperty({
    description: 'Indica si es dibujante',
    example: false,
  })
  isDrawer: boolean;
}
