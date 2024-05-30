import { Prisma } from '@prisma/client'

export class LoginResponseDto {
  user: Prisma.UserCreateInput
}
