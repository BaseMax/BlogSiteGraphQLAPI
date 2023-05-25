import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Category } from "./category.model";

@ObjectType()
export class PaginatedCategories {
  @Field(() => Int)
  total: number;

  @Field(() => [Category])
  data: Category[]

}
