<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { message, Modal } from 'ant-design-vue'

// Define the User interface
interface User {
  _id: string
  username: string
  name: string
  age: string
  email: string
  role: string
  createdAt: Date
  updatedAt: Date
}

// Columns definition for the table
const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    width: '20%',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: '25%',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    width: '15%',
  },
  {
    title: 'Actions',
    key: 'action',
    width: '20%',
  },
]

// User state
const users = ref<User[]>([])
const form = ref<User>({
  _id: '',
  username: '',
  name: '',
  age: '',
  email: '',
  role: 'user',
  createdAt: new Date(),
  updatedAt: new Date(),
})

// Modal visibility state
const open = ref<boolean>(false)

// Fetch users
const fetchUsers = async () => {
  try {
    const response = await fetch(`http://localhost:3001/api
/users`)
    const result = await response.json()
    if (result.success) {
      users.value = result.data
    }
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

// Show modal for editing a user
const showModal = (user: User) => {
  form.value = { ...user }
  open.value = true
}

// Handle update
const handleOk = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api
/users/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.value),
      },
    )
    const result = await response.json()
    if (result.success) {
      message.success(result.message)
      fetchUsers()
      handleCancel()
    } else {
      message.error(result.message)
    }
  } catch (error) {
    message.error('Failed to update user')
  }
}

// Reset form and close modal
const handleCancel = () => {
  form.value = {
    _id: '',
    username: '',
    name: '',
    age: '',
    email: '',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  open.value = false
}

// Delete user
const handleDeleteUser = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api
/users/${id}`,
      {
        method: 'DELETE',
      },
    )
    const result = await response.json()
    if (result.success) {
      message.success(result.message)
      fetchUsers()
    } else {
      message.error(result.message)
    }
  } catch (error) {
    message.error('Failed to delete user')
  }
}

// Fetch users on component mount
onMounted(fetchUsers)
</script>

<template>
  <div class="mx-20">
    <a-table :columns="columns" :data-source="users" rowKey="_id" bordered>
      <!-- Custom Body Cell for Action -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <span class="flex gap-2">
            <a-button type="link" @click="showModal(record)"> Edit </a-button>
            <a-button type="link" danger @click="handleDeleteUser(record._id)">
              Delete
            </a-button>
          </span>
        </template>
      </template>
    </a-table>
  </div>

  <!-- Modal for Editing User -->
  <a-modal
    v-model:visible="open"
    title="Edit User"
    @ok="handleOk(form._id)"
    @cancel="handleCancel"
  >
    <a-form layout="vertical">
      <!-- Username -->
      <a-form-item label="Username" required>
        <a-input v-model:value="form.username" placeholder="Enter username" />
      </a-form-item>

      <!-- Name -->
      <a-form-item label="Name" required>
        <a-input v-model:value="form.name" placeholder="Enter name" />
      </a-form-item>

      <!-- Email -->
      <a-form-item label="Email" required>
        <a-input v-model:value="form.email" placeholder="Enter email" />
      </a-form-item>

      <!-- Role -->
      <a-form-item label="Role" required>
        <a-select v-model:value="form.role">
          <a-select-option value="user">User</a-select-option>
          <a-select-option value="admin">Admin</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>
.flex {
  display: flex;
}
.gap-2 {
  gap: 0.5rem;
}
</style>
