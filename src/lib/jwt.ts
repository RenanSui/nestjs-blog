import { Prisma } from '@prisma/client'
import * as jwt from 'jsonwebtoken'
import { AccessToken, JwtUser } from 'src/types/jwt'

export const jwtSign = (id: Prisma.UserCreateInput['id']): AccessToken => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  })
  return { accessToken }
}

export const jwtVerify = ({ accessToken }: { accessToken: string }) => {
  return jwt.verify(accessToken, process.env.JWT_SECRET) as JwtUser
}
