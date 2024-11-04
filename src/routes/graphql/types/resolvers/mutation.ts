import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';
import { UserType } from '../user.js';
import { PostType } from '../post.js';
import { ProfileType } from '../profile.js';
import { UUIDType } from '../uuid.js';
import {
    CreateUserInputType,
    CreatePostInputType,
    CreateProfileInputType,
    ChangePostInputType,
    ChangeProfileInputType,
    ChangeUserInputType,
} from '../inputTypes.js';

import { GraphQLContext } from '../interfaces/interfaces.js';

import {
    changeUser,
    createUser,
    deleteUser,
    subscribeTo,
    unsubscribeFrom,
} from '../resolvers/userResolvers.js';
import {
    changePost,
    createPost,
    deletePost,
} from '../resolvers/postResolvers.js';
import {
    changeProfile,
    createProfile,
    deleteProfile,
} from '../resolvers/profileResolvers.js';

export const MutationType: GraphQLObjectType<any, GraphQLContext> = new GraphQLObjectType<any, GraphQLContext>({
    name: 'Mutations',
    fields: (): Record<string, any> => ({
        changeUser: {
            type: new GraphQLNonNull(UserType),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: new GraphQLNonNull(ChangeUserInputType) },
            },
            resolve: changeUser,
        },
        createUser: {
            type: new GraphQLNonNull(UserType),
            args: {
                dto: { type: new GraphQLNonNull(CreateUserInputType) },
            },
            resolve: createUser,
        },
        deleteUser: {
            type: new GraphQLNonNull(GraphQLString),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: deleteUser,
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

        changePost: {
            type: new GraphQLNonNull(PostType),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: new GraphQLNonNull(ChangePostInputType) },
            },
            resolve: changePost,
        },
        createPost: {
            type: new GraphQLNonNull(PostType),
            args: {
                dto: { type: new GraphQLNonNull(CreatePostInputType) },
            },
            resolve: createPost,
        },
        deletePost: {
            type: new GraphQLNonNull(GraphQLString),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: deletePost,
        },

        changeProfile: {
            type: new GraphQLNonNull(ProfileType),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
            },
            resolve: changeProfile,
        },
        createProfile: {
            type: new GraphQLNonNull(ProfileType),
            args: {
                dto: { type: new GraphQLNonNull(CreateProfileInputType) },
            },
            resolve: createProfile,
        },
        deleteProfile: {
            type: new GraphQLNonNull(GraphQLString),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: deleteProfile,
        },
    }),
});
