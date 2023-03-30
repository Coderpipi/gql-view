<template>
  <div class="users">
    <el-table :data="users" height="250" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"/>
      <el-table-column prop="username" label="Username" width="180"/>
      <el-table-column prop="age" label="Age" width="180"/>
      <el-table-column prop="sex" label="Sex"/>
    </el-table>
    <div style="margin: 20px"/>
    <el-form
        ref="ruleFormRef"
        :model="user"
        :rules="rules"
        class="demo-ruleForm"
        :size="'default'"
        label-width="120px">
      <el-form-item label="User Name">
        <el-input v-model="user.username"/>
      </el-form-item>
      <el-form-item label="Age" prop="count">
        <el-select-v2
            v-model="user.age"
            placeholder="Activity count"
            :options="options"
        />
      </el-form-item>
      <el-form-item label="Sex">
        <el-radio-group v-model="user.sex">
          <el-radio label="male"/>
          <el-radio label="female"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { getUsers } from "@/api/user"
import type { FormInstance, FormRules } from "element-plus"
import { computed, reactive, ref } from "vue"

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  age: [
    {
      required: true,
      message: 'Please Input Your Age',
      trigger: 'change',
    },
  ],
})
const user = reactive({
  username: '',
  age: '',
  sex: '',
})
const {result} = getUsers()
const users = computed(() => result.value?.getUsers ?? [])
const options = Array.from({length: 120}).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
const onSubmit = () => {
  console.log(user)
}
</script>

<style scoped>
</style>