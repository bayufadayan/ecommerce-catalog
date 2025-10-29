import api from './client'

// Create cart (dummy). Payload contoh:
// { userId: 1, date: '2024-10-29', products: [{ productId: 1, quantity: 2 }] }
export const createCart = (payload) =>
    api.post('/carts', payload).then(r => r.data)
