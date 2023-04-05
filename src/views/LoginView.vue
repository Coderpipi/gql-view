<template>
  <el-form
      ref="ruleFormRef"
      :model="user"
      :rules="rules"
      class="demo-ruleForm"
      label-width="120px"
      size="default"
      status-icon
  >
    <el-form-item label="Phone" prop="phone">
      <el-input v-model="user.phone" :placeholder="'Phone'"/>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="user.password" :placeholder="'Password'" autocomplete="off" type="password"/>
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

const router = useRouter()
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
    onResult(({data}) => {
      console.log(data)
      // 返回结果后写入cookie
      Cookies.set("token", data.login.token)
      Cookies.set("user_info", JSON.stringify(data.login.user))
      // 跳转到user详情页
      router.push({
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