import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "./post.model";

@ObjectType()
export class PaginatedPosts {
  @Field(() => Int)
  total: number;

  @Field(() => [Post])
  data: Post[]

}
