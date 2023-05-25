import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Page } from "./page.model";

@ObjectType()
export class PaginatedPages {
  @Field(() => Int)
  total: number;

  @Field(() => [Page])
  data: Page[]

}
