<template>
  <Teleport to="#back">
    <div class="d-flex justify-content-center align-items-center h-100 loading-container">
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="text-primary small">拼命加载中...</p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'

defineProps({
  text: {
    type: String
  },
  background: {
    type: String
  }
})
const node = document.createElement('div')
node.id = 'back'
document.body.appendChild(node)

onUnmounted(() => {
  document.body.removeChild(node)
})
</script>
<style scoped>
.loading-container {
  background: rgba(0, 0, 0, 0.7);
  z-index: 99;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.loading-content {
  text-align: center;
}
</style>
