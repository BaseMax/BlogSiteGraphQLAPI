import { Field, ObjectType } from "@nestjs/graphql";
import { PaginatedPosts } from "../posts/paginated-posts.model";
import { Post } from "../posts/post.model";

@ObjectType()
export class Category {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field(() => PaginatedPosts)
  posts: PaginatedPosts
}
