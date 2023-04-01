<template>
  <div class="users ">
    <el-table :data="users" style="width: 100%">
      <el-table-column label="Name" prop="username"/>
      <el-table-column label="Phone" prop="phone"/>
      <el-table-column label="Age" prop="age"/>
      <el-table-column label="Sex" prop="sex"/>
      <el-table-column label="Type" prop="type" :formatter="typeFormatter"/>
      <el-table-column align="right">
        <template #default="{row}">
          <el-button size="small" @click="handleEdit(row)"
          >Edit
          </el-button
          >
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(row)"
          >Delete
          </el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 20px"/>
    <el-form
        ref="ruleFormRef"
        :model="user"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="'default'"
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
            placeholder="Age"
            :options="options"
        />
      </el-form-item>
      <el-form-item label="Sex" prop="sex">
        <el-radio-group v-model="user.sex">
          <el-radio label="male"/>
          <el-radio label="female"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Type">
        <el-select v-model.number="user.type" placeholder="please select user type">
          <el-option label="Vip" value="1"/>
          <el-option label="Normal" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { createUser, deleteUser, getUsers } from "@/api/user"
import type { FormInstance, FormRules } from "element-plus"
import { computed, reactive, ref } from "vue"

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
      message: "手机号必须为11位的数字"
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
      enum: ["male", "female"]
    }
  ]

})
const user = reactive<User>({
  id: 0,
  age: undefined,
  type: undefined,
  username: '',
  sex: '',
  phone: ''
})

let {result, refetch} = getUsers()
let users = computed({
  get: () => {
    return result.value?.users ?? []
  },
  set: () => {}
})

const options = Array.from({length: 100}).map((_, idx) => ({
  value: idx + 1,
  label: `${idx + 1}`,
}))

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  await formEl.validate((valid, fields) => {
        if (!valid) {
          return
        }
        createUser(user).then(() => {
          return refetch()
        }).then((data) => {
          if (!data) {
            return
          }
          if (data.error as undefined) {
            return
          }
        })
      }
  )
}
const handleEdit = (curr: User) => {
  console.log(curr)
}
const handleDelete = (curr: User) => {
  deleteUser(curr.id).then(() => {
    return refetch()
  }).then((data) => {
    if (!data) {
      return
    }
    if (data.error as undefined) {
      return
    }
  })
}
const typeList = ["Unknown", "Normal", "Vip"]
const typeFormatter = (row: User) => {
  return typeList[row.type ?? 0]
}
</script>

<style scoped>
</style>