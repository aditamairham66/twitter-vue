<template>
<div class="w-full">
        <div class="flex justify-center">
            <div class="w-10 h-10">
                <LogoTwitter />
            </div>
        </div>

        <div class="pt-5 space-y-6">

            <AuthFormInput v-model="data.username" label="Username" placeholder="@username" />

            <AuthFormInput label="Password" placeholder="********" type="password" v-model="data.password" />

            <div class="flex flex-row justify-center" v-if="loading">
                <LoadingSpinner/>
            </div>

            <ButtonBasic v-else
                liquid 
                :disabled="disabledLogin" 
                @click="handleLogin">
                Login
            </ButtonBasic>

        </div>
    </div>
</template>

<script setup>
    const { login } = useAuth()

    const data = reactive({
        username: '',
        password: '',
    })

    const loading = ref(false)

    const handleLogin = () => {
        loading.value = true
        
        try {
            login({
                username: data.username,
                password: data.password,
            })
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    }

    console.log(loading)

    const disabledLogin = computed(() => {
        return (!data.username || !data.password)
    })

</script>

<style lang="scss" scoped>

</style>