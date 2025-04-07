<template>
  <div class="max-w-6xl mx-auto mt-10">
    <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-blue-100 p-6 rounded shadow text-center">
        <h2 class="text-xl font-semibold">Students</h2>
        <p class="text-3xl font-bold">{{ summary.students }}</p>
      </div>
      <div class="bg-green-100 p-6 rounded shadow text-center">
        <h2 class="text-xl font-semibold">Teachers</h2>
        <p class="text-3xl font-bold">{{ summary.teachers }}</p>
      </div>
      <div class="bg-yellow-100 p-6 rounded shadow text-center">
        <h2 class="text-xl font-semibold">News</h2>
        <p class="text-3xl font-bold">{{ summary.news }}</p>
      </div>
    </div>

    <!-- Student List -->
    <div class="mb-6">
      <h2 class="text-2xl font-semibold mb-4">Registered Students</h2>
      <table class="w-full border-collapse border">
        <thead>
          <tr class="bg-gray-100">
            <th class="border p-2 text-left">Name</th>
            <th class="border p-2 text-left">NISN</th>
            <th class="border p-2 text-left">Email</th>
            <th class="border p-2 text-left">Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student._id">
            <td class="border p-2">{{ student.name }}</td>
            <td class="border p-2">{{ student.nisn }}</td>
            <td class="border p-2">{{ student.email }}</td>
            <td class="border p-2">{{ student.phone }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const config = useRuntimeConfig();

const summary = reactive({
  students: 0,
  teachers: 0,
  news: 0,
});
const students = ref<any[]>([]);

const fetchDashboardData = async () => {
  const dashboard: any = await $fetch(`${config.public.apiBase}/dashboard`);
  summary.students = dashboard.totalStudents;
  summary.teachers = dashboard.totalTeachers;
  summary.news = dashboard.totalNews;
  students.value = dashboard.students;
};

onMounted(() => {
  fetchDashboardData();
});
</script>
