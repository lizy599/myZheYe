import { createApp } from 'vue'

import router from './router/router.ts'
import './style.css'
import App from './App.vue'
import store from './store/store.ts'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
