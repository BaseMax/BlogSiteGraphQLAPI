import { Field, ObjectType } from "@nestjs/graphql";
import { Category } from "../categories/category.model";

@ObjectType()
export class Post {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => Category)
  category: Category;

  categoryId: string;
}
