<template>
    <div>

        <TweetItem :tweet="props.tweet"></TweetItem>

        <TweetForm placeholder="Tweet Your Reply"></TweetForm>

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

    console.log(props.tweet)

    const replies = computed(() => props.tweet?.reply || [])
</script>

<style lang="scss" scoped>

</style>