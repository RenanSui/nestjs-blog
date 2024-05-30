import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { AuthLoginDto } from './dto/auth-login.dto'
import { AuthRegisterDto } from './dto/auth-register.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: AuthLoginDto, @Res() res: Response) {
    return this.authService.login(loginDto, res)
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() CreateUserDto: AuthRegisterDto, @Res() res: Response) {
    return this.authService.register(CreateUserDto, res)
  }
}
