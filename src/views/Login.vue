<template>
  <ValidateForm @form-submit="onFormSubmit">
    <div class="mb-3">
      <label for="exampleInputEmail" class="form-label">邮箱地址</label>
      <ValidateInput ref="emailInputRef" :rules="emailRules" v-model="emailValue" type="text" placeholder="请输入邮箱" />
      <!-- <div class="form-text" v-if="emailRef.error">{{ emailRef.message }}</div> -->
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword" class="form-label">密码</label>
      <ValidateInput ref="passwordInputRef" :rules="passwordRules" v-model="passwordValue" type="password" placeholder="请输入密码" />
      <!-- <input type="password" class="form-control" id="exampleInputPassword" /> -->
    </div>
    <!-- v-slot:submit 缩写 #submit -->
    <template #submit>
      <button type="submit" class="btn btn-danger mb-3">提交</button>
    </template>
  </ValidateForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'

const router = useRouter()
const store = useStore()
// 邮箱初始值
const emailValue = ref('111@test.com')
// 邮箱验证
const emailRules: RulesProp = [
  { type: 'required', message: '电子邮箱不能为空!' },
  { type: 'email', message: '邮箱格式不正确!' }
]
// 邮箱初始值
const passwordValue = ref('111111')
// 邮箱验证
const passwordRules: RulesProp = [
  { type: 'required', message: '密码不能为空!' },
  { type: 'password', message: '密码长度为6-16位!' }
]
// 表单组件实例
const emailInputRef = ref(null)
const passwordInputRef = ref(null)

const onFormSubmit = async (result: boolean) => {
  if (result) {
    await store.dispatch('fetchLogin', { email: emailValue.value, password: passwordValue.value })
    router.push('/')
  }
}
</script>
<style scoped></style>
