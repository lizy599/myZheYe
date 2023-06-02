<template>
  <li class="dropdown-option" :class="{ 'is-disabled': disabled }">
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ disabled?: boolean }>(), {
  disabled: false
})
</script>
<style>
.dropdown-option.is-disabled {
  pointer-events: none;
  background-color: transparent;
}
.dropdown-option.is-disabled a.dropdown-item {
  color: #6c757d;
}
</style>
