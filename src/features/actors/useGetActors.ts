import type { ActorResponse } from "@/features/actors/common.types";
import { apiService } from "@/lib/api/axios";
import type { IPaginatedResponse } from "@/lib/api/common.types";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export interface ActorsRequestParams {
  pageNumber: number;
  pageSize: number;
  q?: string;
}

const getActors = async (
  params: ActorsRequestParams
): Promise<IPaginatedResponse<ActorResponse>> => {
  const r = await apiService.get("/actors", {
    params,
  });
  return r.data;
};

export const useGetActors = (params: ActorsRequestParams) => {
  const query = useInfiniteQuery<
    IPaginatedResponse<ActorResponse>,
    AxiosError,
    InfiniteData<IPaginatedResponse<ActorResponse>>,
    ["actors", ActorsRequestParams],
    ActorsRequestParams
  >({
    queryKey: ["actors", params],
    queryFn: ({ pageParam }) => getActors({ ...params, ...pageParam }),
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
