import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
    ],
    
    build: {
        transpile: ['@heroicons/vue']
    },

    runtimeConfig: {
        jwtSecret: process.env.JWT_SECRET,
    }
})
