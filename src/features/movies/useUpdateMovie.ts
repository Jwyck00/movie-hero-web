import type { MovieResponse } from "@/features/movies/common.types";
import { apiService } from "@/lib/api/axios";
import type { ApiErrorResponse } from "@/lib/api/common.types";
import {
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

export interface EditMoviesRequest {
  name: string;
}

const updateMovie = async (
  id: string,
  payload: EditMoviesRequest
): Promise<MovieResponse> => {
  const r = await apiService.put(`/movies/${id}`, payload);
  return r.data;
};

export const useUpdateMovie = (
  opt?: Partial<
    UseMutationOptions<
      MovieResponse,
      AxiosError<ApiErrorResponse>,
      {
        id: string;
        payload: EditMoviesRequest;
      }
    >
  >
) => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: ({ id, payload }) => updateMovie(id, payload),
    ...opt,
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["movie", variables.id],
      });
      opt?.onSettled?.(data, error, variables, context);
    },
  });

  return mutate;
};
