import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import AppHeader from './components/AppHeader/index.vue'

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component('AppHeader', AppHeader)

app.use(router).mount('#app')
