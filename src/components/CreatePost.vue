<template>
  <div class="create-post-page">
    <h4>{{ title }}</h4>
    <!-- <UserProfile v-if="isEditMode" :user="user" /> -->
    <Upload :key="keyUpdate" action="/upload" :beforeUpload="beforeUpload" :uploaded="uploadedData" @updateImage="onUploadImage" @file-uploaded="onFileUploaded" @file-uploaded-error="onFileUploadedError" class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4" />
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <ValidateInput :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <ValidateInput rows="10" tag="textarea" placeholder="请输入文章详情" :rules="contentRules" v-model="contentVal" />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large mb-3">发表文章</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import ValidateForm from './ValidateForm.vue'
import ValidateInput, { RulesProp } from './ValidateInput.vue'
import Upload from './Upload.vue'
import { getPost } from '../request/api'
import UserProfile from './UserProfile.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()

const uploadedData = ref()
const isEditMode = ref(!!route.query.id)
const keyUpdate = ref(0)
const title = computed(() => (isEditMode.value ? '编辑文章' : '新建文章'))
const user = ref({ avatar: {}, description: '', email: '', nickName: '', _id: '' })
// 图片id
const imageId = ref('')
// 文章标题初始值
const titleVal = ref('')
// 文章标题验证
const titleRules: RulesProp = [{ type: 'required', message: '文章标题不能为空!' }]
// 文章内容初始值
const contentVal = ref('')
// 文章内容验证
const contentRules: RulesProp = [{ type: 'required', message: '文章内容不能为空!' }]
const onFormSubmit = (result: boolean) => {
  if (result) {
    const { column, _id } = store.state.user
    const postData = {
      title: titleVal.value,
      content: contentVal.value,
      image: imageId.value,
      column: column,
      author: _id
    }
    store.dispatch('createPost', postData)
    router.push({ name: 'column', params: { id: column } })
  }
}

const beforeUpload = (file: File) => {
  if (file) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    console.log(file)

    if (!isJPG) {
      console.log('格式不正确，只支持jpg/png格式!')
    }
    return isJPG
  } else {
    return false
  }
}

const onFileUploaded = () => {
  console.log('上传成功')
}
const onUploadImage = id => {
  console.log('id', id)

  imageId.value = id
}
const onFileUploadedError = error => {
  console.log('上传失败', error)
}
if (isEditMode.value) {
  getPost(route.query.id).then(res => {
    titleVal.value = res.data.title
    contentVal.value = res.data.content
    const currentPost = res.data
    if (currentPost.image) {
      uploadedData.value = currentPost.image
    }
  })
}
</script>
<style scoped></style>
