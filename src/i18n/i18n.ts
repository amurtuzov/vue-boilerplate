import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ru from './locales/ru.json'

export default createI18n({
  legacy: false,
  locale: import.meta.env.VITE_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en',
  pluralRules: {
    ru: function customPluralRule(value) {
      value = Math.abs(value) % 100
      const num = value % 10
      if (value > 10 && value < 20) return 2
      if (num > 1 && num < 5) return 1
      if (num == 1) return 0
      return 2
    },
    en: function customPluralRule(value) {
      if (value === 1) return 0
      return 1
    },
  },
  messages: {
    en,
    ru,
  },
})
