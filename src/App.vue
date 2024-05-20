<!--
 * @Description: App.vue
 * @Author: 5t5
 * @Time: 2024/5/20 11:56
-->
<template>
    <router-view ref="page" />
</template>

<script setup>
import { reactive, toRefs } from 'vue'

const state = reactive( {} )

const {} = toRefs( state )
</script>

<style scoped lang="less">

</style>