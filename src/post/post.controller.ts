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
import { ContextRequest, UserRequest } from 'src/types/request'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async create(
    @Req() req: ContextRequest<UserRequest>,
    @Body() createPostDto: Prisma.PostCreateInput,
    @Res() res: Response,
  ) {
    try {
      const { user } = req.context
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: ReasonPhrases.UNAUTHORIZED,
          status: StatusCodes.UNAUTHORIZED,
        })
      }

      const post = await this.postService.create(createPostDto, user)
      return res.status(StatusCodes.OK).json({
        data: { ...post },
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

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const posts = await this.postService.findAll()
      return res.status(StatusCodes.OK).json({
        data: [...posts],
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

  @Get(':id')
  async findById(@Res() res: Response, @Param('id') id: string) {
    try {
      const post = await this.postService.findById(id)
      if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: [ReasonPhrases.NOT_FOUND],
          status: StatusCodes.NOT_FOUND,
        })
      }

      return res.status(StatusCodes.OK).json({
        data: { ...post },
        message: [ReasonPhrases.OK],
        status: StatusCodes.OK,
      })
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      })
    }
  }

  @Get('user/:userId')
  async postByUserId(@Res() res: Response, @Param('userId') userId: string) {
    try {
      const posts = await this.postService.postByUserId(userId)
      return res.status(StatusCodes.OK).json({
        data: [...posts],
        message: [ReasonPhrases.OK],
        status: StatusCodes.OK,
      })
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      })
    }
  }
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePostDto: Prisma.PostUpdateInput,
  // ) {
  //   return this.postService.update(+id, updatePostDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postService.remove(+id)
  // }
}
