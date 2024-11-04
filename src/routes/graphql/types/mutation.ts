import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { UserType } from './user.js';
import { PostType } from './post.js';
import { ProfileType } from './profile.js';
import {
  CreateUserInputType,
  CreatePostInputType,
  CreateProfileInputType,
  ChangePostInputType,
  ChangeProfileInputType,
  ChangeUserInputType,
} from './inputTypes.js';
import { UUIDType } from './uuid.js';

export const MutationType = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    changeUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInputType) },
      },
      resolve: async (parent, { id, dto }, context) => {
        return context.prisma.user.update({
          where: { id },
          data: dto,
        });
      },
    },
    changeProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
      },
      resolve: async (parent, { id, dto }, context) => {
        return context.prisma.profile.update({
          where: { id },
          data: dto,
        });
      },
    },
    changePost: {
      type: new GraphQLNonNull(PostType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInputType) },
      },
      resolve: async (parent, { id, dto }, context) => {
        return context.prisma.post.update({
          where: { id },
          data: dto,
        });
      },
    },
    createUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        dto: { type: new GraphQLNonNull(CreateUserInputType) },
      },
      resolve: async (parent, args, context) => {
        return context.prisma.user.create({
          data: args.dto,
        });
      },
    },
    createProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        dto: { type: new GraphQLNonNull(CreateProfileInputType) },
      },
      resolve: async (parent, { dto }, context) => {
        return context.prisma.profile.create({
          data: dto,
        });
      },
    },
    createPost: {
      type: new GraphQLNonNull(PostType),
      args: {
        dto: { type: new GraphQLNonNull(CreatePostInputType) },
      },
      resolve: async (parent, { dto }, context) => {
        return context.prisma.post.create({
          data: dto,
        });
      },
    },
    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (parent, { id }, context) => {
        await context.prisma.user.delete({
          where: { id },
        });
        return `User ${id} deleted successfully.`;
      },
    },
    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (parent, { id }, context) => {
        await context.prisma.post.delete({
          where: { id },
        });
        return `Post ${id} deleted successfully.`;
      },
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (parent, { id }, context) => {
        await context.prisma.profile.delete({
          where: { id },
        });
        return `Profile ${id} deleted successfully.`;
      },
    },
    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (parent, { userId, authorId }, context) => {
        await context.prisma.subscribersOnAuthors.create({
          data: {
            subscriberId: userId,
            authorId: authorId,
          },
        });
        return `Subscribed successfully`;
      },
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (parent, { userId, authorId }, context) => {
        await context.prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: userId,
              authorId: authorId,
            },
          },
        });
        return `Unsubscribed successfully`;
      },
    },
  },
});
