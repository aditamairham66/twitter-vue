<template>
    <div>

        <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
    <!-- The backdrop, rendered as a fixed sibling to the panel container -->
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

    <!-- Full-screen container to center the panel -->
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <!-- The actual dialog panel -->
      <DialogPanel class="w-full max-w-sm rounded bg-white">
        <DialogTitle>Complete your order</DialogTitle>

        <!-- ... -->
      </DialogPanel>
    </div>
  </Dialog>


    </div>
</template>

<script setup>
  import { Dialog, DialogTitle, DialogDescription } from '@headlessui/vue'

const isOpen = ref(true)

function setIsOpen(value) {
  isOpen.value = value
}
</script>

<style lang="scss" scoped>

</style>