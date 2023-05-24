import { Field, ObjectType } from '@nestjs/graphql';
import { Blog } from 'src/modules/blogs/blog.model';

@ObjectType()
export class AuthPayload {
  @Field()
  user: Blog;

  @Field()
  token: string;
}
