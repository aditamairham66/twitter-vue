const postTweet = (form: any) => {
    const formData =  new FormData();
    formData.append('text', form.text)

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