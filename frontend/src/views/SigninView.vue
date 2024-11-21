<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data
const form = ref({
  email: '',
  password: '',
})

// Handle sign-in
const signIn = async () => {
  try {
    if (!form.value.email || !form.value.password) {
      message.error('All fields are required')
      return
    }

    const response = await fetch(`http://localhost:3001/api
/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    const result = await response.json()
    if (result.success) {
      message.success('Sign-in successful!')
      localStorage.setItem('jwt', result.token) // Save JWT token
      router.push('/') // Redirect to home page
    } else {
      message.error(result.message || 'Invalid credentials')
    }
  } catch (error: any) {
    message.error(error.message || 'Error occurred during sign-in')
    console.error(error)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white shadow-md rounded-lg p-8">
      <h1 class="text-2xl font-semibold text-gray-800 text-center mb-6">Sign In</h1>
      <a-form layout="vertical" @submit.prevent="signIn">
        <!-- Email -->
        <a-form-item label="Email" required>
          <a-input v-model:value="form.email" placeholder="Enter your email" />
        </a-form-item>

        <!-- Password -->
        <a-form-item label="Password" required>
          <a-input
            v-model:value="form.password"
            type="password"
            placeholder="Enter your password"
          />
        </a-form-item>

        <!-- Submit Button -->
        <a-form-item>
          <a-button type="primary" block @click="signIn">Sign In</a-button>
        </a-form-item>

        <!-- Redirect to Sign Up -->
        <p class="text-sm text-center text-gray-600">
          Don't have an account? 
          <RouterLink to="/signup" class="text-indigo-600 hover:underline">Sign Up</RouterLink>
        </p>
      </a-form>
    </div>
  </div>
</template>
