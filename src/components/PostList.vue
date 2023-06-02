<template>
  <div class="post-list">
    <article v-for="item in list" :key="item._id" class="card mb-3 shadow-sm" @click="toPostDetail(item._id)">
      <div class="card-body">
        <h4>{{ item.title }}</h4>
        <div class="row my-3 align-item-center">
          <div v-if="item.image" class="col-3">
            <img :src="item.image.url" :alt="item.title" class="rounded-lg w-100" />
          </div>
          <p :class="{ 'col-9': item.image }">{{ item.excerpt }}</p>
        </div>
        <span class="text-muted">{{ item.createAt }}</span>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { PostProps } from '../store/store.ts'
import { useRouter } from 'vue-router'

const router = useRouter()
defineProps({
  list: {
    required: true,
    type: Array as PropType<PostProps[]>
  }
})
function toPostDetail(id) {
  router.push({ name: 'postDetail', params: { id } })
}
</script>
<style scoped>
.card:hover {
  outline: 2px solid blue;
  inherits: false;
}
</style>
