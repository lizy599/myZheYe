<template>
  <div class="xtx-pagination">
    <a href="javascript:;" class="disabled">上一页</a>
    <a href="javascript:;">1</a>
    <span>...</span>
    <a href="javascript:;" class="active">3</a>
    <a href="javascript:;">4</a>
    <a href="javascript:;">5</a>
    <a href="javascript:;">6</a>
    <a href="javascript:;">7</a>
    <span>...</span>
    <a href="javascript:;">下一页</a>

    <span class="total">总共{{ count }}条</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  count: {
    type: Number,
    required: true
  }
})
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
