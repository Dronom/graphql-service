import { CreateUser } from './createUser';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUser extends PartialType(CreateUser) {
  @Field(() => Int)
  id: number;
}
