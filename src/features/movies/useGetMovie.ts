import type { MovieResponse } from "@/features/movies/common.types";
import { apiService } from "@/lib/api/axios";
import type { ApiErrorResponse } from "@/lib/api/common.types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

const getMovie = async (id: string): Promise<MovieResponse> => {
  const r = await apiService.get(`/movies/${id}`);
  return r.data;
};

export const useGetMovie = (
  id: string,
  opt?: Partial<UseQueryOptions<MovieResponse, AxiosError>>
) => {
  const query = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id),
    ...opt,
  });

  return query;
};
