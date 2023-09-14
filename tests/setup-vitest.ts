import { server } from './mock/server'

vi.stubGlobal('scroll', vi.fn())
Element.prototype.scrollTo = () => vi.fn()
HTMLMediaElement.prototype.play = () => new Promise(vi.fn())
HTMLMediaElement.prototype.pause = () => new Promise(vi.fn())
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn(),
  },
})
console.error = vi.fn()

beforeAll(async () => {
  await import('@/plugins/axios')
  server.listen({ onUnhandledRequest: 'error' })
})

afterAll(() => {
  vi.clearAllMocks()
  vi.resetModules()
  server.close()
})

afterEach(() => {
  server.resetHandlers()
  vi.resetAllMocks()
  vi.resetModules()
  localStorage.clear()
})
