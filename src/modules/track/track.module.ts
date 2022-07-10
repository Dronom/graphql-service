import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackResolver } from './track.resolver';
import { GenresModule } from '../genres/genres.module';

@Module({
  providers: [TrackResolver, TrackService],
  exports: [TrackService],
  imports: [
    // add Artist, Album, Band modules
    GenresModule,
  ],
})
export class TrackModule {}
