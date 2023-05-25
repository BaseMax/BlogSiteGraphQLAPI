import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { WriteGuard } from '../auth/write/write.guard';
import { BlogAttacherInterceptor } from '../blogs/blog-attacher/blog-attacher.interceptor';
import { PagesService } from './pages.service';
import { Page } from './page.model';
import { CreatePageInput } from './dto/create-page.input';
import { SearchPageInput } from './dto/search-page.input';
import { UpdatePageInput } from './dto/update-page.input';
import { PaginatedPages } from './paginated-pages.model';

@UseGuards(BlogAttacherInterceptor)
@Resolver()
export class PagesResolver {
  constructor(private service: PagesService) { }
  @UseGuards(AuthGuard, WriteGuard)
  @Mutation(() => Page)
  public async createPage(@Args('input') input: CreatePageInput) {
    return await this.service.create(input);
  }
  @UseGuards(AuthGuard, WriteGuard)
  @Mutation(() => Boolean)
  public async deletePage(@Args('id') input: string) {
    await this.service.delete(input);
    return true;
  }
  @UseGuards(AuthGuard, WriteGuard)
  @Mutation(() => Boolean)
  public async updatePage(@Args('input') input: UpdatePageInput) {
    await this.service.update(input);
    return true;
  }
  @Query(() => Page)
  public async page(@Args("id") id: string) {
    return this.service.findByIdOrFail(id);
  }
  @Query(() => PaginatedPages)
  public async pages(@Args("input") input: SearchPageInput) {
    return this.service.search(input);
  }
}
