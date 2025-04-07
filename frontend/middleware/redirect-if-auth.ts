import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async () => {
  const { isLoggedIn, fetchUser } = useAuth();

  // Pastikan user di-fetch dulu kalau token ada
  await fetchUser();

  if (isLoggedIn.value) {
    return navigateTo("/dashboard"); // arahkan ke dashboard jika sudah login
  }
});
