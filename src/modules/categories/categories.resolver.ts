import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { CategoryPosts } from './dto/category-posts.input';
import { WriteGuard } from '../auth/write/write.guard';
import { BlogAttacherInterceptor } from '../blogs/blog-attacher/blog-attacher.interceptor';
import { CategoriesService } from './categories.service';
import { Category } from './category.model';
import { CreateCategoryInput } from './dto/create-category.input';
import { SearchCategoryInput } from './dto/search-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PaginatedCategories } from './paginated-categories.model';
import { PostsService } from '../posts/posts.service';

@UseGuards(BlogAttacherInterceptor)
@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private service: CategoriesService, private postsService: PostsService) { }
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
  @Mutation(() => Category)
  public async updateCategory(@Args('input') input: UpdateCategoryInput) {
    return await this.service.update(input);
  }
  @Query(() => Category)
  public async category(@Args("id") id: string) {
    return this.service.findByIdOrFail(id);
  }
  @Query(() => PaginatedCategories)
  public async categories(@Args("input") input: SearchCategoryInput) {
    return this.service.search(input);
  }
  @ResolveField()
  public async posts(@Args("input") input: CategoryPosts, @Parent() category: Category) {
    return this.postsService.search({ ...input, categoryId: category.id })
  }
}
