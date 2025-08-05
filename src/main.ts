import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

createApp(App).use(createPinia()).use(router).mount('#app')

console.log('NODE_ENV:', import.meta.env.MODE)
console.log('VITE_ENVIRONMENT:', import.meta.env.VITE_ENVIRONMENT)
