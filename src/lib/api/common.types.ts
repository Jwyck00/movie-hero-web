export interface IPaginatedResponse<TData> {
  items: TData[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ApiErrorResponse {
  title: string;
  status: number;
  detail: string;
}
