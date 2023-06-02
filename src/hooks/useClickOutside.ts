import { Ref, onMounted, onUnmounted, ref } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value?.contains(e.target as HTMLElement)) {
      isClickOutside.value = false
    } else {
      isClickOutside.value = true
    }
  }
  // 监听点击
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  // 卸载点击
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}
export default useClickOutside
