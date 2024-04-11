import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import viteCompression from 'vite-plugin-compression'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import versionUpdatePlugin from './plugins/versionUpdatePlugin'

const pathSrc = path.resolve(__dirname, 'src')
const now = new Date().getTime()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('micro-app')
        }
      }
    }),
    vueJsx(),
    svgLoader(),
    viteCompression({
      threshold: 10240,
      filter: /\.(js|mjs|json|css|html|ttf)$/i,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    versionUpdatePlugin({
      version: now
    }),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts')
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        })
      ],
      dts: path.resolve(pathSrc, 'components.d.ts')
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3'
    })
  ],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api', import.meta.url))
    }
  },
  test: {
    server: {
      deps: {
        inline: ['element-plus']
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 10101,
    proxy: {
      '/nsas-api': {
        target: 'http://139.159.243.90:800',
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nsas-api/, '')
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 10101,
    proxy: {
      '/nsas-api': {
        target: 'http://139.159.243.90:800',
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nsas-api/, '')
      }
    }
  },
  build: {
    sourcemap: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash']
        }
      }
    }
  }
})
