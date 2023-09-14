import { defineStore } from 'pinia'
import { RootGetters, RootState } from '@/store/main/types'
import { Breakpoints } from '@/enum/Breakpoints'
import { getStorageItemWithExpiry } from '@/helpers/localStorageHelpers'
import { Locale } from '@/types/locale'

export const useMainStore = defineStore<string, RootState, RootGetters>(
  'main',
  {
    state: () => {
      return {
        windowWidth: window.innerWidth,
        appLocale:
          getStorageItemWithExpiry<Locale>('locale') ||
          import.meta.env.VITE_I18N_LOCALE,
      }
    },

    getters: {
      isMobile: (state: RootState) => state.windowWidth < Breakpoints.TABLET,
      isTablet: (state: RootState) =>
        state.windowWidth >= Breakpoints.TABLET &&
        state.windowWidth < Breakpoints.DESKTOP,
      isNotebook: (state: RootState) =>
        state.windowWidth >= Breakpoints.NOTEBOOK &&
        state.windowWidth < Breakpoints.DESKTOP,
      isDesktop: (state: RootState) => state.windowWidth >= Breakpoints.DESKTOP,
    },
  },
)
