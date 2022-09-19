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

export const findById = (tweetId, params = {}) => {
    return prisma.tweet.findUnique({
        ...params,
        where: {
            ...params.where,
            id: tweetId
        }
    })
}