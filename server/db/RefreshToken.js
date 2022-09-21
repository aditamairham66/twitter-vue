import { prisma } from '.';

export const saveToken = (dataToken) => {
    return prisma.refreshToken.create({
        data: dataToken
    })
}

export const findByToken = (token) => {
    return prisma.refreshToken.findUnique({
        where: {
            token
        }
    })
}

export const deleteByToken = (token) => {
    return prisma.refreshToken.delete({
        where: {
            token
        }
    })
}