import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreatePageInput } from "./create-page.input";

@InputType()
export class UpdatePageInput extends PartialType(CreatePageInput) {
  @Field()
  id: string;
}

