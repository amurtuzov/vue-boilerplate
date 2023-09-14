import { defineComponent, ref, onBeforeMount, watch, Ref } from 'vue'
import { ComponentPublicInstance } from '@/types/svgIcon'

export default defineComponent({
  props: {
    icon: { type: String, required: true },
  },
  emits: ['iconReady'],
  setup(props, { emit }) {
    const dynamicSvg = ref<string | null>(null)
    const svgRef = ref(null) as Ref<ComponentPublicInstance<HTMLElement> | null>

    const importSvg = async (svgName: string) => {
      if (svgName) {
        return await import(`../../assets/icons/${svgName}.svg`)
      }
    }

    watch(
      () => props.icon,
      async (svg) => (dynamicSvg.value = await importSvg(svg)),
    )

    watch(
      () => svgRef.value?.$el,
      () => {
        emit('iconReady')
      },
    )

    onBeforeMount(async () => {
      dynamicSvg.value = await importSvg(props.icon)
    })
    return {
      dynamicSvg,
      svgRef,
    }
  },
})
