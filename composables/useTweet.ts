const postTweet = (form: any) => {
    const formData =  new FormData();
    formData.append('text', form.text)
    form.mediaFiles.forEach((row, i) => {
        formData.append(`file_${i}`, row)
    })

    return useFetchApi(`api/users/tweet`, {
        method: 'POST',
        body: formData
    })
}

export function useTweet() {
    return {
        postTweet
    }
}