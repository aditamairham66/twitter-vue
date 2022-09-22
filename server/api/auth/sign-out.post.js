import { sendError } from 'h3'
import { deleteByToken } from '~~/server/db/RefreshToken.js'

export default defineEventHandler(async (event) => {
    try {
        const cookie = useCookies(event)
        const token = cookie?.refresh_token

        await deleteByToken(token)

        return {
            message: 'logout'
        }
    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: error
        }))
    }
})