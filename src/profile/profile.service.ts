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

  findAll() {
    return this.databaseService.profile.findMany()
  }

  findByUserId(userId: string) {
    return this.databaseService.profile.findUnique({ where: { userId } })
  }

  // findAll() {
  //   return `This action returns all profile`
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} profile`
  // }

  // update(id: number, updateProfileDto: Prisma.ProfileUpdateInput) {
  //   return `This action updates a #${id} profile`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} profile`
  // }
}
