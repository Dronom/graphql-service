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
import { CreateTrackInput } from './dto/createTrack';
import { UpdateTrackInput } from './dto/updateTrack';
import { GenresService } from '../genres/genres.service';

@Resolver(() => Track)
export class TrackResolver {
  constructor(
    private readonly trackService: TrackService,
    private readonly genresService: GenresService,
  ) {}

  @Mutation(() => Track)
  async createTrack(
    @Args('createTrackInput') createTrackInput: CreateTrackInput,
  ) {
    return await this.trackService.create(createTrackInput);
  }

  @Query(() => Track, { name: 'track' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.trackService.findOne(id);
  }

  @Mutation(() => Track)
  async updateTrack(
    @Args('updateTrackInput') updateTrackInput: UpdateTrackInput,
  ) {
    return await this.trackService.update(
      updateTrackInput.id,
      updateTrackInput,
    );
  }

  @ResolveField()
  async genres(@Parent() track: Track) {
    const { genresIds } = track;
    return await this.genresService.findByIDs(genresIds);
  }
}
