import { Controller, Get, Param, Query, Req, Res } from '@nestjs/common'
import { Role } from '@prisma/client'
import { Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { ContextRequest, UserRequest } from 'src/types/request'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  findMe(@Req() req: ContextRequest<UserRequest>, @Res() res: Response) {
    const user = req.context.user

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

  @Get()
  findAll(@Query('role') role?: Role) {
    return this.userService.findAll(role)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: Prisma.UserUpdateInput,
  // ) {
  //   return this.userService.update(id, updateUserDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(id)
  // }
}
