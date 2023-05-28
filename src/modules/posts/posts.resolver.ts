import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { WriteGuard } from '../auth/write/write.guard';
import { BlogAttacherInterceptor } from '../blogs/blog-attacher/blog-attacher.interceptor';
import { PostsService } from './posts.service';
import { Post } from './post.model';
import { CreatePostInput } from './dto/create-post.input';
import { SearchPostInput } from './dto/search-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PaginatedPosts } from './paginated-posts.model';
import { CategoriesService } from '../categories/categories.service';

@UseGuards(BlogAttacherInterceptor)
@Resolver(() => Post)
export class PostsResolver {
  constructor(private service: PostsService, private categoriesService: CategoriesService) { }
  @UseGuards(AuthGuard, WriteGuard)
  @Mutation(() => Post)
  public async createPost(@Args('input') input: CreatePostInput) {
    return await this.service.create(input);
  }
  @UseGuards(AuthGuard, WriteGuard)
  @Mutation(() => Boolean)
  public async deletePost(@Args('id') input: string) {
    await this.service.delete(input);
    return true;
  }
  @UseGuards(AuthGuard, WriteGuard)
  @Mutation(() => Post)
  public async updatePost(@Args('input') input: UpdatePostInput) {
    return await this.service.update(input);
  }
  @Query(() => Post)
  public async post(@Args("id") id: string) {
    return this.service.findByIdOrFail(id);
  }
  @Query(() => PaginatedPosts)
  public async posts(@Args("input") input: SearchPostInput) {
    return this.service.search(input);
  }
  @ResolveField()
  public async category(@Parent() post: Post) {
    return await this.categoriesService.findByIdOrFail(post.categoryId)
  }
}
