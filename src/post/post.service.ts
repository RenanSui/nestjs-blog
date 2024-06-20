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

  findAll(skip = 0, take = 7) {
    return this.databaseService.post.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    })
  }

  findById(id: string) {
    return this.databaseService.post.findUnique({ where: { id } })
  }

  findBySearch(searchQuery: string, skip = 0, take = 7) {
    return this.databaseService.post.findMany({
      where: { body: { contains: searchQuery, mode: 'insensitive' } },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    })
  }

  findCountBySearch(searchQuery: string) {
    return this.databaseService.post.count({
      where: { body: { contains: searchQuery, mode: 'insensitive' } },
    })
  }

  findCount() {
    return this.databaseService.post.count()
  }

  findCountByUserId(authorId: string) {
    return this.databaseService.post.count({ where: { authorId } })
  }

  postByUserId(userId: string, skip = 0, take = 7) {
    return this.databaseService.post.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    })
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
