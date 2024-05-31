import { Prisma } from '@prisma/client'
import { Request } from 'express'

export interface ContextRequest<T> extends Omit<Request, 'context'> {
  context: T
}

export interface UserRequest {
  user: Prisma.UserCreateInput
  accessToken: string
}

export interface ProfileRequest {
  profile: Prisma.ProfileCreateInput
  accessToken: string
}
