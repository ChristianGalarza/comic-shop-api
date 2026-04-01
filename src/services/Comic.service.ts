import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ComicDto } from 'src/dto/Comic.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'supabase/supabase.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ComicService {
  constructor(
    private prisma: PrismaService,
    private supabase: SupabaseService,
  ) {}

  async findAll() {
    try {
      const comics = await this.prisma.comic.findMany({
        include: {
          inventory: true,
          publisher: true,
          writer: true,
          drawer: true,
        },
      });
      return {
        success: true,
        message: 'Comics obtenidos',
        data: comics,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al obtener comics',
        details: error.message,
      };
    }
  }

  async findComicById(id: number) {
    try {
      const comic = await this.prisma.comic.findUnique({
        where: {
          id: id,
        },
        include: {
          inventory: true,
          publisher: true,
          writer: true,
          drawer: true,
        },
      });
      return {
        success: true,
        message: 'Comics Requested',
        data: comic,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error requesting comics',
        details: error.message,
      };
    }
  }

  async createComic(newComicDto: ComicDto, file: Express.Multer.File) {
    let fileName: string | null = null;
    let imageUploaded = false;
    try {
      if (!file) throw new BadRequestException('Must upload image');

      const supabase = this.supabase.getClient();
      fileName = `${uuid()}-${file.originalname}`;

      // Subir imagen al bucket
      const { data: uploadData, error } = await supabase.storage
        .from('comics-images')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

      if (error)
        throw new BadRequestException('Error al subir imagen a Supabase');

      imageUploaded = true;

      // Obtener URL pública
      const {
        data: { publicUrl },
      } = supabase.storage.from('comics-images').getPublicUrl(fileName);

      const transactionResult = await this.prisma.$transaction(
        async (prisma) => {
          const comic = await this.prisma.comic.create({
            data: {
              title: newComicDto.title,
              description: newComicDto.description,
              price: parseFloat(newComicDto.price.toString()),
              imageUrl: publicUrl,
              releaseDate: newComicDto.releaseDate,

              publisher: { connect: { id: Number(newComicDto.publisherId) } },
              writer: { connect: { id: Number(newComicDto.writerId) } },
              drawer: { connect: { id: Number(newComicDto.drawerId) } },
            },
          });
          const inventory = await this.prisma.inventory.create({
            data: {
              comicId: comic.id,
              quantity: Number(newComicDto.inventory) || 0,
            },
          });
          return { comic, inventory };
        },
      );
      return {
        success: true,
        message: 'Comic created',
        data: {
          comic: transactionResult.comic,
          inventory: transactionResult.inventory,
        },
      };
    } catch (error) {
      if (imageUploaded && fileName) {
        await this.rollbackImageUpload(fileName);
      }
      return {
        success: false,
        message: 'Error creating comic',
        details: error.message,
      };
    }
  }

  async deleteById(id: number) {
    try {
      const transactionResult = await this.prisma.$transaction(
        async (prisma) => {
          const deletedComic = await this.prisma.comic.delete({
            where: {
              id: id,
            },
            include: {
              inventory: true,
            },
          });
          return { deletedComic };
        },
      );
      await this.rollbackImageUpload(transactionResult.deletedComic.imageUrl);
      return {
        success: true,
        message: 'Comics Deleted',
        data: {
          deletedComic: transactionResult.deletedComic,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al obtener comics',
        details: error.message,
      };
    }
  }

  async updateComicById(
    id: number,
    updateComicDto: ComicDto,
    file?: Express.Multer.File,
  ) {
    let newFileName: string | null = null;
    let newImageUploaded = false;
    let oldImageUrl: string | null = null;

    try {
      // Obtener comic para tener imagen anterior
      const existingComic = await this.prisma.comic.findUnique({
        where: { id },
        select: { imageUrl: true },
      });

      if (!existingComic) {
        throw new NotFoundException('Comic not found');
      }

      oldImageUrl = existingComic.imageUrl;

      let newImageUrl: string | undefined;
      if (file) {
        newImageUrl = await this.uploadNewImage(file);
        newFileName = this.extractFileNameFromUrl(newImageUrl); // Para rollback
        newImageUploaded = true;
      }

      const transactionResult = await this.prisma.$transaction(
        async (prisma) => {
          const comic = await this.prisma.comic.update({
            where: {
              id: id,
            },
            data: {
              title: updateComicDto.title,
              description: updateComicDto.description,
              price: parseFloat(updateComicDto.price.toString()),
              ...(newImageUrl && { imageUrl: newImageUrl }),
              releaseDate: updateComicDto.releaseDate,

              ...(updateComicDto.publisherId && {
                publisher: {
                  connect: { id: Number(updateComicDto.publisherId) },
                },
              }),
              ...(updateComicDto.writerId && {
                writer: { connect: { id: Number(updateComicDto.writerId) } },
              }),
              ...(updateComicDto.drawerId && {
                drawer: { connect: { id: Number(updateComicDto.drawerId) } },
              }),
            },
          });
          const inventory = await this.prisma.inventory.update({
            where: {
              comicId: comic.id,
            },
            data: {
              quantity: Number(updateComicDto.inventory),
            },
          });
          return { comic, inventory };
        },
      );

      // ELIMINAR IMAGEN ANTERIOR si se subió una nueva
      if (newImageUploaded && oldImageUrl) {
        await this.deleteOldImage(oldImageUrl);
      }
      return {
        success: true,
        message: 'Comic updated',
        data: {
          comic: transactionResult.comic,
          inventory: transactionResult.inventory,
        },
      };
    } catch (error) {
      if (newImageUploaded && newFileName) {
        await this.rollbackImageUpload(newFileName);
      }
      return {
        success: false,
        message: 'Error updating comic',
        details: error.message,
      };
    }
  }

  private async rollbackImageUpload(fileName: string): Promise<void> {
    try {
      const supabase = this.supabase.getClient();

      const { error } = await supabase.storage
        .from('comics-images')
        .remove([fileName]);

      if (error) {
        console.error(
          '❌ Failed to delete image during rollback:',
          fileName,
          error.message,
        );
        // No throw aquí para no enmascarar el error original
      } else {
        console.log('✅ Image rollback successful:', fileName);
      }
    } catch (rollbackError) {
      console.error(
        '❌ Unexpected error during image rollback:',
        rollbackError,
      );
    }
  }

  private async uploadNewImage(file: Express.Multer.File): Promise<string> {
    const supabase = this.supabase.getClient();
    const fileName = `${uuid()}-${file.originalname}`;

    const { error } = await supabase.storage
      .from('comics-images')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw new BadRequestException(`Error uploading image: ${error.message}`);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('comics-images').getPublicUrl(fileName);

    return publicUrl;
  }

  /**
   * Extrae el nombre del archivo desde la URL de Supabase
   */
  private extractFileNameFromUrl(imageUrl: string): string {
    // La URL de Supabase tiene formato: https://.../comics-images/filename.jpg
    const urlParts = imageUrl.split('/');
    return urlParts[urlParts.length - 1]; // Retorna el nombre del archivo
  }

  private async deleteOldImage(oldImageUrl: string): Promise<void> {
    try {
      const fileName = this.extractFileNameFromUrl(oldImageUrl);
      const supabase = this.supabase.getClient();

      const { error } = await supabase.storage
        .from('comics-images')
        .remove([fileName]);

      if (error) {
        console.error(
          '❌ Failed to delete old image:',
          fileName,
          error.message,
        );
        // No throw para no afectar el flujo principal
      } else {
        console.log('✅ Old image deleted successfully:', fileName);
      }
    } catch (error) {
      console.error('❌ Unexpected error deleting old image:', error);
    }
  }
}
