import type { ActorsResponse } from "@/features/actors/common.types";

export interface MovieResponse {
  id: string;
  name: string;
  actors: ActorsResponse[];
  ratingsAverage: number;
  ratingsCount: number;
}
