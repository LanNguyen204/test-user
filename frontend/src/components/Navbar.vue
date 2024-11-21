<script setup>
import { RouterLink } from 'vue-router'
import { PlusCircleOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import router from '@/router'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const logout = () => {
  localStorage.removeItem('jwt') // Remove JWT from localStorage
  router.push('/signin') // Redirect to login page
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 bg-white shadow">
    <nav class="flex items-center justify-between p-4 md:px-8 lg:px-12" aria-label="Global">
      <!-- Logo -->
      <div class="flex lg:flex-1">
        <RouterLink to="/" class="flex items-center">         
          <span class="ml-2 text-lg font-bold text-gray-800">User Management</span>
        </RouterLink>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex lg:gap-8 lg:items-center">
        <RouterLink to="/" class="text-sm font-medium text-gray-700 hover:text-indigo-600">
          Product
        </RouterLink>
        <RouterLink
          to="/create-user"
          class="text-sm font-medium text-gray-700 hover:text-indigo-600 flex items-center gap-1"
        >
          Create <PlusCircleOutlined />
        </RouterLink>
      </div>

      <!-- Action Buttons -->
      <div class="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
        <button
          @click="logout"
          class="text-sm font-medium text-gray-700 hover:text-red-600 flex items-center gap-1"
        >
          Log out
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <div class="lg:hidden flex items-center">
        <button
          @click="toggleMobileMenu"
          class="text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <MenuOutlined v-if="!isMobileMenuOpen" class="h-6 w-6" />
          <CloseOutlined v-if="isMobileMenuOpen" class="h-6 w-6" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="lg:hidden bg-gray-50 shadow-md absolute inset-x-0 top-full z-40 p-4"
    >
      <RouterLink
        to="/"
        class="block text-sm font-medium text-gray-700 hover:text-indigo-600 py-2"
        @click="toggleMobileMenu"
      >
        Product
      </RouterLink>
      <RouterLink
        to="/create-user"
        class="text-sm font-medium text-gray-700 hover:text-indigo-600 py-2 flex items-center gap-1"
        @click="toggleMobileMenu"
      >
        Create <PlusCircleOutlined />
      </RouterLink>
      <button
        @click="() => { logout(); toggleMobileMenu() }"
        class="block text-sm font-medium text-red-600 hover:text-red-800 py-2"
      >
        Log out
      </button>
    </div>
  </header>
</template>

<style scoped>
/* Add subtle styling adjustments for better UX */
</style>
