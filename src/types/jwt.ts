import { Prisma } from '@prisma/client'

export interface JwtUser {
  id: Prisma.UserCreateInput['id']
}

export interface AccessToken {
  accessToken: string
}
