<template>
  <div class="column-detail-page w-75 mx-auto">
    <div v-if="column" class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img :src="column.avatar.url" :alt="column?.title" class="rounded-circle border w-100" />
      </div>
      <div class="col-9">
        <h4>{{ column?.title }}</h4>
        <p class="text-muted">{{ column?.description }}</p>
      </div>
    </div>
    <PostList :list="list" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import PostList from '../components/PostList.vue'
import { computed, ref } from 'vue'
import { getPosts } from '../request/api'

const route = useRoute()
const store = useStore()
const currentId = route.params.id
const column = computed(() => store.getters.getColumnById(currentId))
const list = ref([])
getPosts(currentId).then(res => {
  if (res && res.code === 0) {
    list.value = res.data.list
    console.log(list)
  }
})
</script>
<style scoped></style>
