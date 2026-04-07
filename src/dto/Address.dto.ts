import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty({
    description: 'Street of the address',
    example: '123 Main St',
  })
  street: string;
  @ApiProperty({
    description: 'City of the address',
    example: 'CDMX',
  })
  city: string;
  @ApiProperty({
    description: 'State of the address',
    example: 'Chihuahua',
  })
  state: string;
  @ApiProperty({
    description: 'Zip code of the address',
    example: '12345',
  })
  zipCode: string;
  @ApiProperty({
    description: 'Country of the Address',
    example: 'México',
  })
  country: string;
  @ApiProperty({
    description: 'Additional references for the address',
    example: 'Near the park',
  })
  references: string;
  @ApiProperty({
    description: 'Is this the default address for the user?',
    example: false,
  })
  isDefault: boolean;
}
