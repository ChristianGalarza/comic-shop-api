import { ApiProperty } from '@nestjs/swagger';

export class PublisherDto {
  @ApiProperty({
    description: 'Publisher name',
    example: 'DC Comics',
  })
  name: string;
}
