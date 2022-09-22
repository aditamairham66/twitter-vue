<template>
    <div>
        <MetaBasic title="Home" />

        <MainPageSection title="Home" :loading="loading">
            
            <div class="border-b">
                <TweetForm @on-success-submit="handleFormSuccess"/>
            </div>

            <TweetListTweet :listTweet="listTweet"/>

        </MainPageSection>
    </div>
</template>

<script setup>
    const { getAllTweet } = useTweet()

    const loading = ref(false)
    const listTweet = ref([])

    const handleFormSuccess = () => {
        getTweet()
    }

    const getTweet = async () => {
        loading.value = true
        
        try {
            const {data} = await getAllTweet()
            listTweet.value  = data
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    }

    onMounted(() => {
        getTweet()
    })
</script>

<style lang="scss" scoped>

</style>