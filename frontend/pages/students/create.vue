<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Add New Student</h1>

    <form @submit.prevent="submitStudent" class="space-y-4">
      <div>
        <label class="block font-medium">Name</label>
        <input
          v-model="form.name"
          type="text"
          class="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label class="block font-medium">Birth Date</label>
        <input
          v-model="form.birthDate"
          type="date"
          class="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label class="block font-medium">Photo</label>
        <input
          type="file"
          @change="onFileChange"
          accept="image/*"
          class="w-full"
        />
      </div>

      <div>
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref<{
  name: string;
  birthDate: string;
  photo: File | null;
}>({
  name: "",
  birthDate: "",
  photo: null,
});

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    form.value.photo = target.files[0];
  }
};

const submitStudent = async () => {
  const formData = new FormData();
  formData.append("name", form.value.name);
  formData.append("birthDate", form.value.birthDate);
  if (form.value.photo) {
    formData.append("photo", form.value.photo);
  }

  try {
    await $fetch("/api/students", {
      method: "POST",
      body: formData,
    });
    router.push("/students");
  } catch (err) {
    console.error(err);
    alert("Failed to add student");
  }
};
</script>
