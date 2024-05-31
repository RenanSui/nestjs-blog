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
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
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
  async login(@Body() loginDto: AuthLoginDto, @Res() res: Response) {
    try {
      const accessToken = await this.authService.login(loginDto)

      if (!accessToken) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: [ReasonPhrases.NOT_FOUND],
          status: StatusCodes.NOT_FOUND,
        })
      }

      return res.status(StatusCodes.OK).json({
        data: { accessToken },
        message: [ReasonPhrases.OK],
        status: StatusCodes.OK,
      })
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: [ReasonPhrases.BAD_REQUEST],
        status: StatusCodes.BAD_REQUEST,
      })
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() CreateUserDto: AuthRegisterDto, @Res() res: Response) {
    try {
      const { accessToken, user } =
        await this.authService.register(CreateUserDto)

      if (user) {
        return res.status(StatusCodes.CONFLICT).json({
          message: [ReasonPhrases.CONFLICT],
          status: StatusCodes.CONFLICT,
        })
      }

      if (!accessToken) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: [ReasonPhrases.NOT_FOUND],
          status: StatusCodes.NOT_FOUND,
        })
      }

      return res.status(StatusCodes.OK).json({
        data: { accessToken },
        message: [ReasonPhrases.OK],
        status: StatusCodes.OK,
      })
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: [ReasonPhrases.BAD_REQUEST],
        status: StatusCodes.BAD_REQUEST,
      })
    }
  }
}
