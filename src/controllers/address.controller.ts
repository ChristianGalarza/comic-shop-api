import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { AddressDto } from 'src/dto/Address.dto';
import { AddressService } from 'src/services/Address.service';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get()
  async findAll() {
    return await this.addressService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  async findAddressById(@Param('id', ParseIntPipe) id: number) {
    return await this.addressService.findAddressById(id);
  }

  @Post(':userId')
  @ApiOperation({ summary: 'Create address' })
  @ApiBody({ type: AddressDto })
  async createAddress(
    @Body() address: AddressDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.addressService.createAddress(address, userId);
  }
}
