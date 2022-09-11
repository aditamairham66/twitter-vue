import { prisma } from '.';

export const saveToken = (dataToken) => {
    return prisma.refreshToken.create({
        data: dataToken
    })
}