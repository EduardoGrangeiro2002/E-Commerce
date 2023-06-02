import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { ErrorHandler } from 'src/base/utils/errorHandler';
import * as bcrypt from 'bcrypt';
import { env } from 'process';
import { Message } from 'src/base/utils/message';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async register(createUserDto: CreateUserDto): Promise<Message> {
    const checkIfEmailAlreadyInUse = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (checkIfEmailAlreadyInUse)
      throw new ErrorHandler('Email already in use', 403);

    await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await bcrypt.hash(
          createUserDto.password,
          parseInt(env.SALT_OR_ROUNDS),
        ),
      },
    });

    const response = new Message('Usuário registrado com sucesso');

    return response;
  }

  async findOne(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new ErrorHandler('Usuário não encontrado!');

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
