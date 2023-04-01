<template>
  <div class="hello">
    <div v-if="user">
      <h1>{{ user.id }}</h1>
      <h1>{{ user.username }}</h1>
      <h1>{{ user.age }}</h1>
      <h1>{{ user.sex }}</h1>
    </div>
    <input type="number" name="test" id="test" v-model="id">
    <button @click="getUser(id)">查询</button>
    <hr>
  </div>
</template>

<script setup lang="ts">
import { getUserByID } from '@/api/user'
import { computed, ref } from "vue"

// 定义响应式数据 ref对象
const id = ref(2)

const {result, variables} = getUserByID(id.value)

const user = computed<User>(() => result.value?.user ?? [])

const getUser = (id: number) => {
  variables.value = {
    id: id
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
