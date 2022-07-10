import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TrackService } from './track.service';
import { Track } from './track.schema';
import { CreateTrack } from './dto/createTrack';
import { UpdateTrack } from './dto/updateTrack';
import { GenresService } from '../genres/genres.service';

@Resolver(() => Track)
export class TrackResolver {
  constructor(
    private readonly trackService: TrackService,
    private readonly genresService: GenresService,
  ) {}

  @Mutation(() => Track)
  async createTrack(@Args('createTrack') createTrack: CreateTrack) {
    return await this.trackService.create(createTrack);
  }

  @Query(() => Track, { name: 'track' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.trackService.findOne(id);
  }

  @Mutation(() => Track)
  async updateTrack(@Args('updateTrack') updateTrack: UpdateTrack) {
    return await this.trackService.update(updateTrack.id, updateTrack);
  }

  @ResolveField()
  async genres(@Parent() track: Track) {
    const { genresIds } = track;
    return await this.genresService.findByIDs(genresIds);
  }
}
