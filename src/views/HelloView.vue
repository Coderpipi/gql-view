<template>
  <div class="hello">
    <h2>{{ hello }}</h2>
    <hr>
    <button @click="update">Hello Button</button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { gql } from 'graphql-tag'
import { useQuery } from "@vue/apollo-composable"

export default {
  setup() {
    // 定义响应式数据 ref对象
    const hello = ref("hello")
    console.log(hello.value)
    let count: number = 1

    // 更新响应式数据的函数
    function update() {
      const {result} = useQuery<string>(gql`{hello}`)
      hello.value = result.value as string
    }

    return {
      hello,
      update
    }
  }
}
</script>
<style>
@media (min-width: 1024px) {
  .hello {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
