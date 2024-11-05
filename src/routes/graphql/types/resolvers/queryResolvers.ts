import { GraphQLContext } from '../interfaces/interfaces.js';
import { User, Post, Profile, MemberType as MemberTypeModel } from '@prisma/client';
import { MemberTypeArgs, UserArgs, PostArgs, ProfileArgs } from '../interfaces/interfaces.js';

export const getMemberTypes = async (
    parent: unknown,
    args: unknown,
    context: GraphQLContext
): Promise<MemberTypeModel[]> => {
    try {
        return context.prisma.memberType.findMany();
    } catch (error) {
        console.error('Error in getMemberTypes resolver:', error);
        throw error;
    }
};

export const getMemberType = async (
    parent: unknown,
    args: MemberTypeArgs,
    context: GraphQLContext
): Promise<MemberTypeModel | null> => {
    const { id } = args;
    try {
        return context.prisma.memberType.findUnique({ where: { id } });
    } catch (error) {
        console.error(`Error in getMemberType resolver for ID ${id}:`, error);
        throw error;
    }
};

export const getUsers = async (
    parent: unknown,
    args: unknown,
    context: GraphQLContext
): Promise<User[]> => {
    try {
        return context.prisma.user.findMany();
    } catch (error) {
        console.error('Error in getUsers resolver:', error);
        throw error;
    }
};

export const getUser = async (
    parent: unknown,
    args: UserArgs,
    context: GraphQLContext
): Promise<User | null> => {
    const { id } = args;
    try {
        return context.prisma.user.findUnique({ where: { id } });
    } catch (error) {
        console.error(`Error in getUser resolver for ID ${id}:`, error);
        throw error;
    }
};

export const getPosts = async (
    parent: unknown,
    args: unknown,
    context: GraphQLContext
): Promise<Post[]> => {
    try {
        return context.prisma.post.findMany();
    } catch (error) {
        console.error('Error in getPosts resolver:', error);
        throw error;
    }
};

export const getPost = async (
    parent: unknown,
    args: PostArgs,
    context: GraphQLContext
): Promise<Post | null> => {
    const { id } = args;
    try {
        return context.prisma.post.findUnique({ where: { id } });
    } catch (error) {
        console.error(`Error in getPost resolver for ID ${id}:`, error);
        throw error;
    }
};

export const getProfiles = async (
    parent: unknown,
    args: unknown,
    context: GraphQLContext
): Promise<Profile[]> => {
    try {
        return context.prisma.profile.findMany();
    } catch (error) {
        console.error('Error in getProfiles resolver:', error);
        throw error;
    }
};

export const getProfile = async (
    parent: unknown,
    args: ProfileArgs,
    context: GraphQLContext
): Promise<Profile | null> => {
    const { id } = args;
    try {
        return context.prisma.profile.findUnique({ where: { id } });
    } catch (error) {
        console.error(`Error in getProfile resolver for ID ${id}:`, error);
        throw error;
    }
};
