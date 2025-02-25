import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dsv from '@rollup/plugin-dsv'
import svgLoader from 'vite-svg-loader'

export default defineConfig(({ mode }) => {
  console.log(mode)
  return {
    main: {
      plugins: [externalizeDepsPlugin()]
    },
    preload: {
      plugins: [externalizeDepsPlugin()],
      build: {
        rollupOptions: {
          input: {
            index: resolve(__dirname, 'src/preload/index.js')
          }
        }
      }
    },
    renderer: {
      server: {
        host: '0.0.0.0',
        port: 4000, //启动端口
        // open: true,
        proxy: {
          // 第一个代理
          '/api': {
            // 匹配到啥来进行方向代理
            target: "http://localhost:3000", //对应自己的接口
            changeOrigin: true,
            ws: true,
            rewrite: (path) => path.replace(/^\/api/, '') // 如果不需要api 直接把路径上的api 替换成空，这个
          }
        }
      },
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src')
        }
      },
      plugins: [vue(), vueJsx({}), dsv(), svgLoader()],
      css: {
        preprocessorOptions: {
          less: {
            javascriptEnabled: true,
            modifyVars: {
              'primary-color': '#3A7CFF',
              'text-color': '#313233',
              'text-color2': '#626366',
              'text-color3': '#939599',
              'border-radius-base': '12px',
              'form-vertical-label-padding': ' 0 0 7px',
              'tree-title-height': '20px'
            }
          }
        }
      },
      optimizeDeps: {
        include: ['dayjs/locale/zh-cn']
      },
      build: {
        rollupOptions: {
          input: {
            index: resolve(__dirname, 'src/renderer/index.html'),
            child: resolve(__dirname, 'src/renderer/child.html'),
          }
        }
      }
    }
  }
})
