import { createApp } from 'vue'
import 'normalize.css';
import App from './App.vue'
import router from './router'
import './utils/remAdaptor.js'

const app = createApp(App)

app.use(router).mount('#app')
