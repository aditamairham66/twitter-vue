<template>
    <div v-if="loading" class="flex items-center justify-center py-6">
        <LoadingSpinner/>
    </div>
    <div v-else>
        <TweetFormInput :user="user" @onSubmit="handleTweetSubmit"/>
    </div>
</template>

<script setup>
    const { useAuthUser } = useAuth()
    const { postTweet } = useTweet()
    const user = useAuthUser()

    const loading = ref(false)

    const handleTweetSubmit = async (data) => {
        loading.value = true
        try {            
            await postTweet({
                text: data.text,
                mediaFiles: data.mediaFiles
            })
        } catch (error) {
            console.log('error tweet', error)
        } finally {
            loading.value = false
        }

    }
</script>

<style lang="scss" scoped>

</style>