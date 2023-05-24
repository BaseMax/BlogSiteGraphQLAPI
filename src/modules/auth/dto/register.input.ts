import {
  IsEmail,
  Length,
  Matches,
} from 'class-validator';

export class RegisterUserInputDto {
  @Length(3, 20)
  username: string;
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[\da-zA-Z!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
  )
  @Length(8, 100)
  password: string;
}
