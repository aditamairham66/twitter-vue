<template>
    <div>
        <Head>
            <Title>Search</Title>
        </Head>

        <MainPageSection title="Search" :loading="loading">
        
            <TweetListTweet :listTweet="tweet"/>
        
        </MainPageSection>
    </div>
</template>

<script setup>
    const { getAllTweet } = useTweet()
    
    const loading = ref(false)
    const tweet = ref([])

    watch(() => useRoute().fullPath, () => getTweet())

    function getTweetQFromRoute() {
        return useRoute().query.q
    }

    async function getTweet() {
        loading.value = true
        try {
            const {data} = await getAllTweet({
                query: getTweetQFromRoute()
            })
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