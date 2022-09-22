import { userTransformer } from "../../server/transformers/Users.js"

export default defineEventHandler(async (event) => {
    return {
        user: userTransformer(event.context.auth?.user)
    }
})