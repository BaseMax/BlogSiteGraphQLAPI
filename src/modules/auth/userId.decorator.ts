import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

export const UserDec = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  if (ctx.getType<GqlContextType>() === "graphql") {
    const gqlCtx = GqlExecutionContext.create(ctx)
    return gqlCtx.getContext().req.user;
  } else {
    const req = ctx.switchToHttp().getRequest()
    return req.user;
  }
});

