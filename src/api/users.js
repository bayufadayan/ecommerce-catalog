// src/api/users.js
import api from './client'

export const getUserById = (id) =>
    api.get(`/users/${id}`).then(r => r.data)