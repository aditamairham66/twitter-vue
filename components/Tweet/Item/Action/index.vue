<template>
    <div class="flex items-center justify-around w-full">

        <TweetItemActionIC color="blue" :size="size" 
            @on-click="emit('onClickComment')">
            <template v-slot:icon="{ classes }">
                <ChatBubbleOvalLeftEllipsisIcon :class="classes" />
            </template>

            <template v-if="showStats" v-slot:default>
                {{ props.tweet.repliesCount }}
            </template>
        </TweetItemActionIC>

        <TweetItemActionIC color="green" :size="size">
            <template v-slot:icon="{ classes }">
                <ArrowPathIcon :class="classes" />
            </template>

            <template v-if="showStats" v-slot:default>
                0
            </template>
        </TweetItemActionIC>


        <TweetItemActionIC color="red" :size="size">
            <template v-slot:icon="{ classes }">
                <HeartIcon :class="classes" />
            </template>

            <template v-if="showStats" v-slot:default>
                0
            </template>
        </TweetItemActionIC>

        <TweetItemActionIC color="blue" :size="size">
            <template v-slot:icon="{ classes }">
                <ArrowUpTrayIcon :class="classes" />
            </template>

            <template v-if="showStats" v-slot:default>
                0
            </template>
        </TweetItemActionIC>

    </div>
</template>

<script setup>
    import { ChatBubbleOvalLeftEllipsisIcon, ArrowPathIcon, HeartIcon, ArrowUpTrayIcon } from "@heroicons/vue/24/outline";

    const props = defineProps({
        tweet: {
            type: Object,
            required: true
        },
        compact: {
            type: Boolean,
            default: false
        }
    })

    const emit = defineEmits(['onClickComment'])

    const showStats = computed(() => props.compact)
    const size = computed(() => props.compact ? 5 : 8)
</script>

<style lang="scss" scoped>

</style>