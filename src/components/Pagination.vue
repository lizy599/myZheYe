<template>
  <div class="xtx-pagination">
    <a href="javascript:;" :class="page.currentPage === 1 ? 'disabled' : ''" @click="pageChange($event, page.currentPage - 1)">上一页</a>
    <template v-for="item in pageTotal" :key="item">
      <span v-if="pageTotal > 10 && (item - page.currentPage === 2 || pageTotal - item === 2 || item - page.currentPage === -1)">...</span>
      <a v-if="pageTotal < 10 || (item - page.currentPage > 3 && item - page.currentPage < 7) || (item - page.currentPage < 2 && item - page.currentPage >= -1) || pageTotal - item < 3" href="javascript:;" :class="item === page.currentPage ? 'active' : ''" @click="pageChange($event, item)">{{
        item
      }}</a>
    </template>
    <a href="javascript:;" :class="page.currentPage === pageTotal ? 'disabled' : ''" @click="pageChange($event, page.currentPage + 1)">下一页</a>
    <select aria-label="Default select example" @change="pageChange">
      <option :selected="page.pageSize === 3" :value="3">3条/页</option>
      <option :selected="page.pageSize === 6" :value="6">6条/页</option>
      <option :selected="page.pageSize === 9" :value="9">9条/页</option>
    </select>
    <span class="total">总共{{ page.count }}条</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  page: {
    type: Object,
    required: true
  }
})
const $emit = defineEmits(['pageChange'])
const pageTotal = computed(() => Math.ceil(props.page.count / props.page.pageSize))

function pageChange(e, currentPage = props.page.currentPage) {
  console.log(currentPage, pageTotal)
  if (currentPage <= 0 || currentPage > pageTotal.value) {
    return
  }
  $emit('pageChange', { pageSize: e.target.value || props.page.pageSize, currentPage })
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    text-decoration: none;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: #25b190;
    }
    &.active {
      background: #25b190;
      color: #fff;
      border-color: #25b190;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
  .total {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 14px;
  }
}
</style>
