import { sendError } from 'h3'
import { findByUsername } from '~~/server/db/Users'
import { compareSync } from "bcrypt";
import { userTransformer } from '~~/server/transformers/Users';
import { saveToken } from '~~/server/db/RefreshToken';
import { generateTokens, sendRefreshToken } from '~~/server/utils/jwt';

export default defineEventHandler(async (event) => {
    const body = await useBody(event)

    const { username, password } = body

    if (!username || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }))
    }

    const find = await findByUsername(username)
    if (!find) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username not found'
        }))
    }

    const checkPassword = compareSync(password, find.password)
    if (!checkPassword) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Password entered does not match'
        }))
    }

    const { accessToken, refreshToken } = generateTokens(find)

    // save refresh token users
    await saveToken({
        token: refreshToken,
        userId: find.id
    })

    // set cookie refresh token
    sendRefreshToken(event, refreshToken)

    return {
        token: accessToken,
        user: userTransformer(find)
    }
})