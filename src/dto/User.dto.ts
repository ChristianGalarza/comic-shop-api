import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  name: string;
  @ApiProperty({
    description: 'Email of the user',
    example: 'john.doe@example.com',
  })
  email: string;
  @ApiProperty({
    description: 'Password of the user',
    example: 'password123',
  })
  password: string;
}
