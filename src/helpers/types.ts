export interface PaginationParams {
  offset?: number;
  limit?: number;
}

export interface AdFilterParams {
  political?: string[];
  gender?: string[];
  tag?: string[];
  bots?: string[];
  startDate?: Date | null;
  endDate?: Date | null;
}
