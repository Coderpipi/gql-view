<template>
  <div class="hello">
    <div v-if="user">
      <h1>{{ user.id }}</h1>
      <h1>{{ user.username }}</h1>
      <h1>{{ user.age }}</h1>
      <h1>{{ user.sex }}</h1>
      <h1>{{ user.type }}</h1>
      <h1>{{ user.phone }}</h1>
    </div>
    <span style="margin-right: 10px">please input your user id: </span>
    <input id="test" v-model="id" name="test" type="number">
    <button @click="getUser(id)">查询</button>
    <hr>
  </div>
</template>

<script lang="ts" setup>
import { getUserByID } from '@/api/user'
import { computed, ref } from "vue"

// 定义响应式数据 ref对象
const id = ref(0)

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
