<template>
    <Head>
        <Title>{{props.title}}</Title>

        <Link rel="shortcut icon" href="/icon.png" type="image/x-icon"/>
        
        <slot></slot>
    </Head>
</template>

<script setup>
    const props = defineProps({
        title: {
            type: String,
            required: true
        },
    })
</script>

<style lang="scss" scoped>

</style>