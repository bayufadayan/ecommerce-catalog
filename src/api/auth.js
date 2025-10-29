import api from './client'

// Login dummy → { token }
export const login = ({ username, password }) =>
    api.post('/auth/login', { username, password }).then(r => r.data)
