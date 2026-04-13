import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Delete,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ComicDto } from 'src/dto/Comic.dto';
import { ComicService } from 'src/services/Comic.service';

@Controller('comics')
export class ComicController {
  constructor(private comicService: ComicService) {}

  @Get()
  async findAll() {
    return await this.comicService.findAll();
  }

  @Get('new-arrivals')
  @ApiOperation({ summary: 'Get lastest comics for homepage' })
  async findLatestArrivals() {
    return await this.comicService.findNewArrivals(4);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  async findComicById(@Param('id', ParseIntPipe) id: number) {
    return await this.comicService.findComicById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create comic' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ComicDto })
  @UseInterceptors(FileInterceptor('image'))
  async createComic(
    @Body() comic: ComicDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.comicService.createComic(comic, file);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  async deleteComic(@Param('id', ParseIntPipe) id: number) {
    return await this.comicService.deleteById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update comic' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    type: ComicDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  async updateComicById(
    @Param('id', ParseIntPipe) id: number,
    @Body() comic: ComicDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.comicService.updateComicById(id, comic, file);
  }
}
