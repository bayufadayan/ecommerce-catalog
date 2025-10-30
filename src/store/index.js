// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

// modules
import auth from './modules/auth'
import products from './modules/products'   // ← PASTIKAN path & nama ini benar
import cart from './modules/cart'
import profile from './modules/profile'

// keys
import { FK_TOKEN_KEY } from './auth.keys'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        products,   // ← REGISTER di sini dengan key 'products' (namespaced)
        cart,
        profile
    }
})

/* === AUTH rehydrate === */
try {
    const saved = localStorage.getItem(FK_TOKEN_KEY)
    if (saved) {
        store.commit('auth/setToken', saved)
        store.commit('auth/setStatus', 'success')
    }
} catch { /* empty */ }

/* === CART re/persist === */
const CART_KEY = 'fakestore_cart'
let __cartRehydrated = false

function saveCart(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items || [])) } catch { /* empty */ }
}

function loadCartOnce() {
    if (__cartRehydrated) return
    __cartRehydrated = true
    try {
        const raw = localStorage.getItem(CART_KEY)
        if (!raw) return
        const items = JSON.parse(raw)
        if (Array.isArray(items)) items.forEach(it => store.commit('cart/addItem', it))
    } catch { /* empty */ }
}
loadCartOnce()

store.subscribe((mutation, state) => {
    // auth persist
    if (mutation.type === 'auth/setToken') {
        try { localStorage.setItem(FK_TOKEN_KEY, state.auth.token || '') } catch { /* empty */ }
    }

    // auth clear
    if (mutation.type === 'auth/clearAuth') {
        try { localStorage.removeItem(FK_TOKEN_KEY) } catch { /* empty */ }
        store.commit('profile/clear')
        try { localStorage.removeItem('fakestore_profile_overrides') } catch { /* empty */ }
        // Jika ingin kosongkan cart saat logout, uncomment:
        // store.commit('cart/clear'); try { localStorage.removeItem(CART_KEY) } catch {}
    }

    // cart persist
    if (mutation.type.startsWith('cart/')) {
        saveCart(state.cart.items)
    }
})

export default store
