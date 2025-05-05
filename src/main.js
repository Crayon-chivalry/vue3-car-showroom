import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css';

import AppHeader from './components/AppHeader/index.vue'

const app = createApp(App)

app.component('AppHeader', AppHeader)

app.use(router).mount('#app')
