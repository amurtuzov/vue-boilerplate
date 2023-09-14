import { Locale } from '@/types/locale'

export type RootState = {
  windowWidth: number
  appLocale: Locale
}
export type RootGetters = {
  isMobile: (state: RootState) => boolean
  isTablet: (state: RootState) => boolean
  isNotebook: (state: RootState) => boolean
  isDesktop: (state: RootState) => boolean
}
