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
        <el-button type="primary" @click="onSubmit(ruleFormRef)">Submit</el-button>
        <el-button type="primary" @click="onCancel(ruleFormRef)">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>

import { createUser, updateUser } from "@/api/user"
import type { FormInstance, FormRules } from "element-plus"
import { ElMessage } from "element-plus"
import { reactive, ref, toRef, watch } from "vue"
import { useRouter } from "vue-router"

const props = defineProps<{
  visible: boolean,
  userForm: User
}>()
const router = useRouter()
const emit = defineEmits<{ (event: "cancel"): void, (event: "submit"): void }>()
const state = reactive<{ user: User }>({user: props.userForm})

const user = toRef(state, 'user')

watch(() => props.userForm, () => {
  user.value = {...props.userForm}
})
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
      message: "type must be Normal or Vip ",
      trigger: "blur"
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
        if (user.value.id !== 0) {
          updateUser(user.value).then(() => {
            emit('submit')
            ElMessage({
              message: "更新用户成功",
              type: 'success',
            })
            formEl.resetFields()
            router.push({
              name: "users"
            })
          })
        } else {
          createUser(user.value).then(() => {
            emit('submit')
            ElMessage({
              message: "创建用户成功",
              type: 'success',
            })
            formEl.resetFields()
            router.push({
              name: "users"
            })
          })
        }

      }
  )
}

const onCancel = async (formEl: FormInstance | undefined) => {
  emit('cancel')

}
</script>

<style scoped>

</style>