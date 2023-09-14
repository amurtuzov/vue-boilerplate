import { setActivePinia, createPinia } from 'pinia'
import { useMainStore } from '@/store/main'
describe('MainStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('Detects correct mobile breakpoint', () => {
    const mainStore = useMainStore()
    mainStore.$patch({
      windowWidth: 320,
    })
    expect(mainStore.isMobile).toBe(true)
  })
  it('Detects correct tablet breakpoint', () => {
    const mainStore = useMainStore()
    mainStore.$patch({
      windowWidth: 1024,
    })
    expect(mainStore.isTablet).toBe(true)
  })
  it('Detects correct desktop breakpoint', () => {
    const mainStore = useMainStore()
    mainStore.$patch({
      windowWidth: 1600,
    })
    expect(mainStore.isDesktop).toBe(true)
  })
})
