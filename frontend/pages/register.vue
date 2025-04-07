<template>
  <div class="max-w-lg mx-auto mt-10">
    <h2 class="text-2xl font-bold mb-6">New Student Registration</h2>
    <form
      @submit.prevent="submitForm"
      class="space-y-4"
      enctype="multipart/form-data"
    >
      <input
        v-model="form.name"
        type="text"
        placeholder="Full Name"
        class="w-full border p-2 rounded"
        required
      />
      <input
        v-model="form.nisn"
        type="text"
        placeholder="NISN"
        class="w-full border p-2 rounded"
        required
      />
      <input
        v-model="form.email"
        type="email"
        placeholder="Email"
        class="w-full border p-2 rounded"
        required
      />
      <input
        v-model="form.phone"
        type="text"
        placeholder="Phone Number"
        class="w-full border p-2 rounded"
        required
      />
      <input
        type="file"
        @change="handleFile"
        class="w-full border p-2 rounded"
        accept="image/*"
        required
      />
      <input
        v-model="form.birthDate"
        type="date"
        placeholder="Birth Date"
        class="w-full border p-2 rounded"
        required
      />

      <input
        v-model="form.address"
        type="text"
        placeholder="Address"
        class="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        class="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
      >
        Submit Registration
      </button>
    </form>
    <p v-if="successMessage" class="text-green-600 mt-4">
      {{ successMessage }}
    </p>
    <p v-if="errorMessage" class="text-red-600 mt-2">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  name: "",
  nisn: "",
  email: "",
  phone: "",
  birthDate: "",
  address: "",
});

const selectedFile = ref<File | null>(null);
const successMessage = ref("");
const errorMessage = ref("");

const handleFile = (e: Event) => {
  const target = e.target as HTMLInputElement;
  selectedFile.value = target.files?.[0] || null;
};

const submitForm = async () => {
  const config = useRuntimeConfig();
  const body = new FormData();
  body.append("name", form.name);
  body.append("nisn", form.nisn);
  body.append("email", form.email);
  body.append("phone", form.phone);
  body.append("birthDate", form.birthDate);
  body.append("address", form.address);

  if (selectedFile.value) {
    body.append("photo", selectedFile.value);
  }

  try {
    await $fetch(`${config.public.apiBase}/students`, {
      method: "POST",
      body,
    });
    successMessage.value = "Registration successful!";
    errorMessage.value = "";
    Object.assign(form, { name: "", nisn: "", email: "", phone: "" });
    selectedFile.value = null;
  } catch (err: any) {
    errorMessage.value = err?.data?.message || "Registration failed.";
  }
};
</script>
