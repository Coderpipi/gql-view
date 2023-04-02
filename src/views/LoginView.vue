<template>
  <el-form
      ref="ruleFormRef"
      :model="user"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      size="default"
  >
    <el-form-item label="Phone" prop="phone">
      <el-input v-model="user.phone" :placeholder="'Phone'"/>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="user.password" type="password" autocomplete="off" :placeholder="'Password'"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit(ruleFormRef)"
      >Submit
      </el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { login } from "@/api/login"
import type { FormInstance, FormRules } from "element-plus"
import { ElMessage } from "element-plus"
import Cookies from 'js-cookie'
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

const user = reactive<UserLoginForm>({
  phone: "",
  password: "",
  verifyCode: "",
  loginType: 1
})

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  phone: [
    {
      type: "string",
      required: true,
      message: 'Please Input Your 11 PhoneNumbers',
      len: 11,
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true
    }
  ]
})
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  await formEl.validate((valid, fields) => {
    if (!valid) {
      return
    }
    let {onResult, onError} = login(user)
    onResult((result) => {
      console.log(result)
      // 返回结果后写入cookie
      Cookies.set("token", result.data.tokenString)
      Cookies.set("user_info", JSON.stringify(result.data.user))
      // 跳转到user详情页
      useRouter().push({
        name: 'users'
      })
    })
    onError((err) => {
      ElMessage({
        message: err.message,
        type: 'error',
      })
    })
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>

</style>