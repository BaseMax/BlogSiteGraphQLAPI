import { Field, InputType } from "@nestjs/graphql";
import { CreateCategoryInput } from "./create-category.input";

@InputType()
export class UpdateCategoryInput extends CreateCategoryInput {
  @Field()
  id: string;
}

