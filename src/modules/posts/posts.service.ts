import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { withPagination } from 'src/utils';
import { CategoriesService } from '../categories/categories.service';
import { CreatePostInput } from './dto/create-post.input';
import { SearchPostInput } from './dto/search-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostsService {
  async search(input: SearchPostInput,) {

    const query = {
      where: {
        ...input.text ? {
          OR: [{ title: { search: input.text } }, { content: { search: input.text } }],
        } : {},

        ...input.categoryId ? { categoryId: input.categoryId } : {}
      }
    };
    return withPagination(this.prisma, 'post', query, input);
  }

  async update(input: UpdatePostInput) {
    await this.findByIdOrFail(input.id);
    if (input.categoryId)
      await this.categoriesService.findByIdOrFail(input.categoryId)
    return await this.prisma.post.update({
      where: {
        id_blogId: this.locateId(input.id)
      },
      data: {
        title: input.title,
        blogId: this.blogData().id,
        categoryId: input.categoryId,
        content: input.content
      }
    });
  }
  private locateId(id: string): { blogId: string; id: string; } {
    return { blogId: this.blogData().id, id: id };
  }

  async delete(id: string) {
    await this.findByIdOrFail(id);
    await this.prisma.post.delete({
      where: {
        id_blogId: this.locateId(id)
      }
    });
  }
  constructor(private prisma: PrismaService, @Inject("BlogData") private blogData: () => Blog, private categoriesService: CategoriesService) { }
  public async findByIdOrFail(id: string) {
    const post = await this.prisma.post.findUnique({ where: { id_blogId: this.locateId(id) } })
    if (!post) {
      throw new NotFoundException("post not found");
    }
    return post;
  }
  public async create(input: CreatePostInput) {
    await this.categoriesService.findByIdOrFail(input.categoryId);
    const post = await this.prisma.post.create({
      data: {
        title: input.title,
        blogId: this.blogData().id,
        categoryId: input.categoryId,
        content: input.content
      }
    });
    return post;
  }
}
