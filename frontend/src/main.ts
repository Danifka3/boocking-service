import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia();
app.use(pinia); // Подключаем Pinia
app.use(router); // Подключаем роутер, если есть

app.mount('#app')
