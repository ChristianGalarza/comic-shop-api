import { BadRequestException, Injectable } from '@nestjs/common';
import { PersonDto } from 'src/dto/Person.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'supabase/supabase.service';

@Injectable()
export class PersonService {
  constructor(
    private prisma: PrismaService,
    private supabase: SupabaseService,
  ) {}

  async findAll() {
    try {
      const people = await this.prisma.person.findMany();
      return {
        success: true,
        message: 'People obtained',
        data: people,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error obtaining people',
        details: error.message,
      };
    }
  }

  async findPersonById(id: number) {
    try {
      const person = await this.prisma.person.findUnique({
        where: {
          id: id,
        },
      });
      return {
        success: true,
        message: 'Person obtained',
        data: person,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error obtaining person',
        details: error.message,
      };
    }
  }

  async createPerson(person: PersonDto) {
    try {
      // 1. Verificamos si ya existe alguien con ese nombre para dar un error claro
      const existingPerson = await this.prisma.person.findUnique({
        where: { name: person.name },
      });

      if (existingPerson) {
        throw new BadRequestException(
          'Ya existe una persona registrada con ese nombre',
        );
      }

      // 2. Creación en la base de datos
      const newPerson = await this.prisma.person.create({
        data: {
          name: person.name,
          isWriter: person.isWriter,
          isDrawer: person.isDrawer,
        },
      });
      return {
        success: true,
        message: 'Persona creada exitosamente',
        data: newPerson,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al crear la persona',
        details: error.message,
      };
    }
  }
}
