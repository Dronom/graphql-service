import { CreateArtist } from './createArtist';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateArtistInput extends PartialType(CreateArtist) {
  @Field()
  id: number;
}
