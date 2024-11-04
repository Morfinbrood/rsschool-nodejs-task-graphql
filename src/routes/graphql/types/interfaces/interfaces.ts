import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';

export interface GraphQLContext {
    prisma: PrismaClient;
    fastify: FastifyInstance;
}

export interface ChangeUserDto {
    name?: string;
    balance?: number;
}

export interface ChangeProfileDto {
    isMale?: boolean;
    yearOfBirth?: number;
    memberTypeId?: string;
}

export interface ChangePostDto {
    title?: string;
    content?: string;
}

export interface CreateUserDto {
    name: string;
    balance: number;
}

export interface CreateProfileDto {
    isMale: boolean;
    yearOfBirth: number;
    userId: string;
    memberTypeId: string;
}

export interface CreatePostDto {
    title: string;
    content: string;
    authorId: string;
}

export interface MemberTypeArgs {
    id: string;
}

export interface UserArgs {
    id: string;
}

export interface PostArgs {
    id: string;
}

export interface ProfileArgs {
    id: string;
}
