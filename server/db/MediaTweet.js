import { prisma } from '.';

export const saveMedia = (form) => {
    return prisma.mediaTweet.create({
        data: form
    })
}