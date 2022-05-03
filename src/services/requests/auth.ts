import { RefreshTokenResponse } from '@core/interfaces';
import axios, { AxiosResponse } from 'axios';

export const handleRefreshToken = (
  refreshToken: string,
): Promise<AxiosResponse<RefreshTokenResponse>> =>
  axios.post(`/auth/refresh-token`, {
    refreshToken,
  });

const authAPI = {};

export default authAPI;
