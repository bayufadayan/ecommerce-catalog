import api from './client';

export const getUserById = async (id) => {
    if (!id) return null;
    const { data } = await api.get(`/users/${id}`);
    return data || null;
};
