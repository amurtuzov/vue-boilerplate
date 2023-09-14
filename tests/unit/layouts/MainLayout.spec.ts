import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import i18n from '@/i18n/i18n'
import MainLayout from '@/layouts/MainLayout/MainLayout.vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { routes } from '@/router'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

describe('MainLayout.vue', () => {
  let router: Router
  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes: routes,
    })
    router.push('/login')
    await router.isReady()
  })
  it('Renders correctly', () => {
    const wrapper = mount(MainLayout, {
      global: {
        components: {
          SvgIcon,
        },
        stubs: {
          notifications: true,
        },
        plugins: [router, createTestingPinia(), i18n],
      },
    })
    expect(wrapper.findComponent(MainLayout).exists()).toBe(true)
  })
})
