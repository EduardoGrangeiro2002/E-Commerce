import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.JWT_CONSTANTS,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
