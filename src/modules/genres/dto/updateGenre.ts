import { CreateGenre } from './createGenre';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGenre extends PartialType(CreateGenre) {
  @Field(() => ID)
  id: string;
}
