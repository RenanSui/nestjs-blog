import { HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { comparePassword } from 'src/lib/auth'
import { createHash } from 'src/lib/hash'
import { jwtSign } from 'src/lib/jwt'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly userService: UserService) {}

  async login({ email, password }: Prisma.UserCreateInput, res: Response) {
    try {
      const userByEmail = await this.userService.findByEmail(email)
      const isPasswordEqual = comparePassword(password, userByEmail.password)

      if (!userByEmail || !isPasswordEqual) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: [ReasonPhrases.NOT_FOUND],
          status: StatusCodes.NOT_FOUND,
        })
      }

      const { accessToken } = jwtSign(userByEmail.id)

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

  async register({ email, password }: Prisma.UserCreateInput, res: Response) {
    try {
      const userByEmail = await this.userService.findByEmail(email)
      if (userByEmail) {
        return res.status(HttpStatus.CONFLICT).json({
          message: [ReasonPhrases.CONFLICT],
          status: StatusCodes.CONFLICT,
        })
      }

      const hashedPassword = await createHash(password)
      const user = await this.userService.create({
        email,
        password: hashedPassword,
      })

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: [ReasonPhrases.NOT_FOUND],
          status: StatusCodes.NOT_FOUND,
        })
      }

      const { accessToken } = jwtSign(user.id)

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
