import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = this.extractToken(context);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.jwtService.verify(token);
      this.attachPayload(context, payload);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
  private attachPayload(c: ExecutionContext, payload: any) {
    if (c.getType<GqlContextType>() === "graphql") {
      GqlExecutionContext.create(c).getContext().req.user = payload;
    } else {
      c.switchToHttp().getRequest().user = payload
    }
  }

  private extractToken(c: ExecutionContext) {
    if (c.getType<GqlContextType>() === "graphql") {
      return this.extractTokenFromHeader(GqlExecutionContext.create(c).getContext().req);
    } else {
      return this.extractTokenFromHeader(c.switchToHttp().getRequest())
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
