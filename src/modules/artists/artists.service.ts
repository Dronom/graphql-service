import { Injectable } from '@nestjs/common';
import { CreateArtist } from './dto/createArtist';
import { UpdateArtist } from './dto/updateArtist';
import axios, { AxiosResponse } from 'axios';
import { Artist } from './artist.schema';

@Injectable()
export class ArtistsService {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.ARTISTS_URL,
    });
  }

  async create(createArtist: CreateArtist): Promise<Artist> {
    const response: AxiosResponse<Artist> = await this.client.post(
      '',
      createArtist,
      { headers: { Authorization: process.env.AUTH_TOKEN } },
    );
    return response.data;
  }

  async findOne(id: string) {
    const response: AxiosResponse<Artist> = await this.client.get(id);
    return response.data;
  }

  async update(id: string, updateArtist: UpdateArtist) {
    const response: AxiosResponse<Artist> = await this.client.put(
      id,
      updateArtist,
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
