import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UserDto } from 'src/dto/User.dto';
import { UserService } from 'src/services/User.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: UserDto })
  async createUser(@Body() user: UserDto) {
    return await this.userService.createUser(user);
  }
}
