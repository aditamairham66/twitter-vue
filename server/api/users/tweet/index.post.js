import formidable from 'formidable';
import { saveMedia } from '../../server/db/MediaTweet.js';
import { saveTweet } from '../../server/db/Tweet.js';
import { tweetTransformer } from '../../server/transformers/Tweet.js';
import { uploadFile } from '../../server/utils/cloudinary.js';

export default defineEventHandler(async (event) => {
    const form  = formidable({})

    const res = await new Promise((resolve, reject) => {
        form.parse(event.req, (err, fields, files) => {
            if (err) {
                reject(err)
            }
            resolve({fields, files})
        })
    })

    const { fields, files } = res

    const usersId = event.context.auth?.user.id

    const formData = {
        text: fields.text,
        authorId: usersId
    }

    const replyTo = fields.replyTo

    if (replyTo && replyTo !== 'null' && replyTo !== 'undefined') {
        formData.replyToId = replyTo
    }

    const save = await saveTweet(formData);

    const fileRes = Object.keys(files).map(async i => {
        const file = files[i]

        const upload = await uploadFile(file.filepath)

        return saveMedia({
            url: upload.secure_url,
            providerPublicId: upload.public_id,
            userId: usersId,
            tweetId: save.id
        })
    })

    await Promise.all(fileRes)

    return {
        data: tweetTransformer(save)
    }
})