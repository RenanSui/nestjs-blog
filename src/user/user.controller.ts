import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { ContextRequest, UserRequest } from 'src/types/request'
import { UserService } from './user.service'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('user')
export class UserController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
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

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.userService.findOne(id)

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
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: [ReasonPhrases.INTERNAL_SERVER_ERROR],
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      })
    }
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
