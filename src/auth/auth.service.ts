import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { comparePassword } from 'src/lib/auth'
import { createHash } from 'src/lib/hash'
import { jwtSign } from 'src/lib/jwt'
import { ProfileService } from 'src/profile/profile.service'
import { UserService } from 'src/user/user.service'
import { generateFromEmail, generateUsername } from 'unique-username-generator'

@Injectable()
export class AuthService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
  ) {}

  async login({ email, password }: Prisma.UserCreateInput) {
    const userByEmail = await this.userService.findByEmail(email)
    if (!userByEmail) return null

    const isPasswordEqual = comparePassword(password, userByEmail.password)
    if (!isPasswordEqual) return null

    const { accessToken } = jwtSign(userByEmail.id)
    if (!accessToken) return null

    return accessToken
  }

  async register({ email, password }: Prisma.UserCreateInput) {
    const userByEmail = await this.userService.findByEmail(email)
    if (userByEmail) return { user: userByEmail }

    const hashedPassword = await createHash(password)

    const user = await this.userService.create({
      email,
      password: hashedPassword,
    })
    if (!user) return null

    const profile = await this.profileService.create({
      name: generateUsername(),
      username: `${generateUsername()}-${generateFromEmail(user.email, 4)}`,
      user: { connect: { id: user.id } },
      bio: '',
      image: '',
    })
    if (!profile) return null

    const { accessToken } = jwtSign(user.id)
    return { accessToken }
  }
}
