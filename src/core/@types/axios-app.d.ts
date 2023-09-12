/* eslint-disable @typescript-eslint/no-explicit-any */

declare module 'axios' {
  interface AxiosInstance extends Axios {
    get<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
    post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
    put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
    patch<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
    delete<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
  }
}
