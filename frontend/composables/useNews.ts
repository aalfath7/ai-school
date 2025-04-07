interface NewsItem {
  _id: string;
  title: string;
  content: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface NewsResponse {
  data: NewsItem[];
  currentPage: number;
  totalPages: number;
}

export const useNews = () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;

  // PERBAIKI: sesuaikan dengan struktur response
  const fetchNews = async (page = 1, q = ""): Promise<NewsResponse> => {
    return await $fetch(`${baseUrl}/news?page=${page}&search=${q}`);
  };

  const getNewsById = async (id: string): Promise<NewsItem> => {
    return await $fetch(`${baseUrl}/news/${id}`);
  };

  const createNews = async (formData: FormData): Promise<NewsItem> => {
    return await $fetch(`${baseUrl}/news`, {
      method: "POST",
      body: formData,
    });
  };

  const updateNews = async (
    id: string,
    formData: FormData
  ): Promise<NewsItem> => {
    return await $fetch(`${baseUrl}/news/${id}`, {
      method: "PUT",
      body: formData,
    });
  };

  const deleteNews = async (id: string): Promise<{ message: string }> => {
    return await $fetch(`${baseUrl}/news/${id}`, {
      method: "DELETE",
    });
  };

  return {
    fetchNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
  };
};
