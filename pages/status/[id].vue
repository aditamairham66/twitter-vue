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

    const getIdFromRoute = () => {
        const route = useRoute()
        return route.params.id
    }

    onMounted(async () => {
        getIdFromRoute()
        loading.value = true

        try {
            const {data} = await getTweetById(getIdFromRoute())
            console.log(data)
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    })
</script>

<style lang="scss" scoped>

</style>