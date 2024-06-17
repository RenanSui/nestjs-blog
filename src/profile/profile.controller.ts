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
import { ContextRequest, ProfileRequest } from 'src/types/request'
import { ProfileGuard } from './profile.guard'
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

  @Post('update')
  @UseGuards(ProfileGuard)
  async updateProfile(
    @Body() updateData: Prisma.ProfileUpdateInput & { userId?: string },
    @Req() req: ContextRequest<ProfileRequest>,
    @Res() res: Response,
  ) {
    const { profile } = req.context
    try {
      if (!profile) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: ReasonPhrases.UNAUTHORIZED,
          status: StatusCodes.UNAUTHORIZED,
        })
      }

      await this.profileService.updateProfile(updateData)
      return res.status(StatusCodes.OK).json({
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

  @Post('update/username')
  @UseGuards(ProfileGuard)
  async updateUsername(
    @Body() updateData: Prisma.ProfileUpdateInput & { userId?: string },
    @Req() req: ContextRequest<ProfileRequest>,
    @Res() res: Response,
  ) {
    const { profile } = req.context
    try {
      if (!profile) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: ReasonPhrases.UNAUTHORIZED,
          status: StatusCodes.UNAUTHORIZED,
        })
      }

      const username = updateData.username
      if (typeof username !== 'string') {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: [ReasonPhrases.BAD_REQUEST],
          status: StatusCodes.BAD_REQUEST,
        })
      }

      const isProfileExist = await this.profileService.findByUsername(username)
      if (isProfileExist) {
        return res.status(StatusCodes.CONFLICT).json({
          message: ReasonPhrases.CONFLICT,
          status: StatusCodes.CONFLICT,
        })
      }

      await this.profileService.updateUsername(updateData)
      return res.status(StatusCodes.OK).json({
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

  @Post('update/avatar')
  @UseGuards(ProfileGuard)
  async updateImage(
    @Body() updateData: Prisma.ProfileUpdateInput & { userId?: string },
    @Req() req: ContextRequest<ProfileRequest>,
    @Res() res: Response,
  ) {
    const { profile } = req.context
    try {
      if (!profile) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: ReasonPhrases.UNAUTHORIZED,
          status: StatusCodes.UNAUTHORIZED,
        })
      }

      await this.profileService.updateAvatar(updateData)
      return res.status(StatusCodes.OK).json({
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

  @Post('update/bio')
  @UseGuards(ProfileGuard)
  async updateBio(
    @Body() updateData: Prisma.ProfileUpdateInput & { userId?: string },
    @Req() req: ContextRequest<ProfileRequest>,
    @Res() res: Response,
  ) {
    const { profile } = req.context
    try {
      if (!profile) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: ReasonPhrases.UNAUTHORIZED,
          status: StatusCodes.UNAUTHORIZED,
        })
      }

      await this.profileService.updateBio(updateData)
      return res.status(StatusCodes.OK).json({
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

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.profileService.remove(+id)
  // }
}
