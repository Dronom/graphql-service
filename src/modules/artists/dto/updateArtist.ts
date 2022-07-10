import { CreateArtist } from './createArtist';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateArtist extends PartialType(CreateArtist) {
  @Field(() => ID)
  id: string;
}
