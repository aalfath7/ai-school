<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">News</h1>
      <NuxtLink
        to="/news/create"
        class="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Add News
      </NuxtLink>
    </div>

    <input
      v-model="search"
      placeholder="Search news..."
      class="border px-3 py-2 mb-4 w-full rounded"
    />

    <div v-if="loading">Loading...</div>

    <div v-else>
      <div
        v-for="item in news"
        :key="item._id"
        class="border p-4 mb-2 rounded shadow"
      >
        <h2 class="text-lg font-semibold">{{ item.title }}</h2>
        <p>{{ item.content }}</p>
        <img
          v-if="item.image"
          :src="`${apiBase}${item.image}`"
          alt="News Image"
          class="w-40 mt-2 rounded"
        />
        <div class="mt-2 space-x-2">
          <NuxtLink :to="`/news/edit/${item._id}`" class="text-blue-500">
            Edit
          </NuxtLink>
          <button @click="removeNews(item._id)" class="text-red-500">
            Delete
          </button>
        </div>
      </div>

      <div class="flex gap-2 mt-4 justify-center">
        <button
          @click="page--"
          :disabled="page === 1"
          class="px-2 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span class="px-2 py-1">Page {{ page }} of {{ totalPages }}</span>
        <button
          @click="page++"
          :disabled="page === totalPages"
          class="px-2 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useNews } from "~/composables/useNews";

const { fetchNews, deleteNews } = useNews();
const apiBase = useRuntimeConfig().public.apiBase;

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  image?: string;
  createdAt?: string;
}

const news = ref<NewsItem[]>([]);
const loading = ref(false);
const page = ref(1);
const totalPages = ref(1);
const search = ref("");

const loadNews = async () => {
  loading.value = true;
  try {
    const result = await fetchNews(page.value, search.value);
    news.value = result.data;
    totalPages.value = result.totalPages;
  } catch (e) {
    console.error("Failed to load news:", e);
  } finally {
    loading.value = false;
  }
};

const removeNews = async (id: string) => {
  const confirmDelete = confirm("Are you sure you want to delete this news?");
  if (confirmDelete) {
    await deleteNews(id);
    await loadNews();
  }
};

// Reset ke halaman 1 kalau pencarian berubah
watch(search, () => {
  page.value = 1;
});

watch([page, search], loadNews, { immediate: true });
</script>
