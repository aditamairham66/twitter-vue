import { sendError } from 'h3'
import { findByToken } from '../../db/RefreshToken.js'
import { findById } from '../../db/Users.js'
import { decodeToken, generateTokens } from '../../utils/jwt.js'

export default defineEventHandler(async (event) => {
    const cookie = useCookies(event)

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
        const user = await findById(dataToken?.userId)

        const { accessToken } = generateTokens(user)

        return {
            token: accessToken
        }
    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: error
        }))
    }
})