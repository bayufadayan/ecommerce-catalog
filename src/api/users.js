import api from './client'

// Ambil user by id (dummy data)
export const getUser = (id) =>
    api.get(`/users/${id}`).then(r => r.data)
