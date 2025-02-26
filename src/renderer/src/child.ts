import 'animate.css'
import './styles/base.less'
import { createApp } from 'vue'
import App from './child/App.vue'
// import Live2D from 'live2d-vuenext'
import router from '@renderer/child/router/index'
createApp(App).use(router).mount('#app')
