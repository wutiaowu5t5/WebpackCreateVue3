<!--
 * @Description: Home.vue
 * @Author: 5t5
 * @Time: 2024/5/20 14:38
-->
<template>
  <div class="hello">
    Hello, Webpack.
    <br>
    <icon-ep-aim />
    <br>
    <el-button type="danger">
      Danger
    </el-button>
    <span>lang lang yu wo~~~</span>
    <span>mut ziu dim yan zaau bed dou nei</span>
    <span>mut ziu dim yan zaau bed dou nei</span>
  </div>
</template>

<script setup>
console.info('mut ziu dim yan zaau bed dou nei')
console.warn('mut ziu dim yan zaau bed dou nei')
console.error('mut ziu dim yan zaau bed dou nei')
console.success('mut ziu dim yan zaau bed dou nei')
console.log('mut ziu dim yan zaau bed dou nei')
console.table({id: 1, name: 'Alice', age: 25})
console.table([1, 2, 3, 4, 5, 6, 7, 8, 9])
console.table([
  {id: 1, name: 'Alice', age: 25},
  {id: 2, name: 'Bob', age: 30},
  {id: 3, name: 'Charlie', age: 35},
  1,
  3
])
</script>

<style scoped lang="less">
.hello {
  margin-top: 20px;
  color: black;
  width: 100%;
  text-align: center;
  font-size: 40px;
  
  > span {
    color: red;
  }
}
</style>