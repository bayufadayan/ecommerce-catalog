import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import products from './modules/products';
import cart from './modules/cart';
import { FK_TOKEN_KEY } from './auth.keys';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: { auth, products, cart }
})

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
        try {
            localStorage.setItem(FK_TOKEN_KEY, state.auth.token || '')

        } catch {
            // 
        }
    }
    if (mutation.type === 'auth/clearAuth') {
        try {
            localStorage.removeItem(FK_TOKEN_KEY)

        } catch {
            // 
        }
    }
})

export default store
