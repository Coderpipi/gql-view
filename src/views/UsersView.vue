<template>
  <div class="users ">

    <el-table :data="users" style="width: 100%">
      <el-table-column label="Name" prop="username"/>
      <el-table-column label="Phone" prop="phone"/>
      <el-table-column label="Age" prop="age"/>
      <el-table-column label="Sex" prop="sex"/>
      <el-table-column :formatter="typeFormatter" label="Type" prop="type"/>
      <el-table-column align="right">
        <template #header>
          <el-popover :placement="'bottom'" :visible="visible" width="100%">
            <UserForm :user-form="user" :visible="visible" @cancel="visible = false" @submit="submit"></UserForm>
            <template #reference>
              <el-button size="small" @click="handleCreate"
              >Create
              </el-button
              >
            </template>

          </el-popover>

        </template>
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
  </div>
</template>

<script lang="ts" setup>
import { deleteUser, getUsers } from "@/api/user"
import UserForm from "@/components/UserForm.vue"
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router"

const user = ref<User>({
  id: 0,
  age: undefined,
  type: undefined,
  username: '',
  sex: '',
  phone: ''
})
const visible = ref(false)
const router = useRouter()
const typeList = ["Unknown", "Normal", "Vip"]
const typeFormatter = (row: User) => {
  return typeList[row.type ?? 0]
}
const {result, refetch} = getUsers()
const users = computed({
  get: () => {
    return result.value?.users ?? []
  },
  set: () => {}
})


const submit = () => {
  refetch()
  visible.value = !visible.value
}

const handleCreate = () => {
  // 跳转到user详情页
  user.value = {
    id: 0,
    age: undefined,
    type: undefined,
    username: '',
    sex: '',
    phone: ''
  }
  visible.value = true
}

const handleEdit = (curr: User) => {
  visible.value = true
  user.value = curr
  // 跳转到user详情页
  // router.push({
  //   name: 'edit-user',
  //   params: {
  //     ...route.params,
  //     "id": curr.id
  //   }
  // })
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

onMounted(() => {
  refetch()
})
</script>

<style scoped>
</style>