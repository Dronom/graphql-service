import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Artist } from '../artists/artist.schema';
import { Band } from '../bands/band.schema';
import { Genre } from '../../modules/genres/genres.schema';
import { Track } from '../../modules/track/track.schema';

@ObjectType()
export class Favorite {
  @Field(() => ID, { name: 'id' })
  _id: string;
  @Field(() => ID, { nullable: true })
  userId: string;
  @Field(() => [Band], { nullable: 'itemsAndList' })
  bands: [Band];
  @Field(() => [Genre], { nullable: 'itemsAndList' })
  genres: [Genre];
  @Field(() => [Artist], { nullable: 'itemsAndList' })
  artists: [Artist];
  @Field(() => [Track], { nullable: 'itemsAndList' })
  tracks: [Track];

  bandsIds: [string];
  genresIds: [string];
  tracksIds: [string];
  artistsIds: [string];
}
