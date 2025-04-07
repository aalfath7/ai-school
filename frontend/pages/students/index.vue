<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Student List</h1>

    <div class="mb-4 flex items-center justify-between">
      <input
        type="text"
        v-model="search"
        @input="fetchStudents"
        placeholder="Search students..."
        class="border rounded p-2 w-full max-w-sm"
      />
      <NuxtLink
        to="/students/create"
        class="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Add New
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="student in students"
        :key="student._id"
        class="border rounded p-4 shadow hover:shadow-md transition"
      >
        <img
          v-if="student.photo"
          :src="`/uploads/${student.photo}`"
          class="w-full h-48 object-cover mb-2 rounded"
        />
        <h2 class="text-xl font-semibold">{{ student.name }}</h2>
        <p class="text-gray-500">Birth: {{ student.birthDate }}</p>
        <NuxtLink
          :to="`/students/${student._id}`"
          class="text-blue-600 hover:underline mt-2 inline-block"
        >
          View Card
        </NuxtLink>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-6 space-x-2">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        class="px-3 py-1 border rounded"
        :class="
          page === currentPage
            ? 'bg-blue-500 text-white'
            : 'bg-white text-black'
        "
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStudents } from "~/composables/useStudents";

const { getStudents } = useStudents();

const students = ref<
  Array<{
    _id: string;
    name: string;
    birthDate: string;
    photo?: string;
  }>
>([]);

const search = ref<string>("");
const currentPage = ref<number>(1);
const totalPages = ref<number>(1);

const fetchStudents = async (): Promise<void> => {
  const response = await getStudents(search.value, currentPage.value);
  students.value = response.students;
  totalPages.value = response.totalPages;
};

const changePage = (page: number): void => {
  currentPage.value = page;
  fetchStudents();
};

onMounted(fetchStudents);
</script>
