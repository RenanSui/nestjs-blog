import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
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

  @Get()
  findAll() {
    return this.profileService.findAll()
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
