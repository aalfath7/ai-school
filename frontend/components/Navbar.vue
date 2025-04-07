<!-- components/Navbar.vue -->
<template>
  <nav class="bg-white shadow p-4 flex justify-between items-center">
    <div class="font-bold text-xl">School App</div>
    <div class="space-x-4">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/news">News</NuxtLink>
      <NuxtLink to="/register">Register</NuxtLink>
      <NuxtLink v-if="!isLoggedIn" to="/login">Login</NuxtLink>
      <button v-else @click="handleLogout" class="text-red-600 hover:underline">
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";

const { isLoggedIn, clearToken } = useAuth();
const router = useRouter();

const handleLogout = () => {
  clearToken();
  router.push("/login");
};
</script>
