import { URL, fileURLToPath } from 'node:url'

import type { PluginOption } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

function setupPuligins(env: ImportMetaEnv): PluginOption[] {
  const plugins = [vue()]

  if (env.VITE_GLOB_APP_PWA === 'true') {
    // TODO
  }

  return plugins
}

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const viteEnv = loadEnv(env.mode, process.cwd()) as unknown as ImportMetaEnv

  return {
    plugins: setupPuligins(viteEnv),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 35721,
      open: false,
      proxy: {},
    },
    build: {
      reportCompressedSize: false,
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false,
      },
    },
  }
})
