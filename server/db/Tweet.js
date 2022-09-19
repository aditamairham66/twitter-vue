import { prisma } from '.';

export const saveTweet = (form) => {
    return prisma.tweet.create({
        data: form
    })
}

export const getAllTweet = (params = {}) => {
    return prisma.tweet.findMany({
        ...params
    })
}