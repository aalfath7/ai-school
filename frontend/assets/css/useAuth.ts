// composables/useAuth.ts
export const useAuth = () => {
  const token = useCookie("token");

  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  const clearToken = () => {
    token.value = null;
  };

  return { token, setToken, clearToken };
};
