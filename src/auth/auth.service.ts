import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: LoginUserDto) {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) throw new UnauthorizedException();

    const result = await bcrypt.compare(password, user.password);

    if (!result) throw new UnauthorizedException();

    const payload = { sub: user.idUser, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
