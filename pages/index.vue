<template>
    <div>
        <Head>
            <Title>Home</Title>
        </Head>

        <MainPageSection title="Home" :loading="loading">
            
            <div class="border-b">
                <TweetForm/>
            </div>

            <TweetListTweet :listTweet="listTweet"/>

        </MainPageSection>
    </div>
</template>

<script setup>
    const { getAllTweet } = useTweet()

    const loading = ref(false)
    const listTweet = ref([])

    onMounted(async () => {
        loading.value = true
        
        try {
            const {data} = await getAllTweet()
            listTweet.value  = data
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    })
</script>

<style lang="scss" scoped>

</style>