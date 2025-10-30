import api from './client';

export const listProducts = (params = {}) =>
    api.get('/products', { params }).then(res => res.data);

export const getProduct = (id) =>
    api.get(`/products/${id}`).then(res => res.data);

export const listCategories = () =>
    api.get('/products/categories').then(res => res.data);

export const listByCategory = (name, params = {}) =>
    api.get(`/products/category/${encodeURIComponent(name)}`, { params }).then(res => res.data);
