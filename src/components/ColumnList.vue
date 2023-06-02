<template>
  <div class="row">
    <div v-for="item in columnList" :key="item._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="item.avatar?.url" :alt="item.title" class="rounded-circle border border-light my-3" />
          <h5 class="card-title">
            {{ item.title }}
          </h5>
          <p class="card-text" style="text-align: left">
            {{ item.description }}
          </p>
          <!-- 对象形式 -->
          <!-- :to="{ name: 'column', params: { id: item.id } } -->
          <router-link :to="`/column/${item._id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ColumnProps } from '../store/store.ts'

interface Props {
  list: Array<ColumnProps>
}
const props = withDefaults(defineProps<Props>(), {
  list: () => []
})
const columnList = computed(() => {
  return props.list.map(item => {
    if (!item.avatar) {
      item.avatar = {
        url: new URL('@/assets/column.jpg', import.meta.url).href
      }
    } else {
      item.avatar.url = item.avatar.url + '?x-oss-process-image/resize,m_pad,h_50,w_50'
    }
    return item
  })
})
</script>
<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
