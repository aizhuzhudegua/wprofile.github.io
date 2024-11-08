import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api', // 设置你的 API 基础 URL
    timeout: 10000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json',
    },
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么，比如添加 token
        return config;
    },
    error => {
        // 处理请求错误
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response.data;
    },
    error => {
        // 处理响应错误
        return Promise.reject(error);
    }
);

export default axiosInstance;
