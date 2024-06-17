import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ContextRequest, ProfileRequest } from 'src/types/request'

@Injectable()
export class ProfileGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<ContextRequest<ProfileRequest>>()

    if (!request.context.profile) return false

    return true
  }
}
