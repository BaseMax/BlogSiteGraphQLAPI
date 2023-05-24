import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Length(3,20)
  @IsString()
  username: string;

  @IsString()
  password: string;
}
