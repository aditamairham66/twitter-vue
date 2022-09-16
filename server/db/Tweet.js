import { prisma } from '.';

export const saveTweet = (form) => {
    return prisma.tweet.create({
        data: form
    })
}