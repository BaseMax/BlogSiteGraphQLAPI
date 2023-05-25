import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreatePageInput {
  @Field()
  title: string;

  @Field()
  content: string;
}
