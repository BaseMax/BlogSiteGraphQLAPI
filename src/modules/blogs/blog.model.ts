import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Blog {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  password: string;
}
