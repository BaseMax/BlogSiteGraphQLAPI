import {
  IsEmail,
  Length,
  Matches,
} from 'class-validator';

export class RegisterUserInputDto {
  @IsEmail()
  email: string;

  @Length(3, 40)
  firstName: string;

  @Length(2, 40)
  lastName: string;

  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[\da-zA-Z!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
  )
  @Length(8, 100)
  password: string;
}
