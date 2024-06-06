import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: Prisma.PostCreateInput) {
    return this.postService.create(createPostDto)
  }

  @Get()
  findAll() {
    return this.postService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: Prisma.PostUpdateInput,
  ) {
    return this.postService.update(+id, updatePostDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id)
  }
}
