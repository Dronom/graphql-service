import { Injectable } from '@nestjs/common';
import { CreateTrackInput } from './dto/createTrack';
import { UpdateTrackInput } from './dto/updateTrack';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Track } from './track.schema';

@Injectable()
export class TrackService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.TRACKS_URL,
    });
  }

  async create(createTrackInput: CreateTrackInput) {
    const response: AxiosResponse<Track> = await this.client.post(
      '',
      createTrackInput,
      { headers: { Authorization: process.env.AUTH_TOKEN } },
    );
    return response.data;
  }

  async findOne(id: string) {
    const album: AxiosResponse<any> = await this.client.get(id);
    return album.data;
  }

  async update(id: string, updateTrackInput: UpdateTrackInput) {
    const response: AxiosResponse<Track> = await this.client.put(
      id,
      updateTrackInput,
      { headers: { Authorization: process.env.AUTH_TOKEN } },
    );
    return response.data;
  }

  async findByIDs(ids: [string]) {
    const promises = [];
    ids.forEach((id) => {
      promises.push(this.findOne(id));
    });
    return await Promise.all(promises);
  }
}
