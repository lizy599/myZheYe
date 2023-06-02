<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p><RouterLink to="create" class="btn btn-primary my-2">开始写文章</RouterLink></p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <ColumnList :list="list"></ColumnList>
    <Pagination :count="count" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import ColumnList from '../components/ColumnList.vue'
import Pagination from '../components/Pagination.vue'
import { computed, onMounted, ref } from 'vue'
import { getColumns } from '../request/api'

const store = useStore()

const list = computed(() => store.state.columns)
const count = ref(0)

onMounted(async () => {
  if (!store.state.user._id) {
    // store.dispatch('fetchColumns')
    try {
      const res = await getColumns()
      count.value = res.data.count
      store.commit('fetchColumns', res.data)
      store.dispatch('fetchUser')
    } catch (error) {
      console.log(error)
    }
  }
})
</script>
<style scoped></style>
