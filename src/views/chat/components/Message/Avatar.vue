<script lang="ts" setup>
import { computed } from 'vue'
import { NAvatar } from 'naive-ui'
import { useSettingStore, useUserStore } from '@/store'
import { isString } from '@/utils/is'
import defaultAvatar from '@/assets/avatar.jpg'

interface Props {
  image?: boolean
}
defineProps<Props>()

const userStore = useUserStore()
const settingStore = useSettingStore()

const avatar = computed(() => userStore.userInfo.avatar)

const aiType = computed(() => settingStore?.$state?.aiType)
</script>

<template>
  <template v-if="image">
    <NAvatar v-if="isString(avatar) && avatar.length > 0" :src="avatar" :fallback-src="defaultAvatar" />
    <NAvatar v-else round :src="defaultAvatar" />
  </template>

  <span v-else class="text-[28px] text-[#7B68EE] dark:text-white">
    <template v-if="aiType === 'ChatGPT'">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" width="1em" height="1em">
        <path d="M29.71,13.09A8.09,8.09,0,0,0,20.34,2.68a8.08,8.08,0,0,0-13.7,2.9A8.08,8.08,0,0,0,2.3,18.9,8,8,0,0,0,3,25.45a8.08,8.08,0,0,0,8.69,3.87,8,8,0,0,0,6,2.68,8.09,8.09,0,0,0,7.7-5.61,8,8,0,0,0,5.33-3.86A8.09,8.09,0,0,0,29.71,13.09Zm-12,16.82a6,6,0,0,1-3.84-1.39l.19-.11,6.37-3.68a1,1,0,0,0,.53-.91v-9l2.69,1.56a.08.08,0,0,1,.05.07v7.44A6,6,0,0,1,17.68,29.91ZM4.8,24.41a6,6,0,0,1-.71-4l.19.11,6.37,3.68a1,1,0,0,0,1,0l7.79-4.49V22.8a.09.09,0,0,1,0,.08L13,26.6A6,6,0,0,1,4.8,24.41ZM3.12,10.53A6,6,0,0,1,6.28,7.9v7.57a1,1,0,0,0,.51.9l7.75,4.47L11.85,22.4a.14.14,0,0,1-.09,0L5.32,18.68a6,6,0,0,1-2.2-8.18Zm22.13,5.14-7.78-4.52L20.16,9.6a.08.08,0,0,1,.09,0l6.44,3.72a6,6,0,0,1-.9,10.81V16.56A1.06,1.06,0,0,0,25.25,15.67Zm2.68-4-.19-.12-6.36-3.7a1,1,0,0,0-1.05,0l-7.78,4.49V9.2a.09.09,0,0,1,0-.09L19,5.4a6,6,0,0,1,8.91,6.21ZM11.08,17.15,8.38,15.6a.14.14,0,0,1-.05-.08V8.1a6,6,0,0,1,9.84-4.61L18,3.6,11.61,7.28a1,1,0,0,0-.53.91ZM12.54,14,16,12l3.47,2v4L16,20l-3.47-2Z" fill="currentColor" />
      </svg>
    </template>
    <template v-if="aiType === 'WenXin'">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em%" height="1em" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 9.5a1 1.5 0 1 0 2 0a1 1.5 0 1 0-2 0m10.463 2.096c1.282 1.774 3.476 3.416 3.476 3.416s1.921 1.574.593 3.636C17.204 20.711 13.64 19.8 13.64 19.8s-1.416-.44-3.06-.088c-1.644.356-3.06.22-3.06.22s-2.055-.22-2.47-2.304c-.416-2.084 1.918-3.638 2.102-3.858c.182-.222 1.409-.966 2.284-2.394c.875-1.428 3.337-2.287 5.027.221zM8 4.5a1 1.5 0 1 0 2 0a1 1.5 0 1 0-2 0m6 0a1 1.5 0 1 0 2 0a1 1.5 0 1 0-2 0m4 5a1 1.5 0 1 0 2 0a1 1.5 0 1 0-2 0" />
      </svg>
    </template>

  </span>
</template>
