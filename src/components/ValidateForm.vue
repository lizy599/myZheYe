<template>
  <form class="validate-form-container">
    <slot></slot>
    <div class="submit-area" @click.prevent="submitForm" style="text-align: center">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>
<script lang="ts">
export const emitter = mitt()
</script>
<script setup lang="ts">
import mitt from 'mitt'
import { onUnmounted } from 'vue'

type ValidateFunc = () => boolean
const $emits = defineEmits(['form-submit'])
let funcArr: ValidateFunc[] = []
const submitForm = () => {
  const result = funcArr.map(item => item()).every(item => item)
  $emits('form-submit', result)
}
const callback = (validateFunc: ValidateFunc) => {
  funcArr.push(validateFunc)
}
emitter.on('form-item-created', callback)
onUnmounted(() => {
  emitter.off('form-item-created', callback)
  funcArr = []
})
</script>
<style scoped></style>
