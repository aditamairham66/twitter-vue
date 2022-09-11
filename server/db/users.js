import { prisma } from '.';
import { hashSync } from "bcrypt";

export const registerUsers = (dataUsers) => {
    const data = {
        ...dataUsers,
        password: hashSync(dataUsers.password, 10)
    }

    return prisma.user.create({
        data: data
    })
}

export const findByUsername = (username) => {
    return prisma.user.findUnique({
        where: {
            username
        }
    })
}