<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Create News</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <input
        v-model="title"
        type="text"
        placeholder="Title"
        class="w-full border px-3 py-2 rounded"
        required
      />

      <textarea
        v-model="content"
        placeholder="Content"
        class="w-full border px-3 py-2 rounded"
        required
      ></textarea>

      <input type="file" @change="handleFileChange" class="block" />

      <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useNews } from "~/composables/useNews";

const { createNews } = useNews();
const router = useRouter();

const title = ref("");
const content = ref("");
const file = ref<File | null>(null);

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    file.value = target.files[0];
  }
};

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("content", content.value);
  if (file.value) formData.append("image", file.value);

  await createNews(formData);
  router.push("/news");
};
</script>
