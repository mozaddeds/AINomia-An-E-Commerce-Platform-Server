import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return { id: newUser.id, name: newUser.name, email: newUser.email };
  }

   async findOne(userId: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
