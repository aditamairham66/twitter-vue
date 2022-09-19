<template>
    <div>

        <div 
            class="pb-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300" 
            v-for="(row, i) in props.listTweet" 
            :key="i">
            <TweetItem :tweet="row"/>
        </div>

    </div>
</template>

<script setup>
    const props = defineProps({
        listTweet: {
            type: Array,
            required: true
        }
    })
</script>

<style lang="scss" scoped>

</style>