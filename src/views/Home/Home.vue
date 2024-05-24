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
  </div>
</template>

<script setup>
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