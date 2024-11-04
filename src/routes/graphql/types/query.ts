import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import { UserType } from './user.js';
import { PostType } from './post.js';
import { ProfileType } from './profile.js';
import { MemberType } from './memberType.js';
import { UUIDType } from './uuid.js';
import { MemberTypeIdEnum } from './memberType.js';

import { GraphQLContext } from './interfaces/interfaces.js';


import {
  getMemberTypes,
  getMemberType,
  getUsers,
  getUser,
  getPosts,
  getPost,
  getProfiles,
  getProfile,
} from './resolvers/queryResolvers.js';

export const RootQueryType: GraphQLObjectType<any, GraphQLContext> = new GraphQLObjectType<any, GraphQLContext>({
  name: 'RootQueryType',
  fields: (): Record<string, any> => ({
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: getMemberTypes,
    },
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
      },
      resolve: getMemberType,
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: getUsers,
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: getUser,
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: getPosts,
    },
    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: getPost,
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProfileType))),
      resolve: getProfiles,
    },
    profile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: getProfile,
    },
  }),
});
