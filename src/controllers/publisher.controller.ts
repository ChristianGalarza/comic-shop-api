import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { PublisherDto } from 'src/dto/PublisherDto.dto';
import { PublisherService } from 'src/services/Publisher.service';

@Controller('publishers')
export class PublisherController {
  constructor(private publisherService: PublisherService) {}

  @Get()
  async findAll() {
    return await this.publisherService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  async findPublisherById(@Param('id', ParseIntPipe) id: number) {
    return await this.publisherService.findPublisherById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create publisher' })
  @ApiBody({ type: PublisherDto })
  async createPublisher(@Body() publisher: PublisherDto) {
    return await this.publisherService.createPublisher(publisher);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  async deletePublisher(@Param('id', ParseIntPipe) id: number) {
    return await this.publisherService.deleteById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update publisher' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    type: PublisherDto,
  })
  async updatePublisherById(
    @Param('id', ParseIntPipe) id: number,
    @Body() publisher: PublisherDto,
  ) {
    return await this.publisherService.updateById(id, publisher);
  }
}
