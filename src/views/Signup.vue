<template>
  <div class="signup-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">注册者也账户</h5>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <ValidateInput :rules="emailRules" v-model="formData.email" placeholder="请输入邮箱地址" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <ValidateInput :rules="nameRules" v-model="formData.nickName" placeholder="请输入昵称" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <ValidateInput type="password" placeholder="请输入密码" :rules="passwordRules" v-model="formData.password" />
      </div>
      <div class="mb-3">
        <label class="form-label">重复密码</label>
        <ValidateInput type="password" placeholder="请再次密码" :rules="repeatPasswordRules" v-model="formData.repeatPassword" />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">注册新用户</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { RulesProp } from '../components/ValidateInput.vue'
import { useRouter } from 'vue-router'
import ValidateInput from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { signup } from '../request/api'

const router = useRouter()
const formData = reactive({
  email: '',
  nickName: '',
  password: '',
  repeatPassword: ''
})
const emailRules: RulesProp = [
  {
    type: 'required',
    message: '邮箱不能为空！'
  },
  {
    type: 'email',
    message: '邮箱格式不正确！'
  }
]
const nameRules: RulesProp = [
  {
    type: 'required',
    message: '昵称不能为空！'
  },
  {
    type: 'nickName',
    message: '昵称长度为3-10位！'
  }
]
const passwordRules: RulesProp = [
  {
    type: 'required',
    message: '密码不能为空！'
  },
  {
    type: 'password',
    message: '密码长度为6-16位！'
  }
]
const repeatPasswordRules: RulesProp = [{ type: 'custom', validate: () => formData.password === formData.repeatPassword, message: '两次密码不一致！' }]

const onFormSubmit = async (result: boolean) => {
  if (result) {
    // 发送请求
    const res = await signup({ ...formData })
    if (res && res.code === 0) {
      alert('注册成功！')
      router.push('/login')
    } else {
      alert('注册失败')
    }
  }
}
</script>
<style scoped></style>
