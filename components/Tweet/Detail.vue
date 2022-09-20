<template>
    <div>

        <TweetItem :tweet="props.tweet"></TweetItem>

        <TweetForm 
            placeholder="Tweet Your Reply" 
            :reply-to="props.tweet" 
            @onSuccessSubmit="handleFormSuccess"></TweetForm>

        <TweetListTweet :listTweet="replies"></TweetListTweet>

    </div>
</template>

<script setup>
    const props = defineProps({
        tweet: {
            type: Object,
            required: true
        },
        user: {
            type: Object,
            required: true
        }
    })

    const replies = computed(() => props.tweet?.reply || [])

    const handleFormSuccess = (tweet) => {
        navigateTo({
            path: `/status/${tweet.id}`
        })
    }
</script>

<style lang="scss" scoped>

</style>