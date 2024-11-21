<script setup lang="ts">
import { ref } from 'vue'
import { Form, Input, Button, Select, message } from 'ant-design-vue'

// Form data
const form = ref({
  username: '',
  name: '',
  age: '',
  email: '',
  password: '',
  role: 'user', // Default role
})

// Handle form submission
const submitForm = async () => {
  try {
    if (
      !form.value.username ||
      !form.value.name ||
      !form.value.age ||
      !form.value.email ||
      !form.value.password
    ) {
      message.error('All fields are required')
      return
    }

    const response = await fetch('http://localhost:3001/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.value),
    })

    const result = await response.json()

    if (result.success) {
      message.success('User create successfully!')
      // Reset form fields
      form.value.username = ''
      form.value.name = ''
      form.value.age = ''
      form.value.email = ''
      form.value.password = ''
      form.value.role = 'user'
    } else {
      message.error(result.message || 'Registration failed')
    }
  } catch (error: any) {
    message.error(error.message || 'Failed to register user')
    console.error(error)
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
    <a-form @submit.prevent="submitForm" layout="vertical">
      <!-- Username Input -->
      <a-form-item label="Username" required>
        <a-input
          v-model:value="form.username"
          placeholder="Enter your username"
        />
      </a-form-item>

      <!-- Name Input -->
      <a-form-item label="Name" required>
        <a-input
          v-model:value="form.name"
          placeholder="Enter your name"
        />
      </a-form-item>

      <!-- Age Input -->
      <a-form-item label="Age" required>
        <a-input
          v-model:value="form.age"
          placeholder="Enter your age"
          type="number"
        />
      </a-form-item>

      <!-- Email Input -->
      <a-form-item label="Email" required>
        <a-input
          v-model:value="form.email"
          placeholder="Enter your email"
          type="email"
        />
      </a-form-item>

      <!-- Password Input -->
      <a-form-item label="Password" required>
        <a-input
          v-model:value="form.password"
          placeholder="Enter your password"
          type="password"
        />
      </a-form-item>

      <!-- Role Selection -->
      <a-form-item label="Role" required>
        <a-select v-model:value="form.role" placeholder="Select a role">
          <a-select-option value="user">User</a-select-option>
          <a-select-option value="admin">Admin</a-select-option>
        </a-select>
      </a-form-item>

      <!-- Submit Button -->
      <a-form-item>
        <a-button type="primary" html-type="submit">Register</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
.max-w-lg {
  max-width: 600px;
}
</style>
