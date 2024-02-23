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

export interface CreateMoviesRequest {
  name: string;
}

const createMovie = async (
  payload: CreateMoviesRequest
): Promise<MovieResponse> => {
  const r = await apiService.post(`/movies`, payload);
  return r.data;
};

export const useCreateMovie = (
  opt?: Partial<
    UseMutationOptions<
      MovieResponse,
      AxiosError<ApiErrorResponse>,
      CreateMoviesRequest
    >
  >
) => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (payload) => createMovie(payload),
    ...opt,
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
      opt?.onSettled?.(data, error, variables, context);
    },
  });

  return mutate;
};
