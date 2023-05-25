import { Field, InputType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";
import { Pagination } from "src/utils/pagination.input";

@InputType()
export class SearchCategoryInput extends Pagination {
  @IsOptional()
  @Field({ nullable: true })
  text?: string;
}
