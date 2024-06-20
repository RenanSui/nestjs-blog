import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { StatusCodes } from 'http-status-codes'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
      methods: ['GET', 'POST'],
      optionsSuccessStatus: StatusCodes.OK,
    },
  })

  app.use(cookieParser())
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(8000)
}
bootstrap()
