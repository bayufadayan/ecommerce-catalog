import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import products from './modules/products'
import cart from './modules/cart'
import profile from './modules/profile'
import { FK_TOKEN_KEY } from './auth.keys'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: { auth, products, cart, profile }
})

/* ===========================
   AUTH: rehydrate & persist
   =========================== */
try {
    const saved = localStorage.getItem(FK_TOKEN_KEY)
    if (saved) {
        store.commit('auth/setToken', saved)
        store.commit('auth/setStatus', 'success')
    }
} catch (e) {
    // ignore storage errors (Safari private mode, etc)
}

store.subscribe((mutation, state) => {
    if (mutation.type === 'auth/setToken') {
        try { localStorage.setItem(FK_TOKEN_KEY, state.auth.token || '') }
        catch {
            // 
        }
    }
    if (mutation.type === 'auth/clearAuth') {
        try {
            localStorage.removeItem(FK_TOKEN_KEY)

        } catch {
            // 
        }
        store.commit('profile/clear')
    }
})

/* ===========================
   CART: rehydrate & persist
   =========================== */
const CART_KEY = 'fakestore_cart'

function saveCart(items) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(items || []))
    } catch { /* empty */ }
}

function loadCart() {
    try {
        const raw = localStorage.getItem(CART_KEY)
        if (!raw) return
        const items = JSON.parse(raw)
        if (Array.isArray(items)) {
            // gunakan mutation addItem agar struktur tetap konsisten
            items.forEach(it => store.commit('cart/addItem', it))
        }
    } catch {
        // abaikan error parsing
    }
}

// rehydrate cart saat start
loadCart()

// persist setiap ada perubahan di modul cart
store.subscribe((mutation, state) => {
    if (mutation.type.startsWith('cart/')) {
        saveCart(state.cart.items)
    }
})

export default store
