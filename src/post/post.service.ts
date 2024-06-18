import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class PostService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly databaseService: DatabaseService) {}

  create(createPostDto: Prisma.PostCreateInput, user: Prisma.UserCreateInput) {
    return this.databaseService.post.create({
      data: { ...createPostDto, author: { connect: { id: user.id } } },
    })
  }

  findAll() {
    return this.databaseService.post.findMany()
  }

  findById(id: string) {
    return this.databaseService.post.findUnique({ where: { id } })
  }

  postByUserId(userId: string) {
    return this.databaseService.post.findMany({ where: { authorId: userId } })
  }

  update(body: Prisma.PostUpdateInput['body'], id: string, authorId: string) {
    return this.databaseService.post.update({
      data: { body },
      where: { id, authorId },
    })
  }

  delete(id: string, authorId: string) {
    return this.databaseService.post.delete({ where: { id, authorId } })
  }
}
