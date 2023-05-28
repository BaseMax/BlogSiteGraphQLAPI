import { Field, ID, InputType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";
import { Pagination } from "src/utils/pagination.input";

@InputType()
export class SearchPostInput extends Pagination {
  @IsOptional()
  @Field({ nullable: true })
  text?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  categoryId?: string;
}
