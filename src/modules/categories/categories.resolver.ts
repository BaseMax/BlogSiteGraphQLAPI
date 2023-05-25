import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { WriteGuard } from '../auth/write/write.guard';
import { BlogAttacherInterceptor } from '../blogs/blog-attacher/blog-attacher.interceptor';
import { CategoriesService } from './categories.service';
import { Category } from './category.model';
import { CreateCategoryInput } from './dto/create-category.input';
import { SearchCategoryInput } from './dto/search-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PaginatedCategories } from './paginated-categories.model';

@UseGuards(BlogAttacherInterceptor)
@Resolver()
export class CategoriesResolver {
  constructor(private service: CategoriesService) { }
  @UseGuards(AuthGuard, WriteGuard)
  @Mutation(() => Category)
  public async createCategory(@Args('input') input: CreateCategoryInput) {
    return await this.service.create(input);
  }
  @UseGuards(AuthGuard, WriteGuard)
  @Mutation(() => Boolean)
  public async deleteCategory(@Args('id') input: string) {
    await this.service.delete(input);
    return true;
  }
  @UseGuards(AuthGuard, WriteGuard)
  @Mutation(() => Boolean)
  public async updateCategory(@Args('input') input: UpdateCategoryInput) {
    await this.service.update(input);
    return true;
  }
  @Query(() => Category)
  public async category(@Args("id") id: string) {
    return this.service.findByIdOrFail(id);
  }
  @Query(() => PaginatedCategories)
  public async categories(@Args("input") input: SearchCategoryInput) {
    return this.service.search(input);
  }
}
