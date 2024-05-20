<!--
 * @Description: Home.vue
 * @Author: 5t5
 * @Time: 2024/5/20 14:38
-->
<template>
    <div class="hello">
        Hello, Webpack.
    </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'

const state = reactive( {} )

const {} = toRefs( state )
</script>

<style scoped>

</style>