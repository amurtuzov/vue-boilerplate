import axios from 'axios'
import { useMainStore } from '@/store/main'
import { adaptLocaleToServer } from '@/helpers/adaptLocaleToServer'

axios.interceptors.request.use((config) => {
  if (config && config.headers) {
    config.baseURL = import.meta.env.VITE_API_BASE_URL
    const mainStore = useMainStore()
    config.headers['Language'] = adaptLocaleToServer(mainStore.appLocale)
  }
  return config
})

axios.interceptors.response.use(undefined, async (error) => {
  if (!axios.isCancel(error) && [401].includes(error?.response?.status)) {
    window.location.reload()
  }
  return Promise.reject(error)
})
