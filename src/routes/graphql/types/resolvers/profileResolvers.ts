import { GraphQLContext } from '../interfaces/interfaces.js';
import { Profile } from '@prisma/client';
import {
    ChangeProfileDto,
    CreateProfileDto
} from '../interfaces/interfaces.js';

export const changeProfile = async (
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

export const createProfile = async (
    parent: unknown,
    args: { dto: CreateProfileDto },
    context: GraphQLContext
): Promise<Profile> => {
    return context.prisma.profile.create({
        data: args.dto,
    });
};

export const deleteProfile = async (
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
