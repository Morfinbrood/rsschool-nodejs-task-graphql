import { GraphQLContext } from '../interfaces/interfaces.js';
import { Post } from '@prisma/client';
import {
    ChangePostDto,
    CreatePostDto
} from '../interfaces/interfaces.js';

export const changePost = async (
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

export const createPost = async (
    parent: unknown,
    args: { dto: CreatePostDto },
    context: GraphQLContext
): Promise<Post> => {
    return context.prisma.post.create({
        data: args.dto,
    });
};

export const deletePost = async (
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
