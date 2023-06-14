<script setup lang="ts">
import { NGradientText } from 'naive-ui'
import { computed } from 'vue'
import { HoverButton } from '@/components/common'
import { OpenAIIcon, WenxinAI } from '@/ui/icons'
import { useSettingStore } from '@/store'

const settingStore = useSettingStore()

const wenxiActived = computed(() => settingStore?.$state?.aiType === 'WenXin')
const gptActived = computed(() => settingStore?.$state?.aiType === 'ChatGPT')

function switchAiTypeHandler(typ: Chat.AiType) {
  settingStore.updateSetting({ aiType: typ })
}
</script>

<template>
  <div class="p-0">
    <div class="flex px-2 justify-center">
      <NGradientText
        :gradient="{
          from: 'rgb(85, 85, 85)',
          to: 'rgb(138, 43, 226)',
        }"
      >
        Xunyun AI
      </NGradientText>
    </div>
    <div class="pl-4 pr-0 flex flex-row items-center justify-between">
      <div class="break-words flex-1 max-w-[180px]">
        <NGradientText type="success" class="pt-2" style="font-size: 10px;word-break: break-all;">
          {{ gptActived ? $t('setting.chatGptTips') : $t('setting.wenxinTips') }}
        </NGradientText>
      </div>

      <div class="px-1 flex flex-row items-center justify-right space-x-1">
        <HoverButton size="xs" @click="switchAiTypeHandler('WenXin')">
          <WenxinAI size="small" :actived="wenxiActived" />
        </HoverButton>

        <HoverButton size="6" @click="switchAiTypeHandler('ChatGPT')">
          <OpenAIIcon size="small" :actived="gptActived" />
        </HoverButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.n-gradient-text {
  font-size: 32px;
}
</style>
