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
          <el-button size="small" @click="handleCreate"
          >Create
          </el-button
          >
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
import { computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()
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

const handleCreate = () => {
  // 跳转到user详情页
  router.push({
    name: 'create-user',
  })
}

const handleEdit = (curr: User) => {
  // 跳转到user详情页
  router.push({
    name: 'edit-user',
    params: {
      ...route.params,
      "id": curr.id
    }
  })
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