const postTweet = (form: any) => {
    const formData =  new FormData();
    formData.append('text', form.text)
    form.mediaFiles.forEach((row, i) => {
        formData.append(`file_${i}`, row)
    })

    return useFetchApi(`/api/users/tweet`, {
        method: 'POST',
        body: formData
    })
}

const getAllTweet = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await useFetchApi<any>(`/api/tweet`, {
                method: 'GET'
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

export function useTweet() {
    return {
        postTweet,
        getAllTweet,
        getTweetById
    }
}