<template>
    <div>
        <TweetFormInput :user="user" @onSubmit="handleTweetSubmit"/>
    </div>
</template>

<script setup>
    const { useAuthUser } = useAuth()
    const user = useAuthUser()

    const handleTweetSubmit = (data) => {
        console.log(data)
    }
</script>

<style lang="scss" scoped>

</style>