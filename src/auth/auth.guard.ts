import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ContextRequest, UserRequest } from 'src/types/request'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<ContextRequest<UserRequest>>()

    if (!request.context.user) return false

    return true
  }
}
