import { createApp } from 'vue'
import { router } from './router'
import { createPinia } from 'pinia'
import App from './App/App.vue'
import i18n from '@/i18n/i18n'
import '@/plugins/axios'
const pinia = createPinia()
const app = createApp(App)
import globalComponents from '@/plugins/globalComponents'

globalComponents(app)

async function initApp() {
  app.use(pinia)
  // some logic with store data before mount
  app.use(router).use(i18n).mount('#app')
}

window.addEventListener('load', initApp)
