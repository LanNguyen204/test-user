<script setup lang="tsx">
import Navbar from './components/Navbar.vue'
import { RouterView, useRoute } from 'vue-router'

// Get the current route
const route = useRoute()

</script>

<template>
<header class="mb-5" v-if="route.path !== '/login' && route.path !== '/register'">
  <Navbar />
</header>

  <div class="">
    <RouterView />
  </div>
</template>
