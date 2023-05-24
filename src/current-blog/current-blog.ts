import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
  Scope,
} from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { Blog } from '@prisma/client';
import { Request } from 'express';

@Injectable({
  scope: Scope.REQUEST,
})
export class CurrentBlog {
  constructor(
    @Inject(CONTEXT) private ctx: { req: Request }, // private prisma: PrismaClient,
  ) { }
  getBlog(): Blog {
    return this.ctx.req['blog'];
  }
}
