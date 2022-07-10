import { CreateTrack } from './createTrack';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTrack extends PartialType(CreateTrack) {
  @Field(() => ID)
  id: string;
}
