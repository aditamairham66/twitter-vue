<template>
    <div>
        <Head>
            <Title>Search</Title>
        </Head>

        <MainPageSection title="Search" :loading="loading">
        
        
        </MainPageSection>
    </div>
</template>

<script setup>
    const { useAuthUser } = useAuth()

    const user = useAuthUser()
    const loading = ref(false)
    const tweet = ref(null)

    console.log(useRoute().query)
</script>

<style lang="scss" scoped>

</style>