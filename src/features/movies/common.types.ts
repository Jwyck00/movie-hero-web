import type { ActorResponse } from "@/features/actors/common.types";

export interface MovieResponse {
  id: string;
  name: string;
  actors: ActorResponse[];
  ratingsAverage: number;
  ratingsCount: number;
}
