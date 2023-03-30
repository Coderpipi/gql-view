<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/user">User</RouterLink>
        <RouterLink to="/users">Users</RouterLink>
      </el-header>
      <el-main>
        <RouterView/>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"</script>
<style>
.common-layout {
  background-color: antiquewhite;
}
</style>
