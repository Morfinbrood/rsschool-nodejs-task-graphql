import { GraphQLObjectType, GraphQLList, GraphQLNonNull } from 'graphql';
import { UserType } from './user.js';
import { PostType } from './post.js';
import { ProfileType } from './profile.js';
import { MemberType } from './memberType.js';
import { UUIDType } from './uuid.js';
import { MemberTypeIdEnum } from './memberType.js';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: async (parent, args, context) => {
        try {
          return context.prisma.memberType.findMany();
        } catch (error) {
          console.error('Error in memberTypes resolver:', error);
          throw error;
        }
      },
    },
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
      },
      resolve: async (parent, { id }, context) => {
        return context.prisma.memberType.findUnique({ where: { id } });
      },
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (parent, args, context) => {
        return context.prisma.user.findMany();
      },
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (parent, { id }, context) => {
        return context.prisma.user.findUnique({ where: { id } });
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: async (parent, args, context) => {
        return context.prisma.post.findMany();
      },
    },
    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (parent, { id }, context) => {
        return context.prisma.post.findUnique({ where: { id } });
      },
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProfileType))),
      resolve: async (parent, args, context) => {
        return context.prisma.profile.findMany();
      },
    },
    profile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (parent, { id }, context) => {
        return context.prisma.profile.findUnique({ where: { id } });
      },
    },
  },
});
