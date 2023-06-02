import { HttpException } from '@nestjs/common';

export class ErrorHandler extends HttpException {
  constructor(msg: string, status = 404) {
    super(msg, status);
  }
}
