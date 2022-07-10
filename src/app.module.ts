import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './modules';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      context: ({ req }): object => {
        const token = req.headers.authorization || '';
        process.env.AUTH_TOKEN = token;
        return { token };
      },
      formatError: (error) => {
        const errorMessage =
          // @ts-ignore
          error.extensions?.exception?.response?.message || error.message;
        const message = errorMessage.replace(
          /Cannot return null for non-nullable field/,
          'Entity does not exist. Try to add new: ',
        );
        const graphQLFormattedError = {
          message,
          code: error.extensions?.exception?.code || 'SERVER_ERROR',
          // @ts-ignore
          name: error.extensions?.exception?.name || error.name,
        };
        return graphQLFormattedError;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
