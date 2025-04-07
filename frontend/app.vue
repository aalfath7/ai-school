<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { fetchUser } = useAuth();

onMounted(async () => {
  await fetchUser();
});
</script>
