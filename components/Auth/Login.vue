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

            <ButtonBasic 
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
        loading: false
    })

    const handleLogin = () => {
        data.loading = true
        
        try {
            login({
                username: data.username,
                password: data.password,
            })
        } catch (error) {
            console.log(error)
        } finally {
            data.loading = false
        }
    }

    const disabledLogin = computed(() => {
        return (!data.username || !data.password) || data.loading
    })

</script>

<style lang="scss" scoped>

</style>