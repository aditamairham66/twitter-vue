import { mediaTransformer } from "./MediaTweet.js"
import { userTransformer } from "./Users.js"
import humanTime from 'human-time';

export const tweetTransformer = (tweet) => {
    return {
        id: tweet.id,
        text: tweet.text,
        mediaTweet: !!tweet.mediaTweet ? tweet.mediaTweet.map(mediaTransformer) : [],
        author: !!tweet.user ? userTransformer(tweet.user): null,
        reply: !!tweet.replies ? tweet.replies.map(tweetTransformer) : [],
        replyTo: !!tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
        repliesCount: !!tweet.replies ? tweet.replies.length : 0,
        postedAtHuman: humanTime(tweet.createdAt)
    }
}