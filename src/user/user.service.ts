import { Injectable } from '@nestjs/common'
import { Prisma, Role } from '@prisma/client'
import { Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { DatabaseService } from 'src/database/database.service'
import { ContextRequest, UserRequest } from 'src/types/request'

@Injectable()
export class UserService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly databaseService: DatabaseService) {}

  create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({ data: createUserDto })
  }

  findMe({ context: { user } }: ContextRequest<UserRequest>, res: Response) {
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: [ReasonPhrases.NOT_FOUND],
        status: StatusCodes.NOT_FOUND,
      })
    }

    return res.status(StatusCodes.OK).json({
      data: { ...user },
      message: [ReasonPhrases.OK],
      status: StatusCodes.OK,
    })
  }

  findAll(role?: Role) {
    if (role) {
      return this.databaseService.user.findMany({ where: { role } })
    }

    return this.databaseService.user.findMany()
  }

  findOne(id: string) {
    return this.databaseService.user.findUnique({ where: { id } })
  }

  findByEmail(email: string) {
    return this.databaseService.user.findUnique({ where: { email } })
  }

  // update(id: string, updateUserDto: Prisma.UserUpdateInput) {
  //   return this.databaseService.user.update({
  //     data: updateUserDto,
  //     where: { id },
  //   })
  // }

  // remove(id: string) {
  //   return this.databaseService.user.delete({ where: { id } })
  // }
}
