import { getAllTweet } from "~~/server/db/Tweet"
import { tweetTransformer } from "~~/server/transformers/Tweet"

export default defineEventHandler(async (event) => {
    const { query } = useQuery(event)

    const q = {
        include: {
            user: true,
            mediaTweet: true,
            replies: {
                include: {
                    user: true
                }
            },
            replyTo: {
                include: {
                    user: true
                }
            }
        },
        orderBy: [
            {
                createdAt: 'desc'
            }
        ]
    }

    const all = await getAllTweet(q)

    return {
        data: all.map(tweetTransformer)
    }
})