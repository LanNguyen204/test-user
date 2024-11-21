<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data
const form = ref({
  username: '',
  email: '',
  password: '',
})

// Handle sign-up
const signUp = async () => {
  try {
    if (!form.value.username || !form.value.email || !form.value.password) {
      message.error('All fields are required')
      return
    }

    const response = await fetch(
      `http://localhost:3001/api
/users/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value),
      },
    )

    const result = await response.json()
    if (result.success) {
      message.success('Sign-up successful! Please sign in.')
      router.push('/signin') // Redirect to sign-in page
    } else {
      message.error(result.message || 'Failed to sign up')
    }
  } catch (error: any) {
    message.error(error.message || 'Error occurred during sign-up')
    console.error(error)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white shadow-md rounded-lg p-8">
      <h1 class="text-2xl font-semibold text-gray-800 text-center mb-6">
        Sign Up
      </h1>
      <a-form layout="vertical" @submit.prevent="signUp">
        <!-- Username -->
        <a-form-item label="Username" required>
          <a-input
            v-model:value="form.username"
            placeholder="Enter your username"
          />
        </a-form-item>

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
          <a-button type="primary" block @click="signUp">Sign Up</a-button>
        </a-form-item>

        <!-- Redirect to Sign In -->
        <p class="text-sm text-center text-gray-600">
          Already have an account?
          <RouterLink to="/signin" class="text-indigo-600 hover:underline"
            >Sign In</RouterLink
          >
        </p>
      </a-form>
    </div>
  </div>
</template>
