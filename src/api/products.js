import api from './client';

// List semua produk (opsional: limit, sort='asc'|'desc')
export const listProducts = ({ limit, sort } = {}) =>
    api.get('/products', { params: { limit, sort } }).then(r => r.data)

// Detail produk by id
export const getProduct = (id) =>
    api.get(`/products/${id}`).then(r => r.data)

// List kategori
export const listCategories = () =>
    api.get('/products/categories').then(r => r.data)

// Produk per kategori
export const listByCategory = (name, { limit, sort } = {}) =>
    api.get(`/products/category/${encodeURIComponent(name)}`, { params: { limit, sort } }).then(r => r.data)
