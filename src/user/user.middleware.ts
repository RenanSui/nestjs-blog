import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { getAccessTokenFromHeaders } from 'src/lib/headers'
import { jwtVerify } from 'src/lib/jwt'
import { UserService } from 'src/user/user.service'

@Injectable()
export class UserMiddleware implements NestMiddleware {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      Object.assign(req, { context: {} })

      const { accessToken } = getAccessTokenFromHeaders(req.headers)
      if (!accessToken) return next()

      const { id } = jwtVerify({ accessToken })
      if (!id) return next()

      const user = await this.userService.findOne(id)
      if (!user) return next()

      Object.assign(req, {
        context: {
          user,
          accessToken,
        },
      })

      next()
    } catch (error) {
      return next()
    }
  }
}
