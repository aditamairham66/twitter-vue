<template>
  <div :class="{ 'dark': darkMode }">

    <div class="bg-white dark:bg-dim-900">

      <LoadingPageLoading v-if="loading"/>

      <div v-else-if="user" class="min-h-full">

        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">

          <div class="hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft 
                @on-tweet="openTweetModal" 
                @on-logout="openLogoutModal"
                :user="user"/>
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

      <ModalBasic 
        :open="tweetToggleModal" 
        @on-close="closeTweetModal">
        <TweetForm 
          :user="user" 
          :reply-to="tweetDataToggle" 
          reply-show
          @onSuccessSubmit="handleFormSuccess"/>
      </ModalBasic>

      <ModalLogout :open="toggleSignout" @on-confirm="clickLogout" @on-close="closeLogout"/>

    </div>

  </div>
</template>

<script setup>
  const { useAuthUser, initAuth, useLoading, signOut, useToggleSignoutModal, setToggleSignoutModal } = useAuth()
  const { useTweetToggleModal, setTweetToggleModal, useTweetDataModal, setTweetDataModal } = useTweet()
  const emitt = useEmit()

  const loading = useLoading()
  const user = useAuthUser()
  const darkMode = ref(false)
  const tweetToggleModal = useTweetToggleModal()
  const tweetDataToggle = useTweetDataModal()
  const toggleSignout = useToggleSignoutModal()

  emitt.$on('replyTweet', (tweet) => {
    setTweetDataModal(tweet)
    setTweetToggleModal(true)
  })

  const closeTweetModal = () => {
    setTweetDataModal(null)
    setTweetToggleModal(false)
  }

  const openTweetModal = () => {
    setTweetDataModal(null)
    setTweetToggleModal(true)
  }

  const handleFormSuccess = (tweet) => {
    closeTweetModal()

    window.location.href = `/status/${tweet.id}`
  }

  const openLogoutModal = () => {
    setToggleSignoutModal(true)
  }

  const clickLogout = async () => {
    await signOut()
    setToggleSignoutModal(false)
  }

  const closeLogout = () => {
    setToggleSignoutModal(false)
  }

  onBeforeMount(() => {
    initAuth()
  })
</script>