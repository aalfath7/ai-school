// composables/useStudents.ts

interface Student {
  _id: string;
  name: string;
  birthDate: string;
  photo?: string;
}

interface StudentListResponse {
  students: Student[];
  totalPages: number;
}

export function useStudents() {
  const getStudents = async (
    search: string = "",
    page: number = 1
  ): Promise<StudentListResponse> => {
    try {
      const res = await $fetch<StudentListResponse>(`/api/students`, {
        params: { search, page },
      });
      return res;
    } catch (err) {
      console.error(err);
      return { students: [], totalPages: 1 };
    }
  };

  return { getStudents };
}
