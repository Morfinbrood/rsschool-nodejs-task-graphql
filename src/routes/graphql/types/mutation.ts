import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
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

import {
  User,
  Profile,
  Post
} from '@prisma/client';
import {
  ChangeUserDto,
  ChangeProfileDto,
  ChangePostDto,
  CreateUserDto,
  CreateProfileDto,
  CreatePostDto,
  GraphQLContext
} from './interfaces/interfaces.js';

const changeProfile = async (
  parent: unknown,
  args: { id: string; dto: ChangeProfileDto },
  context: GraphQLContext
): Promise<Profile> => {
  const { id, dto } = args;
  return context.prisma.profile.update({
    where: { id },
    data: dto,
  });
};

const changeUser = async (
  parent: unknown,
  args: { id: string; dto: ChangeUserDto },
  context: GraphQLContext
): Promise<User> => {
  const { id, dto } = args;
  return context.prisma.user.update({
    where: { id },
    data: dto,
  });
};

const changePost = async (
  parent: unknown,
  args: { id: string; dto: ChangePostDto },
  context: GraphQLContext
): Promise<Post> => {
  const { id, dto } = args;
  return context.prisma.post.update({
    where: { id },
    data: dto,
  });
};

const createUser = async (
  parent: unknown,
  args: { dto: CreateUserDto },
  context: GraphQLContext
): Promise<User> => {
  return context.prisma.user.create({
    data: args.dto,
  });
};

const createProfile = async (
  parent: unknown,
  args: { dto: CreateProfileDto },
  context: GraphQLContext
): Promise<Profile> => {
  return context.prisma.profile.create({
    data: args.dto,
  });
};

const createPost = async (
  parent: unknown,
  args: { dto: CreatePostDto },
  context: GraphQLContext
): Promise<Post> => {
  return context.prisma.post.create({
    data: args.dto,
  });
};

const deleteUser = async (
  parent: unknown,
  args: { id: string },
  context: GraphQLContext
): Promise<string> => {
  const { id } = args;
  await context.prisma.user.delete({
    where: { id },
  });
  return `User ${id} deleted successfully.`;
};

const deletePost = async (
  parent: unknown,
  args: { id: string },
  context: GraphQLContext
): Promise<string> => {
  const { id } = args;
  await context.prisma.post.delete({
    where: { id },
  });
  return `Post ${id} deleted successfully.`;
};

const deleteProfile = async (
  parent: unknown,
  args: { id: string },
  context: GraphQLContext
): Promise<string> => {
  const { id } = args;
  await context.prisma.profile.delete({
    where: { id },
  });
  return `Profile ${id} deleted successfully.`;
};

const subscribeTo = async (
  parent: unknown,
  args: { userId: string; authorId: string },
  context: GraphQLContext
): Promise<string> => {
  const { userId, authorId } = args;
  await context.prisma.subscribersOnAuthors.create({
    data: {
      subscriberId: userId,
      authorId: authorId,
    },
  });
  return `Subscribed successfully`;
};

const unsubscribeFrom = async (
  parent: unknown,
  args: { userId: string; authorId: string },
  context: GraphQLContext
): Promise<string> => {
  const { userId, authorId } = args;
  await context.prisma.subscribersOnAuthors.delete({
    where: {
      subscriberId_authorId: {
        subscriberId: userId,
        authorId: authorId,
      },
    },
  });
  return `Unsubscribed successfully`;
};

export const MutationType: GraphQLObjectType<any, GraphQLContext> = new GraphQLObjectType<any, GraphQLContext>({
  name: 'Mutations',
  fields: (): Record<string, any> => ({
    changeProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
      },
      resolve: changeProfile,
    },
    changeUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInputType) },
      },
      resolve: changeUser,
    },
    changePost: {
      type: new GraphQLNonNull(PostType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInputType) },
      },
      resolve: changePost,
    },
    createUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        dto: { type: new GraphQLNonNull(CreateUserInputType) },
      },
      resolve: createUser,
    },
    createProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        dto: { type: new GraphQLNonNull(CreateProfileInputType) },
      },
      resolve: createProfile,
    },
    createPost: {
      type: new GraphQLNonNull(PostType),
      args: {
        dto: { type: new GraphQLNonNull(CreatePostInputType) },
      },
      resolve: createPost,
    },
    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: deleteUser,
    },
    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: deletePost,
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: deleteProfile,
    },
    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: subscribeTo,
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: unsubscribeFrom,
    },
  }),
});
