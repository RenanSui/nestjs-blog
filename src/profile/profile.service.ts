import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class ProfileService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly databaseService: DatabaseService) {}

  create(createProfileDto: Prisma.ProfileCreateInput) {
    return this.databaseService.profile.create({ data: createProfileDto })
  }

  findAll(skip = 0, take = 7) {
    return this.databaseService.profile.findMany({ skip, take })
  }

  findCount() {
    return this.databaseService.profile.count()
  }

  findById(id: string) {
    return this.databaseService.profile.findUnique({ where: { id } })
  }

  findByUserId(userId: string) {
    return this.databaseService.profile.findUnique({ where: { userId } })
  }

  findByUsername(username: string) {
    return this.databaseService.profile.findUnique({ where: { username } })
  }

  updateProfile({
    id,
    name,
    userId,
  }: Pick<Prisma.ProfileUpdateInput, 'id' | 'name'> & { userId?: string }) {
    if (typeof id !== 'string') {
      return null
    }

    return this.databaseService.profile.update({
      data: { name },
      where: { id, userId },
    })
  }

  updateUsername({
    id,
    username,
    userId,
  }: Pick<Prisma.ProfileUpdateInput, 'id' | 'username'> & { userId?: string }) {
    if (typeof id !== 'string') {
      return null
    }

    return this.databaseService.profile.update({
      data: { username },
      where: { id, userId },
    })
  }

  updateAvatar({
    id,
    image,
    userId,
  }: Pick<Prisma.ProfileUpdateInput, 'id' | 'image'> & { userId?: string }) {
    if (typeof id !== 'string') {
      return null
    }

    return this.databaseService.profile.update({
      data: { image },
      where: { id, userId },
    })
  }

  updateBio({
    id,
    bio,
    userId,
  }: Pick<Prisma.ProfileUpdateInput, 'id' | 'bio'> & { userId?: string }) {
    if (typeof id !== 'string') {
      return null
    }

    return this.databaseService.profile.update({
      data: { bio },
      where: { id, userId },
    })
  }
}
