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

export interface RateMoviesRequest {
  rate: number;
}

const rateMovie = async (
  movieId: string,
  payload: RateMoviesRequest
): Promise<MovieResponse> => {
  const r = await apiService.post(`/movies/${movieId}/rate`, payload);
  return r.data;
};

export const useRateMovie = (
  opt?: Partial<
    UseMutationOptions<
      MovieResponse,
      AxiosError<ApiErrorResponse>,
      {
        movieId: string;
        payload: RateMoviesRequest;
      }
    >
  >
) => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: ({ movieId, payload }) => rateMovie(movieId, payload),
    ...opt,
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
        exact: false
      });
      opt?.onSettled?.(data, error, variables, context);
    },
  });

  return mutate;
};
