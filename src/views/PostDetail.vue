<template>
  <div class="post-detail-page">
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img :src="currentImageUrl" :alt="currentPost.title" class="rounded-lg img-fluid my-4" v-if="currentImageUrl" />
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile :user="currentPost.author" v-if="typeof currentPost.author === 'object'"></user-profile>
        </div>
        <span class="text-muted text-right font-italic">发表于：{{ currentPost.createdAt }}</span>
      </div>
      <div v-html="currentHTML"></div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link type="button" class="btn btn-success" :to="{ name: 'create', query: { id: currentPost._id } }">编辑</router-link>
        <button type="button" class="btn btn-danger" @click="deletePosts">删除</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import UserProfile from '../components/UserProfile.vue'
import { useRoute, useRouter } from 'vue-router'
import MarkdownIt from 'markdown-it'
import { computed, onMounted, ref } from 'vue'
import { getPost, deletePost } from '../request/api'

const store = useStore()
const route = useRoute()
const router = useRouter()
const showEditArea = ref(null)
const currentId = route.params.id
const md = new MarkdownIt()
const currentPost = ref(null)
const currentHTML = computed(() => {
  if (currentPost.value && currentPost.value.content) {
    let content = md.render(currentPost.value.content)
    content = content
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
    return content
  }
})
const currentImageUrl = computed(() => {
  if (currentPost.value && currentPost.value.image) {
    const { image } = currentPost.value
    return image.url + '?x-oss-process=image/resize,w_850'
  } else {
    return null
  }
})
const deletePosts = async () => {
  try {
    console.log('111', currentPost.value)
    const res = await deletePost({ _id: currentPost.value._id })
    alert('删除成功')
    router.push('/column/' + currentPost.value.column)
  } catch (error) {
    console.log(error)
  }
}
getPost(currentId).then(res => {
  if (res && res.code === 0) {
    currentPost.value = res.data
    showEditArea.value = (store.state.user.avatar && store.state.user.avatar._id) === currentPost.value.author.avatar._id
  }
})
</script>
