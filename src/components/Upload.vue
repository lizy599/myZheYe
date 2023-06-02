<template>
  <div class="file-upload">
    <div v-if="uploadedData && uploadedData.url" class="img-container">
      <img :src="uploadedData && uploadedData.url" class="w-100 h-100" />
    </div>
    <div v-if="fileStatus !== 'success'" :="$attrs" class="file-upload-container" @click.prevent="triggerUpload">
      <h2 v-if="fileStatus === 'ready' || fileStatus === 'error'">点击上传头像</h2>
      <div v-else-if="fileStatus === 'loading'" class="d-flex">
        <div class="spinner-border text-secondary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <h2>正在上传</h2>
      </div>
    </div>
    <input type="file" name="file" class="file-input d-none" ref="fileInput" @change="handleFileChange" />
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { upload } from '../request/api'

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean

const props = defineProps({
  action: {
    type: String,
    required: true
  },
  beforeUpload: {
    type: Function as PropType<CheckFunction>
  },
  uploaded: {
    type: Object
  }
})
watch(
  () => props.uploaded,
  newVal => {
    fileStatus.value = 'success'
    uploadedData.value = newVal
    console.log(uploadedData.value)
  }
)
const emits = defineEmits(['fileUploaded', 'fileUploadedError', 'updateImage'])
const fileInput = ref<null | HTMLInputElement>(null)
const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready')
const uploadedData = ref(props.uploaded)
const triggerUpload = () => {
  if (fileInput.value) {
    if (fileStatus.value === 'loading' || fileStatus.value === 'success') {
      return
    }
    fileInput.value.click()
  }
}
const handleFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files) {
    if (props.beforeUpload) {
      const result = props.beforeUpload(files[0])
      if (!result) {
        console.log('格式不正确！')

        return
      }
    }
    fileStatus.value = 'loading'
    const uploadedFile = files[0]
    const formData = new FormData()
    formData.append(uploadedFile.name, uploadedFile)
    try {
      const res = await upload(formData)
      if (res && res.code === 0) {
        fileStatus.value = 'success'
        uploadedData.value = res.data
        emits('fileUploaded', res.data)
        emits('updateImage', res.data._id)
      }
    } catch (error) {
      fileStatus.value = 'error'
      emits('fileUploadedError', error)
    }
    if (fileInput.value?.value) {
      fileInput.value.value = ''
    }
  }
}
</script>
<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<style scoped>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}
.img-container {
  width: 200px;
  height: 200px;
}
.img-container > img {
  object-fit: cover;
}
</style>
