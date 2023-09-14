import { Locale } from '@/types/locale'

export const adaptLocaleToServer = (locale: Locale): string => {
  switch (locale) {
    case 'en':
      return 'en-US'
    case 'ru':
      return 'ru-RU'
  }
}
