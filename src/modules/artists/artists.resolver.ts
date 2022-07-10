import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { Artist } from './artist.schema';
import { CreateArtist } from './dto/createArtist';
import { UpdateArtist } from './dto/updateArtist';

@Resolver(() => Artist)
export class ArtistsResolver {
  constructor(private readonly artistsService: ArtistsService) {}

  @Mutation(() => Artist)
  async createArtist(@Args('createArtist') createArtist: CreateArtist) {
    return await this.artistsService.create(createArtist);
  }

  @Query(() => Artist, { name: 'artist' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.artistsService.findOne(id);
  }

  @Mutation(() => Artist)
  async updateArtist(@Args('updateArtist') updateArtist: UpdateArtist) {
    return await this.artistsService.update(updateArtist.id, updateArtist);
  }
}
