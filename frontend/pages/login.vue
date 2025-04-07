<template>
  <div class="max-w-md mx-auto mt-10">
    <h2 class="text-2xl font-bold mb-4">Teacher/Admin Login</h2>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="w-full border p-2 rounded"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full border p-2 rounded"
        required
      />
      <button
        type="submit"
        class="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";
import { useRouter } from "vue-router";

definePageMeta({
  middleware: ["redirect-if-auth"],
});

const username = ref("");
const password = ref("");
const error = ref("");
const { setToken } = useAuth();
const router = useRouter();

const handleLogin = async () => {
  error.value = "";
  try {
    const config = useRuntimeConfig();
    const res: any = await $fetch(`${config.public.apiBase}/auth/login`, {
      method: "POST",
      body: { username: username.value, password: password.value },
    });

    if (res.token && res.user) {
      setToken(res.token, res.user); // simpan token & user
      router.push("/dashboard");
    }
  } catch (err: any) {
    error.value = err?.data?.message || "Login failed.";
  }
};
</script>
