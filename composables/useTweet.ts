const postTweet = (form: any) => {
    const formData =  new FormData();
    formData.append('text', form.text)
    formData.append('replyTo', form.replyTo)

    form.mediaFiles.forEach((row, i) => {
        formData.append(`file_${i}`, row)
    })

    return useFetchApi(`/api/users/tweet`, {
        method: 'POST',
        body: formData
    })
}

const getAllTweet = (params = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await useFetchApi<any>(`/api/tweet`, {
                method: 'GET',
                params
            })
            
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

const getTweetById = (tweetId : any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await useFetchApi<any>(`/api/tweet/${tweetId}`, {
                method: 'GET'
            })
            
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

const useTweetToggleModal = () => useState<boolean>("tweet_modal_toggle", () => false)

const setTweetToggleModal = (value: boolean) => {
    const tweetModalToggle = useTweetToggleModal()
    tweetModalToggle.value = value
}

export function useTweet() {
    return {
        postTweet,
        getAllTweet,
        getTweetById,
        useTweetToggleModal,
        setTweetToggleModal
    }
}