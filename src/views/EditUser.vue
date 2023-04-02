<template>
  <div>
    <el-form
        ref="ruleFormRef"
        :model="user"
        :rules="rules"
        :size="'default'"
        class="demo-ruleForm"
        label-width="120px"
        status-icon
    >
      <el-form-item label="User Name" prop="username">
        <el-input v-model="user.username"/>
      </el-form-item>
      <el-form-item label="Phone" prop="phone">
        <el-input v-model="user.phone"/>
      </el-form-item>
      <el-form-item label="Age" prop="age">
        <el-select-v2
            v-model="user.age"
            :options="options"
            placeholder="Age"
        />
      </el-form-item>
      <el-form-item label="Sex" prop="sex">
        <el-radio-group v-model="user.sex">
          <el-radio label="male"/>
          <el-radio label="female"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Type" prop="type">
        <el-select-v2
            v-model="user.type"
            :options="typeOptions"
            placeholder="Type"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>

import { getUserByID, updateUser } from "@/api/user"
import type { FormInstance, FormRules } from "element-plus"
import { ElMessage } from "element-plus"
import { onMounted, reactive, ref, toRef, watch } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id as unknown as number)
const {result, variables} = getUserByID(id)

const state = reactive({
  user: {
    id: 0,
    age: undefined,
    type: undefined,
    username: '',
    sex: '',
    phone: ''
  }
})

watch(() => result.value, () => {
  user.value = {...result.value?.user}
})

onMounted(() => {
  variables.value = {
    id: id
  }
})


const user = toRef(state, 'user')


const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: 'Please Input Your User Name',
      trigger: 'blur',
    },
  ],
  phone: [
    {
      type: "string",
      required: true,
      len: 11,
      message: "手机号必须为11位的数字",
      trigger: 'blur',
    }

  ],
  age: [
    {
      type: 'number',
      min: 18,
      max: 70,
      message: 'You age must between 18 and 70',
      trigger: 'change'
    }
  ],
  sex: [
    {
      type: "enum",
      required: true,
      enum: ["male", "female"],
      trigger: "blur"
    }
  ],
  type: [
    {
      type: "enum",
      required: true,
      enum: [1, 2],
      message: "type must be Normal or Vip "
    }
  ]

})
const typeList = ["Unknown", "Normal", "Vip"]

const options = Array.from({length: 100}).map((_, idx) => ({
  value: idx + 1,
  label: `${idx + 1}`,
}))

const typeOptions = Array.from({length: 3}).map((_, idx) => ({
  value: idx,
  label: `${typeList[idx]}`,
}))

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  await formEl.validate((valid, fields) => {
        if (!valid) {
          return
        }
        updateUser(user.value).then(() => {
          ElMessage({
            message: "更新成功",
            type: 'success',
          })
          formEl.resetFields()
          router.push({
            name: "users"
          })
        })
      }
  )
}
</script>

<style scoped>

</style>