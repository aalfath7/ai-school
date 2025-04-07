<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Edit News</h1>

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

      <button type="submit" class="bg-yellow-600 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNews } from "~/composables/useNews";

const route = useRoute();
const router = useRouter();
const { getNewsById, updateNews } = useNews();

const id = route.params.id as string;
const title = ref("");
const content = ref("");
const file = ref<File | null>(null);

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    file.value = target.files[0];
  }
};

const fetchNews = async () => {
  const data = await getNewsById(id);
  if (data) {
    title.value = data.title;
    content.value = data.content;
  }
};

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("content", content.value);
  if (file.value) formData.append("image", file.value);

  await updateNews(id, formData);
  router.push("/news");
};

onMounted(() => {
  fetchNews();
});
</script>
