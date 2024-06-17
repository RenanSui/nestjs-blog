import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { AuthGuard } from 'src/auth/auth.guard'
import { ContextRequest, ProfileRequest } from 'src/types/request'
import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: Prisma.ProfileCreateInput) {
    return this.profileService.create(createProfileDto)
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  findMe(
    @Req() { context: { profile } }: ContextRequest<ProfileRequest>,
    @Res() res: Response,
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

  @Get('/username/:username')
  async findByUsername(
    @Param('username') username: string,
    @Res() res: Response,
  ) {
    try {
      const profile = await this.profileService.findByUsername(username)
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
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: [ReasonPhrases.BAD_REQUEST],
        status: StatusCodes.BAD_REQUEST,
      })
    }
  }

  @Get('/id/:userId')
  async findByUserId(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const profile = await this.profileService.findByUserId(userId)
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
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: [ReasonPhrases.BAD_REQUEST],
        status: StatusCodes.BAD_REQUEST,
      })
    }
  }

  // @Get()
  // findAll() {
  //   return this.profileService.findAll()
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.profileService.findOne(+id)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
  //   return this.profileService.update(+id, updateProfileDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.profileService.remove(+id)
  // }
}
