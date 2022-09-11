<template>
<div class="w-full">
        <div class="flex justify-center">
            <div class="w-10 h-10">
                <LogoTwitter />
            </div>
        </div>

        <div class="pt-5 space-y-6">

            <FormInput v-model="data.username" label="Username" placeholder="@username" />

            <FormInput label="Password" placeholder="********" type="password" v-model="data.password" />

        </div>
    </div>
</template>

<script setup>
const data = reactive({
    username: '',
    password: '',
    loading: false
})
</script>

<style lang="scss" scoped>

</style>