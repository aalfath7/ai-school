<!-- layouts/default.vue -->
<template>
  <div>
    <Navbar />
    <div class="max-w-5xl mx-auto p-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
import Navbar from "~/components/Navbar.vue";
</script>
