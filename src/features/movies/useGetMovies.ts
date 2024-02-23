import type { MovieResponse } from "@/features/movies/common.types";
import { apiService } from "@/lib/api/axios";
import type { IPaginatedResponse } from "@/lib/api/common.types";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export interface MoviesRequestParams {
  pageNumber: number;
  pageSize: number;
  q?: string;
}

const getMovies = async (
  params: MoviesRequestParams
): Promise<IPaginatedResponse<MovieResponse>> => {
  const r = await apiService.get("/movies", {
    params,
  });
  return r.data;
};

export const useGetMovies = (params: MoviesRequestParams) => {
  const query = useInfiniteQuery<
    IPaginatedResponse<MovieResponse>,
    AxiosError,
    InfiniteData<IPaginatedResponse<MovieResponse>>,
    ["movies", MoviesRequestParams],
    MoviesRequestParams
  >({
    queryKey: ["movies", params],
    queryFn: ({ pageParam }) => getMovies({ ...params, ...pageParam }),
    getNextPageParam: (param) => {
      if (!param.hasNextPage) return undefined;

      return {
        ...params,
        pageNumber: param.pageNumber + 1,
      };
    },
    initialPageParam: {
      ...params,
    },
  });

  return query;
};
