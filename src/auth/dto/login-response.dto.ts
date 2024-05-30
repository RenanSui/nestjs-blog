import { Prisma } from '@prisma/client'

export class LoginResponseDto {
  // @ApiResponseProperty()
  // token: string

  // @ApiResponseProperty()
  // refreshToken: string

  // @ApiResponseProperty()
  // tokenExpires: number

  // @ApiResponseProperty({
  //   type: () => Prisma.UserCreateInput,
  // })
  user: Prisma.UserCreateInput
}
