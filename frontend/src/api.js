// writing interceptor to automatically add the correct headers

import axios from 'axios';
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL // import anything specified inside an environment variable file
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}` // this is how you pass JWT access token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api