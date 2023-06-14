<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue'
import { NCard, NSpin } from 'naive-ui'
import { fetchChatConfig } from '@/api'
import pkg from '@/../package.json'
import { useAuthStore, useSettingStore } from '@/store'
import { HoverButton } from '@/components/common'
import { OpenAIIcon, WenxinAI } from '@/ui/icons'

interface ConfigState {
  timeoutMs?: number
  reverseProxy?: string
  apiModel?: string
  socksProxy?: string
  httpsProxy?: string
  balance?: string
}

const authStore = useAuthStore()
const settingStore = useSettingStore()

const loading = ref(false)

const config = ref<ConfigState>()

const isChatGPTAPI = computed<boolean>(() => !!authStore.isChatGPTAPI)

const wenxiActived = computed(() => settingStore?.$state?.aiType === 'WenXin')
const gptActived = computed(() => settingStore?.$state?.aiType === 'ChatGPT')

function switchAiTypeHandler(typ: Chat.AiType) {
  settingStore.updateSetting({ aiType: typ })
}

async function fetchConfig() {
  try {
    loading.value = true
    const { data } = await fetchChatConfig<ConfigState>()
    config.value = data
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchConfig()
})
</script>

<template>
  <NSpin :show="loading">
    <div class="p-4 space-y-4">
      <h2 class="text-xl font-bold">
        Version - {{ pkg.version }}
      </h2>
      <div class="p-2 space-y-2 rounded-t-md bg-neutral-100 dark:bg-neutral-700">
        <p>
          此项目开源于
          <a
            class="text-blue-600 dark:text-blue-500"
            href="https://github.com/lanbery"
            target="_blank"
          >
            Github
          </a>
          ，免费且基于 MIT 协议，没有任何形式的付费行为！
        </p>
        <p />
      </div>
      <NSpace>
        <NCard size="small">
          <template #header>
            <div class="flex space-x-1 items-center justify-start">
              <HoverButton size="xs" @click="switchAiTypeHandler('WenXin')">
                <WenxinAI size="small" :actived="wenxiActived" />
              </HoverButton>

              <HoverButton size="6" @click="switchAiTypeHandler('ChatGPT')">
                <OpenAIIcon size="small" :actived="gptActived" />
              </HoverButton>
              <span class="text-sm">当前默认与 文心一言对话,你可以点击修改</span>
            </div>
          </template>
        </NCard>
      </NSpace>

      <p>{{ $t("setting.api") }}：{{ config?.apiModel ?? '-' }}</p>
      <p v-if="isChatGPTAPI">
        {{ $t("setting.balance") }}：{{ config?.balance ?? '-' }}
      </p>
      <p v-if="!isChatGPTAPI">
        {{ $t("setting.reverseProxy") }}：{{ config?.reverseProxy ?? '-' }}
      </p>
      <p>{{ $t("setting.timeout") }}：{{ config?.timeoutMs ?? '-' }}</p>
      <p>{{ $t("setting.socks") }}：{{ config?.socksProxy ?? '-' }}</p>
      <p>{{ $t("setting.httpsProxy") }}：{{ config?.httpsProxy ?? '-' }}</p>
    </div>
  </NSpin>
</template>
