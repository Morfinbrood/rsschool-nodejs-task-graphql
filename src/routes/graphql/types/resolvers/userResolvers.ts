import { GraphQLContext } from '../interfaces/interfaces.js';
import { User } from '@prisma/client';
import {
    ChangeUserDto,
    CreateUserDto
} from '../interfaces/interfaces.js';

export const changeUser = async (
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

export const createUser = async (
    parent: unknown,
    args: { dto: CreateUserDto },
    context: GraphQLContext
): Promise<User> => {
    return context.prisma.user.create({
        data: args.dto,
    });
};

export const deleteUser = async (
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

export const subscribeTo = async (
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

export const unsubscribeFrom = async (
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
