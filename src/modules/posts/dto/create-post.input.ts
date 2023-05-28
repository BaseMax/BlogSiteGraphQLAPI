import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => ID)
  categoryId: string;
}
