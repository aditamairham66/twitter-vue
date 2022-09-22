<template>
    <div>
        <MetaBasic title="Tweet" />

        <MainPageSection title="Tweet" :loading="loading">
        
            <TweetDetail :user="user" :tweet="tweet"/>
        
        </MainPageSection>
    </div>
</template>

<script setup>
    const { getTweetById } = useTweet()
    const { useAuthUser } = useAuth()

    const user = useAuthUser()
    const loading = ref(false)
    const tweet = ref(null)

    watch(() => useRoute().fullPath, () => getTweet())

    function getTweetIdFromRoute() {
        return useRoute().params.id
    }

    async function getTweet() {
        loading.value = true
        try {
            const {data} = await getTweetById(getTweetIdFromRoute())
            tweet.value = data
        } catch (error) {
            console.log(error);
        } finally {
            loading.value = false
        }
    }

    onBeforeMount(() => {
        getTweet()
    })
</script>

<style lang="scss" scoped>

</style>