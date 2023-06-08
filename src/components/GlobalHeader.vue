<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a href="javascript:;" class="navbar-brand">者也专栏</a>
    <ul class="list-inline mb-0" v-if="token">
      <li class="list-inline-item">
        <Dropdown :title="`你好 ${user.nickName}`">
          <DropdownItem>
            <router-link to="/create" class="dropdown-item">新建文章</router-link>
          </DropdownItem>
          <DropdownItem disabled>
            <a href="#" class="dropdown-item">编辑资料</a>
          </DropdownItem>
          <DropdownItem>
            <a href="#" class="dropdown-item" @click="loginOut">退出登陆</a>
          </DropdownItem>
        </Dropdown>
      </li>
    </ul>
    <ul class="list-inline mb-0" v-else>
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { useStore } from 'vuex'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'

export interface userProps {
  nickName?: string
  _id?: string
}
const store = useStore()
const token = computed(() => store.state.token)
defineProps({
  user: {
    type: Object as PropType<userProps>,
    required: true
  }
})
// 退出登录
function loginOut() {
  store.commit('loginOut')
}
</script>
<style scoped></style>
