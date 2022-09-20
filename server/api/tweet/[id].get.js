import { findById } from "~~/server/db/Tweet"
import { tweetTransformer } from "~~/server/transformers/Tweet"

export default defineEventHandler(async (event) => {
    const { id } = event.context.params

    const q = {
        include: {
            user: true,
            mediaTweet: true,
            replies: {
                include: {
                    user: true,
                    mediaTweet: true,
                    replyTo: {
                        include: {
                            user: true
                        }
                    }
                }
            },
            replyTo: {
                include: {
                    user: true
                }
            }
        },
    }

    const find = await findById(id, q)

    return {
        data: tweetTransformer(find)
    }
})