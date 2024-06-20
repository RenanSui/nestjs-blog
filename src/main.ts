import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { StatusCodes } from 'http-status-codes'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.enableCors({
    origin: configService.get<string>('CLIENT_URL'),
    methods: ['GET', 'POST'],
    credentials: true,
    optionsSuccessStatus: StatusCodes.OK,
  })

  console.log(configService.get<string>('CLIENT_URL'))

  app.use(cookieParser())
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(8000)
}
bootstrap()
