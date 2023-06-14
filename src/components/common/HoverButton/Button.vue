<script setup lang='ts'>
interface Emit {
  (e: 'click'): void
}

const emit = defineEmits<Emit>()

function handleClick() {
  emit('click')
}
</script>

<template>
  <button
    class="flex items-center justify-center transition rounded-full hover:bg-neutral-100 dark:hover:bg-[#414755] w-10 h-10"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
