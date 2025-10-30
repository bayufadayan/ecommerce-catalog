import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import products from './modules/products';
import cart from './modules/cart';
import profile from './modules/profile';

import { FK_TOKEN_KEY } from './auth.keys';
import { CART_KEY } from './cart.keys';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        products,
        cart,
        profile
    }
});

/* === AUTH rehydrate === */
try {
    const saved = localStorage.getItem(FK_TOKEN_KEY);
    if (saved) {
        store.commit('auth/setToken', saved);
        store.commit('auth/setStatus', 'success');
    }
} catch {
    // empty
}

/* === CART re/persist === */
let __cartRehydrated = false

function saveCart(items) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(items || []));
    } catch {
        // empty
    }
}

function loadCartOnce() {
    if (__cartRehydrated) return
    __cartRehydrated = true;
    try {
        const raw = localStorage.getItem(CART_KEY);
        if (!raw) return
        const items = JSON.parse(raw)
        if (Array.isArray(items)) items.forEach(it => store.commit('cart/addItem', it))
    } catch {
        // empty
    }
}
loadCartOnce()

store.subscribe((mutation, state) => {
    if (mutation.type === 'auth/setToken') {
        try {
            localStorage.setItem(FK_TOKEN_KEY, state.auth.token || '')
        } catch {
            // empty
        }
    }

    if (mutation.type === 'auth/clearAuth') {
        try {
            localStorage.removeItem(FK_TOKEN_KEY)
        } catch {
            // empty 
        }
        store.commit('profile/clear')
        try {
            localStorage.removeItem('fakestore_profile_overrides')
        } catch {
            // empty
        }
        // cart kosong saat logout
        // store.commit('cart/clear'); try { localStorage.removeItem(CART_KEY) } catch {}
    }

    if (mutation.type.startsWith('cart/')) {
        saveCart(state.cart.items)
    }
})

export default store
