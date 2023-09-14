import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AuthPage',
  setup() {
    const version = APP_VERSION
    const { t } = useI18n()

    return {
      version,
      t,
    }
  },
})
