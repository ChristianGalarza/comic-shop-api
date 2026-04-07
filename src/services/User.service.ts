import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bycrypt from 'bcrypt';
import { UserDto } from 'src/dto/User.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const users = await this.prisma.user.findMany({
        include: {
          addresses: true, // Include related addresses in the response
        },
      });
      return {
        success: true,
        message: 'Users obtained',
        data: users,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error obtaining users',
        details: error.message,
      };
    }
  }

  async findUserById(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          addresses: true, // Include related addresses in the response
        },
      });
      return {
        success: true,
        message: 'User obtained',
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error obtaining user',
        details: error.message,
      };
    }
  }

  async createUser(user: UserDto) {
    try {
      // 1. Veryfi if user with the same email already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: user.email },
      });
      if (existingUser) {
        throw new BadRequestException(
          'Ya existe un usuario registrado con ese correo electrónico',
        );
      }

      // Hash password
      const hashedPassword = await bycrypt.hash(user.password, 10);

      // 2. Create user in the database
      const newUser = await this.prisma.user.create({
        data: {
          email: user.email,
          password: hashedPassword,
          name: user.name,
        },
      });
      const { password: _, ...userWithoutPassword } = newUser; // Exclude password from the response
      return {
        success: true,
        message: 'Persona creatada exitosamente',
        data: userWithoutPassword,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error creating user',
        details: error.message,
      };
    }
  }
}
