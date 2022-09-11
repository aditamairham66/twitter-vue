import { prisma } from '.';

export const createData = (dataUsers) => {
    return prisma.user.create({
        data: dataUsers
    })
}