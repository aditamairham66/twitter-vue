<template>
    <div>
        <TweetFormInput :user="user"/>
    </div>
</template>

<script setup>
    const { useAuthUser } = useAuth()
    const user = useAuthUser()
</script>

<style lang="scss" scoped>

</style>