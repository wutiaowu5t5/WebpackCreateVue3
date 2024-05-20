<!--
 * @Description: Home.vue
 * @Author: 5t5
 * @Time: 2024/5/20 14:38
-->
<template>
    <div class="hello">
        Hello, Webpack.
        <br />
        <icon-ep-aim />
        <br />
        <el-button type="danger">Danger</el-button>
    </div>
    
</template>

<script setup>
import { reactive, toRefs } from 'vue'

const state = reactive( {} )

const {} = toRefs( state )
</script>

<style scoped lang="less">
.hello {
    color: black;
    width: 100%;
    text-align: center;
    font-size: 40px;
}
</style>