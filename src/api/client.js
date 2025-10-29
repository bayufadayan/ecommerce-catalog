import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    timeout: 15000
})

// Interceptor respons (rapikan error)
api.interceptors.response.use(
    (res) => res,
    (err) => {
        const status = err?.response?.status
        const message = status ? `HTTP ${status}` : 'Network error'
        return Promise.reject(new Error(message))
    }
)

export default api
