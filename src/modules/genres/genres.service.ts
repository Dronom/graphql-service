import { Injectable } from '@nestjs/common';
import { CreateGenre } from './dto/createGenre';
import { UpdateGenre } from './dto/updateGenre';
import axios, { AxiosResponse } from 'axios';
import { Genre } from './genres.schema';

@Injectable()
export class GenresService {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.GENRES_URL,
    });
  }

  async create(createGenre: CreateGenre) {
    const response: AxiosResponse<Genre> = await this.client.post(
      '',
      createGenre,
      { headers: { Authorization: process.env.AUTH_TOKEN } },
    );
    return response.data;
  }

  async findOne(id: string) {
    const response: AxiosResponse<Genre> = await this.client.get(id, {
      headers: { Authorization: process.env.AUTH_TOKEN },
    });
    return response.data;
  }

  async update(id: string, updateGenre: UpdateGenre) {
    const response: AxiosResponse<Genre> = await this.client.put(
      id,
      updateGenre,
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
