import { Injectable } from '@nestjs/common';
import { CreateTrack } from './dto/createTrack';
import { UpdateTrack } from './dto/updateTrack';
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

  async create(createTrack: CreateTrack) {
    const response: AxiosResponse<Track> = await this.client.post(
      '',
      createTrack,
      { headers: { Authorization: process.env.AUTH_TOKEN } },
    );
    return response.data;
  }

  async findOne(id: string) {
    const album: AxiosResponse<any> = await this.client.get(id);
    return album.data;
  }

  async update(id: string, updateTrack: UpdateTrack) {
    const response: AxiosResponse<Track> = await this.client.put(
      id,
      updateTrack,
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
