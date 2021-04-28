export interface PaginationParams {
  offset?: number;
  limit?: number;
}

export interface AdFilterParams {
  political?: string[];
  gender?: string[];
  tag?: string[];
}
