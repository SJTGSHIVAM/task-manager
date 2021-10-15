import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsString()
  @MinLength(5)
  @MaxLength(32)
  //   @Matches(<regex for what we want not implementing rn0 >,{message:"password is weak"})
  password: string;
}
