import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Band } from '../../modules/bands/band.schema';
import { Album } from '../../modules/album/album.schema';
import { Artist } from '../../modules/artists/artist.schema';
import { Genre } from '../../modules/genres/genres.schema';

@ObjectType()
export class Track {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field()
  title: string;

  @Field(() => Album, { nullable: true })
  album: Album;

  @Field(() => [Artist], { nullable: 'itemsAndList' })
  artists: Artist[];

  @Field(() => [Band], { nullable: 'itemsAndList' })
  bands: Band[];

  @Field(() => Int, { nullable: true })
  duration: number;

  @Field(() => Int, { nullable: true })
  released: number;

  @Field(() => [Genre], { nullable: 'itemsAndList' })
  genres: Genre[];

  albumId: string;
  artistsIds: [string];
  bandsIds: [string];
  genresIds: [string];
}
