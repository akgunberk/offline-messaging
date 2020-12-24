import { IsEmail, IsString, Length } from 'class-validator';

export class UserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @Length(6, 12, { message: 'Password should be between 6 and 12 characters' })
  password: string;
}
