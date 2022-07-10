import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUser {
  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;
}
