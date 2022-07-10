import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Artist } from '../../modules/artists/artist.schema';
import { Band } from '../../modules/bands/band.schema';
import { Genre } from '../../modules/genres/genres.schema';
import { Track } from '../../modules/track/track.schema';

@ObjectType()
export class Album {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => Int, { nullable: true })
  released: number;

  @Field(() => [Artist], { nullable: 'itemsAndList' })
  artists: [Artist];

  @Field(() => [Band], { nullable: 'itemsAndList' })
  bands: [Band];

  @Field(() => [Track], { nullable: 'itemsAndList' })
  tracks: [Track];

  @Field(() => [Genre], { nullable: 'itemsAndList' })
  genres: [Genre];

  @Field({ nullable: true })
  image: string;

  bandsIds: [string];
  artistsIds: [string];
  genresIds: [string];
  trackIds: [string];
}
