<template>
  <div class="dropdown" ref="dropdownRef">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">{{ title }}</a>
    <ul class="dropdown-menu" v-if="isOpen" :style="{ display: 'block' }">
      <slot></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import useClickOutside from '../hooks/useClickOutside.ts'
import { ref, watch } from 'vue'
// 下拉菜单标题
defineProps({
  title: {
    type: String,
    required: true
  }
})

const dropdownRef = ref<null | HTMLElement>(null)
// 控制菜单打开与关闭
const isOpen = ref(false)
// 点击菜单栏外的区域关闭下拉菜单
const isClickOutside = useClickOutside(dropdownRef)

watch(isClickOutside, () => {
  if (isOpen.value && isClickOutside.value) {
    isOpen.value = false
  }
})
function toggleOpen() {
  isOpen.value = !isOpen.value
}
</script>
<style scoped></style>
