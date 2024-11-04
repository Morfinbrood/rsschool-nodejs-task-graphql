import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt
} from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType } from './memberType.js';
import {
  Profile as ProfileModel,
  MemberType as MemberTypeModel
} from '@prisma/client';
import { GraphQLContext } from './interfaces/interfaces.js';

export const ProfileType: GraphQLObjectType<ProfileModel, GraphQLContext> = new GraphQLObjectType<ProfileModel, GraphQLContext>({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async (
        parent: ProfileModel,
        args: unknown,
        context: GraphQLContext
      ): Promise<MemberTypeModel> => {
        const memberType = await context.prisma.memberType.findUnique({
          where: { id: parent.memberTypeId },
        });
        if (!memberType) {
          throw new Error(`MemberType with id ${parent.memberTypeId} not found`);
        }
        return memberType;
      },
    },
  }),
});
