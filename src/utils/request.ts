import axios from 'axios'
import type { AxiosInstance, AxiosResponse,AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
const request = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }

})
request.interceptors.request.use(
    (config) => {
    const token = localStorage.getItem('token') || '';
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
    },
    (error) => {
    return Promise.reject(error);
    }
);
//响应拦截器
request.interceptors.response.use(
  //响应拦截器成功的回调，一般会进行简化数据
  (response) => {
      return response.data;
  },
  // 失败的回调，处理 404 等问题 
  (error) => {
      //处理 http 网络错误
      let status = error.response.status;
      switch (status) {
          case 404:
              ElMessage({
                  type: 'error',
                  message: error.message
              });
              break;
          case 500 | 501 | 502 | 503 | 504 | 505:
              ElMessage({
                  type: 'error',
                  message: '服务器挂了'
              });
              break;
          case 401:
              ElMessage({
                  type: 'error',
                  message: '请求参数有误'
              });
              break;
      }
      return Promise.reject(new Error(error.message))
  }

)
export default function <T = any>(config: AxiosRequestConfig): Promise<T> {
    return request(config)
  }
// export default request

