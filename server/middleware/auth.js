import UrlPattern from "url-pattern"
import { sendError } from 'h3'
import { decodeToken } from "../utils/jwt.js"
import { findById } from "../db/users.js"
//
export default defineEventHandler(async (event) => {
    const endpoints = [
        // get users
        '/api/auth/users',

        // send tweet url
        '/api/users/tweet',
        
        // get tweet
        '/api/tweet',

        // get tweet status
        '/api/tweet/:id',
    ]

    const isHandledByThisMiddleware = endpoints.some(row => {
        const pattern = new UrlPattern(row)
        return pattern.match(event.req.url)
    })

    if (!isHandledByThisMiddleware) {
        return
    }

    const auth = event.req.headers['authorization']
    const token = auth?.split(' ')[1]

    const dataToken = decodeToken(token)
    if (!dataToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        }))
    }

    try {
        const user = await findById(dataToken?.userId)
        event.context.auth = { user }
    } catch (error) {
        return
    }

})