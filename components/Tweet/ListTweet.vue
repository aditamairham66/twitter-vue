<template>
    <div>

        <div v-if="isEmptyArray" class="p-4">
            <p class="text-center text-gray-500">
                No tweets 😢
            </p>
        </div>

        <div v-else
            class="pb-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300" 
            :class="[twitterBorderColor, defaultTransition]"
            v-for="(row, i) in props.listTweet" 
            :key="i">
            <TweetItem :tweet="row"/>
        </div>

    </div>
</template>

<script setup>
    const { twitterBorderColor, defaultTransition } = useTailwindConfig()

    const props = defineProps({
        listTweet: {
            type: Array,
            required: true
        }
    })

    const isEmptyArray = computed(() => props.listTweet.length === 0)

</script>

<style lang="scss" scoped>

</style>