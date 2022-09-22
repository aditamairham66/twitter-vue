import { findById } from "../../db/Tweet.js"
import { tweetTransformer } from "../../transformers/Tweet.js"

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