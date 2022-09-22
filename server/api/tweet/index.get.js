import { getAllTweet } from "../../db/Tweet.js"
import { tweetTransformer } from "../../transformers/Tweet.js"

export default defineEventHandler(async (event) => {
    const {query} = useQuery(event)

    let q = {
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

    if (!!query) {
        q = {
            ...q,
            where: {
                text: {
                    contains: query
                }
            }
        }
    }

    const all = await getAllTweet(q)

    return {
        data: all.map(tweetTransformer)
    }
})