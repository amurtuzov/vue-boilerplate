import { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

const globalComponents = (app: App) => {
  app.component('SvgIcon', SvgIcon)
}
export default globalComponents
