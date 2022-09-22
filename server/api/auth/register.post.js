import { sendError } from 'h3'
import { registerUsers } from '../../db/Users.js'
import { userTransformer } from '../../transformers/Users.js'

export default defineEventHandler(async (event) => {
    const body = await useBody(event)

    const { username, email, password, repeatPassword, name } = body
    
    if (!username || !email || !password || !repeatPassword || !name) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }

    if (password !== repeatPassword) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Passwords do not match' }))
    }

    const data = {
        username,
        email,
        password,
        name,
        profileImage: 'https://picsum.photos/200/200'
    }

    const user = await registerUsers(data)

    return {
        body: userTransformer(user)
    }
})