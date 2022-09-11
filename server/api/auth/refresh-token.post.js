import { sendError } from 'h3'
import { findByToken } from '~~/server/db/RefreshToken'
import { findById } from '~~/server/db/Users'
import { decodeToken, generateTokens } from '~~/server/utils/jwt'

export default defineEventHandler(async (event) => {
    const cookie = useCookie(event)

    const token = cookie.refresh_token
    if (!token) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid'
        }))
    }

    const findToken = await findByToken(token)
    if (!findToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is undefined'
        }))
    }

    // decode token
    const dataToken = decodeToken(token)

    try {
        const user = await findById(dataToken.userId)

        const { accessToken } = generateTokens(user)

        return {
            token: accessToken
        }
    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: error.message
        }))
    }
})