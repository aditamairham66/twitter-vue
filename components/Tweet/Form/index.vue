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
            await postTweet(data)
        } catch (error) {
            console.log('error tweet', error)
        }
    }
</script>

<style lang="scss" scoped>

</style>