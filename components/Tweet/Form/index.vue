<template>
    <div v-if="loading" class="flex items-center justify-center py-6">
        <LoadingSpinner/>
    </div>
    <div v-else>
        <TweetFormInput 
            :placeholder="props.placeholder" 
            :user="user" 
            @onSubmit="handleTweetSubmit"/>
    </div>
</template>

<script setup>
    const { useAuthUser } = useAuth()
    const { postTweet } = useTweet()

    const user = useAuthUser()
    const loading = ref(false)

    const emits = defineEmits(['onSuccessSubmit'])

    const props = defineProps({
        placeholder: {
            type: String,
            default: 'Type your tweet?'
        },
        replyTo: {
            type: Object,
            default: null
        },
    })

    const handleTweetSubmit = async (formData) => {
        loading.value = true
        try {            
            const {data} = await postTweet({
                text: formData.text,
                mediaFiles: formData.mediaFiles,
                replyTo: props.replyTo?.id
            })

            emits('onSuccessSubmit', data)
        } catch (error) {
            console.log('error tweet', error)
        } finally {
            loading.value = false
        }

    }
</script>

<style lang="scss" scoped>

</style>