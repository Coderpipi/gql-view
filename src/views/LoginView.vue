<template>
  <el-form
      ref="ruleFormRef"
      :model="user"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
  >
    <el-form-item label="Password" prop="pass">
      <el-input v-model="user.password" type="password" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="User Name" prop="username">
      <el-input v-model="user.username"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login(ruleFormRef)"
      >Submit
      </el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus"
import { reactive, ref } from "vue"

const user = reactive<UserLoginForm>({
  username: "",
  password: ""
})

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  username: [
    {
      type: "string",
      required: true,
      message: 'Please Input Your User Name',
      trigger: 'blur',
    },
    {
      type: "string",
      min: 4,
      max: 16,
      message: 'User Name Length must between 4 and 16',
      trigger: 'blur',
    }
  ],
  pass: []
})
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  await formEl.validate((valid, fields) => {
    if (!valid) {
      return
    }
    console.log(user)
  })
}
</script>

<style scoped>

</style>