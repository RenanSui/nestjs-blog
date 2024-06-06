import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

@Injectable()
export class PostService {
  create(createPostDto: Prisma.PostCreateInput) {
    console.log(createPostDto)
    return 'This action adds a new post'
  }

  findAll() {
    return `This action returns all post`
  }

  findOne(id: number) {
    return `This action returns a #${id} post`
  }

  update(id: number, updatePostDto: Prisma.PostUpdateInput) {
    console.log(updatePostDto)
    return `This action updates a #${id} post`
  }

  remove(id: number) {
    return `This action removes a #${id} post`
  }
}
