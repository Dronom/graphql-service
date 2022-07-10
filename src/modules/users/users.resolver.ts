import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { JWT, User } from './users.schema';
import { LoginUser, CreateUser } from './dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => JWT)
  async jwt(@Args('login') login: LoginUser) {
    return await this.usersService.login(login);
  }

  @Mutation(() => User)
  async register(@Args('createUser') createUser: CreateUser) {
    return await this.usersService.create(createUser);
  }
}
