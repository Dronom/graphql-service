import { Injectable } from '@nestjs/common';
import { LoginUser, CreateUser } from './dto';
import axios, { AxiosResponse } from 'axios';
import { IResponse } from '../../interfaces';
import { User } from './users.schema';

@Injectable()
export class UsersService {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.USERS_URL,
    });
  }

  async create(CreateUser: CreateUser): Promise<IResponse<User>> {
    const response: AxiosResponse<IResponse<User>> = await axios.post(
      `${process.env.USERS_URL}/register`,
      CreateUser,
    );
    return response.data;
  }

  async findOne(id: string): Promise<IResponse<User>> {
    const response: AxiosResponse<IResponse<User>> = await axios.get(
      `${process.env.USERS_URL}/${id}`,
    );
    return response.data;
  }

  async login(LoginUser: LoginUser) {
    const response: AxiosResponse = await axios.post(
      `${process.env.USERS_URL}/login`,
      LoginUser,
      {
        headers: { Authorization: process.env.AUTH_TOKEN },
      },
    );
    return response.data;
  }
}
