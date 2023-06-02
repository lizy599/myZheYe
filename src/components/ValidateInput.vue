<template>
  <div class="validate-input-container pb-3">
    <input v-if="tag !== 'textarea'" :="$attrs" class="form-control" :class="{ 'is-invalid': inputRef.error }" v-model="inputRef.val" @blur="validateInput" />
    <textarea v-else :="$attrs" class="form-control" :class="{ 'is-invalid': inputRef.error }" v-model="inputRef.val" @blur="validateInput"></textarea>
    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, onMounted, reactive, useAttrs } from 'vue'
import { emitter } from './ValidateForm.vue'
/**
 * 生命周期
 */
onMounted(() => {
  emitter.emit('form-item-created', validateInput)
})
/**
 * 邮箱校验
 */
const emailReg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
/**
 * 类型相关
 */
interface RuleProp {
  type: 'required' | 'email' | 'password' | 'nickName' | 'custom'
  message: string
  validate?: () => boolean
}
export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea'
const props = defineProps({
  rules: Array as PropType<RulesProp>,
  modelValue: String,
  tag: {
    type: String as PropType<TagType>,
    default: 'input'
  }
})
const $attrs = useAttrs()
const inputRef = reactive({
  val: computed({
    get() {
      return props.modelValue
    },
    set(newVal) {
      $emits('update:modelValue', newVal)
    }
  }),
  error: false,
  message: ''
})

/**
 * 事件方法
 */
// 自定义事件
const $emits = defineEmits(['update:modelValue'])
function validateInput() {
  if (props.rules) {
    const allPassed = props.rules.every(item => {
      let passed = true
      inputRef.message = item.message
      switch (item.type) {
        case 'required':
          passed = inputRef.val.trim() !== ''
          break
        case 'email':
          passed = emailReg.test(inputRef.val)
          break
        case 'password':
          passed = inputRef.val.length >= 6 && inputRef.val.length <= 16
          break
        case 'nickName':
          passed = inputRef.val.length >= 3 && inputRef.val.length <= 10
          break
        case 'custom':
          passed = item.validate ? item.validate() : true
          break
        default:
          break
      }
      return passed
    })
    inputRef.error = !allPassed
    return allPassed
  }
  return true
}
// 暴露校验方法
defineExpose({
  validateInput
})
</script>
<style scoped></style>
