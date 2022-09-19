<template>
    <div>
        <Head>
            <Title>Home</Title>
        </Head>

        <MainPageSection title="Home" :loading="loading">
            <TweetForm/>
        </MainPageSection>
    </div>
</template>

<script setup>
    const loading = ref(false)
</script>

<style lang="scss" scoped>

</style>