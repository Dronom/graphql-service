import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GenresService } from './genres.service';
import { Genre } from './genres.schema';
import { CreateGenre } from './dto/createGenre';
import { UpdateGenre } from './dto/updateGenre';

@Resolver(() => Genre)
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Query(() => Genre, { name: 'genre' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.genresService.findOne(id);
  }

  @Mutation(() => Genre)
  async createGenre(@Args('createGenre') createGenre: CreateGenre) {
    return await this.genresService.create(createGenre);
  }

  @Mutation(() => Genre)
  async updateGenre(@Args('updateGenre') updateGenre: UpdateGenre) {
    return await this.genresService.update(updateGenre.id, updateGenre);
  }
}
