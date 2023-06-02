import {
  IsString,
  MinLength,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @IsStrongPassword()
  password: string;
}
