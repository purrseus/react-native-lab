/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@services';

const fetchPhotos = (config: any) => axiosInstance.get('/list', config);

const commonAPI = {
  fetchPhotos,
};
export default commonAPI;
