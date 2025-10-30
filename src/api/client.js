import axios from 'axios'
import store from '../store'

// Base URL FakeStore
const api = axios.create({
    baseURL: 'https://fakestoreapi.com',
    timeout: 15000
})

/**
 * REQUEST INTERCEPTOR
 * - Sisipkan Authorization Bearer jika token tersedia
 */
api.interceptors.request.use(
    (config) => {
        const token = store?.state?.auth?.token
        if (token) {
            config.headers = config.headers || {}
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

/**
 * RESPONSE INTERCEPTOR
 * - Normalisasi pesan error agar konsisten
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Axios error anatomy: error.response?.status, error.message, dll.
        const status = error?.response?.status
        let msg = error?.message || 'Request error'

        if (status === 401) msg = 'HTTP 401'
        else if (status === 403) msg = 'HTTP 403'
        else if (status === 404) msg = 'HTTP 404'
        else if (status >= 500) msg = 'Server error'
        else if (msg && /network/i.test(msg)) msg = 'Network error'

        // Lempar sebagai Error biasa dengan message singkat
        const e = new Error(msg)
        e.status = status
        e.original = error
        return Promise.reject(e)
    }
)

export default api
