<template>
    <div>
        <TweetFormInput :user="user" @onSubmit="handleTweetSubmit"/>
    </div>
</template>

<script setup>
    const { useAuthUser } = useAuth()
    const { postTweet } = useTweet()
    const user = useAuthUser()

    const handleTweetSubmit = async (data) => {
        try {            
            await postTweet({
                text: data.text,
                mediaFiles: data.mediaFiles
            })
        } catch (error) {
            console.log('error tweet', error)
        }
    }
</script>

<style lang="scss" scoped>

</style>