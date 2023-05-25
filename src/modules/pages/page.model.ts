import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Page {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;
}
