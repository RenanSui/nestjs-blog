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
import { Request, Response } from 'express'
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
  async findAll(@Req() req: Request, @Res() res: Response) {
    try {
      const postCount = await this.postService.findCount()
      const skip = Number(req.query.skip) || 0
      const take = Number(req.query.take) || 7
      const hasNextPage = postCount > skip + take

      const posts = await this.postService.findAll(skip, take)
      if (!posts) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: [ReasonPhrases.NOT_FOUND],
          status: StatusCodes.NOT_FOUND,
        })
      }

      return res.status(StatusCodes.OK).json({
        data: [...posts],
        hasNextPage,
        skip: skip + take,
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

  @Get('id/:id')
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

  @Get('search')
  async findBySearch(@Res() res: Response, @Req() req: Request) {
    try {
      const searchQuery = req.query.searchQuery?.toString() || ''
      const postCount = await this.postService.findCountBySearch(searchQuery)

      const skip = Number(req.query.skip) || 0
      const take = Number(req.query.take) || 7
      const hasNextPage = postCount > skip + take

      const posts = await this.postService.findBySearch(searchQuery, skip, take)

      if (!posts) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: [ReasonPhrases.NOT_FOUND],
          status: StatusCodes.NOT_FOUND,
        })
      }

      return res.status(StatusCodes.OK).json({
        data: [...posts],
        hasNextPage,
        skip: skip + take,
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
  async postByUserId(
    @Res() res: Response,
    @Req() req: Request,
    @Param('userId') userId: string,
  ) {
    try {
      const postCount = await this.postService.findCountByUserId(userId)
      const skip = Number(req.query.skip) || 0
      const take = Number(req.query.take) || 7
      const hasNextPage = postCount > skip + take

      const posts = await this.postService.postByUserId(userId, skip, take)
      if (!posts) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: [ReasonPhrases.NOT_FOUND],
          status: StatusCodes.NOT_FOUND,
        })
      }

      return res.status(StatusCodes.OK).json({
        data: [...posts],
        hasNextPage,
        skip: skip + take,
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

  @Post('update')
  @UseGuards(AuthGuard)
  async update(
    @Body()
    { id, authorId, body }: Prisma.PostUpdateInput & { authorId: string },
    @Req() { context: { user } }: ContextRequest<UserRequest>,
    @Res() res: Response,
  ) {
    try {
      if (typeof id !== 'string' || user.id !== authorId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: ReasonPhrases.UNAUTHORIZED,
          status: StatusCodes.UNAUTHORIZED,
        })
      }

      const post = await this.postService.update(body, id, authorId)
      return res.status(StatusCodes.OK).json({
        data: { ...post },
        message: [ReasonPhrases.OK],
        status: StatusCodes.OK,
      })
    } catch (error) {
      console.log(error)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      })
    }
  }

  @Post('delete')
  @UseGuards(AuthGuard)
  async delete(
    @Body()
    { id, authorId }: Pick<Prisma.PostCreateInput, 'id'> & { authorId: string },
    @Req() { context: { user } }: ContextRequest<UserRequest>,
    @Res() res: Response,
  ) {
    try {
      if (typeof id !== 'string' || user.id !== authorId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: ReasonPhrases.UNAUTHORIZED,
          status: StatusCodes.UNAUTHORIZED,
        })
      }

      await this.postService.delete(id, authorId)
      return res.status(StatusCodes.OK).json({
        message: [ReasonPhrases.OK],
        status: StatusCodes.OK,
      })
    } catch (error) {
      console.log(error)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
      })
    }
  }
}
