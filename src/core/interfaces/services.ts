export interface PaginationResponse<T> {
  data?: T;
  // ...
}

export interface RefreshTokenResponse {
  accessToken?: string;
}
