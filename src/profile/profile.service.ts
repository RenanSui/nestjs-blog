import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { DatabaseService } from 'src/database/database.service'
import { ContextRequest, ProfileRequest } from 'src/types/request'

@Injectable()
export class ProfileService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly databaseService: DatabaseService) {}

  create(createProfileDto: Prisma.ProfileCreateInput) {
    return this.databaseService.profile.create({ data: createProfileDto })
  }

  findMe(
    { context: { profile } }: ContextRequest<ProfileRequest>,
    res: Response,
  ) {
    if (!profile) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: [ReasonPhrases.NOT_FOUND],
        status: StatusCodes.NOT_FOUND,
      })
    }

    return res.status(StatusCodes.OK).json({
      data: { ...profile },
      message: [ReasonPhrases.OK],
      status: StatusCodes.OK,
    })
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
