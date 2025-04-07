<template>
  <div class="max-w-2xl mx-auto p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Student Card</h1>
      <button
        @click="printCard"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Print Card
      </button>
    </div>

    <div
      id="card"
      class="border p-6 rounded shadow-md bg-white w-full md:w-[350px]"
    >
      <div class="text-center mb-4">
        <img
          :src="student?.photoUrl"
          alt="Student Photo"
          class="mx-auto w-24 h-24 object-cover rounded-full border"
        />
      </div>
      <h2 class="text-center font-bold text-xl mb-2">{{ student?.name }}</h2>
      <p class="text-center text-gray-600">
        Birth Date: {{ student?.birthDate }}
      </p>
      <p class="text-center text-gray-600">ID: {{ student?._id }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

interface Student {
  _id: string;
  name: string;
  birthDate: string;
  photoUrl: string;
}

const route = useRoute();
const student = ref<Student | null>(null);

const fetchStudent = async () => {
  try {
    const id = route.params.id as string;
    const res: any = await $fetch(`/api/students/${id}`);
    student.value = res;
  } catch (error) {
    console.error("Error fetching student:", error);
  }
};

const printCard = () => {
  const printContents = document.getElementById("card")?.innerHTML;
  if (!printContents) return;

  const win = window.open("", "", "height=600,width=400");
  if (win) {
    win.document.write("<html><head><title>Print Student Card</title>");
    win.document.write(
      "<style>body{ font-family: sans-serif; padding: 20px; }</style>"
    );
    win.document.write("</head><body>");
    win.document.write(printContents);
    win.document.write("</body></html>");
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      win.close();
    }, 500);
  }
};

onMounted(fetchStudent);
</script>
