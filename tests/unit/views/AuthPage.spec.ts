import i18n from '@/i18n/i18n'
import { mount } from '@vue/test-utils'
import AuthPage from '@/views/AuthPage/AuthPage.vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { routes } from '@/router'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

describe('AuthPage.vue', () => {
  let router: Router
  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes: routes,
    })
    await router.push('/login')
    await router.isReady()
  })
  it('Renders correctly', () => {
    const wrapper = mount(AuthPage, {
      global: {
        components: {
          SvgIcon,
        },
        plugins: [router, createTestingPinia(), i18n],
      },
    })
    expect(wrapper.findComponent(AuthPage).exists()).toBe(true)
  })
})
