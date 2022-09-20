<template>
  <div :class="{ 'dark': darkMode }">

    <div class="bg-white dark:bg-dim-900">

      <LoadingPageLoading v-if="loading"/>

      <div v-else-if="user" class="min-h-full">

        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">

          <div class="hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft/>
            </div>
          </div>

          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <router-view></router-view>
          </main>

          <div class="hidden col-span-12 md:block xl:col-span-4 md:col-span-3">
              <div class="sticky top-0">
                <SidebarRight/>
              </div>
          </div>

        </div>

      </div>

      <MainAuthPageSection v-else/>

      <ModalBasic/>

    </div>

  </div>
</template>

<script setup>
  const darkMode = ref(false)

  const { useAuthUser, initAuth, useLoading } = useAuth()
  const loading = useLoading()
  const user = useAuthUser()

  onBeforeMount(() => {
    initAuth()
  })
</script>