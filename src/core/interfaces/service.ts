export interface File {
  uri: string;
  name: string;
  type: string;
}

export interface RefreshTokenResponse {
  accessToken?: string;
}
