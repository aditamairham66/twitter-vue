<template>
    <div>
        <Head>
            <Title>Tweet</Title>
        </Head>

        <MainPageSection title="Tweet" :loading="loading">
            

        </MainPageSection>
    </div>
</template>

<script setup>
    const { getTweetById } = useTweet()

    const loading = ref(false)

    // console.log(useRouter().query)

    watch(() => useRoute().fullPath, () => getTweet())
    
    function getTweetIdFromRoute() {
        return useRoute().params.id
    }

    async function getTweet() {
        loading.value = true
        try {
            const {data} = await getTweetById(getTweetIdFromRoute())
            console.log(data)
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