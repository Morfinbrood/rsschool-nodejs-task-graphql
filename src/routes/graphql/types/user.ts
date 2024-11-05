import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostType } from './post.js';
import {
  User as UserModel,
  Profile,
  Post
} from '@prisma/client';
import { GraphQLContext } from './interfaces/interfaces.js';

export const UserType: GraphQLObjectType<UserModel, GraphQLContext> = new GraphQLObjectType<UserModel, GraphQLContext>({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType,
      resolve: async (
        parent: UserModel,
        args: unknown,
        context: GraphQLContext
      ): Promise<Profile | null> => {
        return context.prisma.profile.findUnique({
          where: { userId: parent.id },
        });
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: async (
        parent: UserModel,
        args: unknown,
        context: GraphQLContext
      ): Promise<Post[]> => {
        return context.prisma.post.findMany({
          where: { authorId: parent.id },
        });
      },
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (
        parent: UserModel,
        args: unknown,
        context: GraphQLContext
      ): Promise<UserModel[]> => {
        const subscriptions = await context.prisma.subscribersOnAuthors.findMany({
          where: { subscriberId: parent.id },
          include: { author: true },
        });
        return subscriptions.map((sub) => sub.author);
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (
        parent: UserModel,
        args: unknown,
        context: GraphQLContext
      ): Promise<UserModel[]> => {
        const subscribers = await context.prisma.subscribersOnAuthors.findMany({
          where: { authorId: parent.id },
          include: { subscriber: true },
        });
        return subscribers.map((sub) => sub.subscriber);
      },
    },
  }),
});
