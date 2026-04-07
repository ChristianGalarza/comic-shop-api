import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'supabase/supabase.service';

@Injectable()
export class PublisherService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const publishers = await this.prisma.publisher.findMany();
      return {
        success: true,
        message: 'Publishers obtenidos',
        data: publishers,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al obtener publishers',
        details: error.message,
      };
    }
  }

  async findPublisherById(id: number) {
    try {
      const publisher = await this.prisma.publisher.findUnique({
        where: {
          id: id,
        },
      });
      return {
        success: true,
        message: 'Publisher Requested',
        data: publisher,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al obtener publisher',
        details: error.message,
      };
    }
  }

  async createPublisher(publisher: { name: string }) {
    try {
      const newPublisher = await this.prisma.publisher.create({
        data: publisher,
      });
      return {
        success: true,
        message: 'Publisher creado',
        data: newPublisher,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al crear publisher',
        details: error.message,
      };
    }
  }

  async deleteById(id: number) {
    try {
      await this.prisma.publisher.delete({
        where: {
          id: id,
        },
      });
      return {
        success: true,
        message: 'Publisher eliminado',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al eliminar publisher',
        details: error.message,
      };
    }
  }

  async updateById(id: number, publisher: { name: string }) {
    try {
      const updatedPublisher = await this.prisma.publisher.update({
        where: {
          id: id,
        },
        data: publisher,
      });
      return {
        success: true,
        message: 'Publisher actualizado',
        data: updatedPublisher,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al actualizar publisher',
        details: error.message,
      };
    }
  }
}
