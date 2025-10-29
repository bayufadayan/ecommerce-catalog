import { login as apiLogin } from '../../api/auth';
import { FK_TOKEN_KEY } from '../auth.keys';

const state = () => ({
    token: null,
    user: null,
    status: 'idle',
    errorMessage: ''
})

const getters = {
    isAuthenticated: (s) => !!s.token
}

const mutations = {
    setToken(state, token) {
        state.token = token
    },
    setUser(state, user) {
        state.user = user
    },
    setStatus(state, status) {
        state.status = status
    },
    setErrorMessage(state, msg) {
        state.errorMessage = msg || ''
    },
    clearAuth(state) {
        state.token = null
        state.user = null
        state.status = 'idle'
        state.errorMessage = ''
    }
}

const actions = {
    async login({ commit }, { username, password }) {
        if (!username || !password) {
            commit('setStatus', 'error')
            commit('setErrorMessage', 'Username dan password wajib diisi.')
            return
        }

        commit('setStatus', 'loading')
        commit('setErrorMessage', '')

        try {
            const { token } = await apiLogin({ username, password })
            if (!token) throw new Error('Token tidak ditemukan dalam respons.')

            commit('setToken', token)
            commit('setStatus', 'success')

            localStorage.setItem(FK_TOKEN_KEY, token)

            return token
        } catch (err) {
            const msg =
                err?.message === 'Network Error'
                    ? 'Gagal terhubung ke server. Coba lagi.'
                    : (err?.message || 'Username atau password tidak sesuai.')
            commit('setStatus', 'error')
            commit('setErrorMessage', msg)
        }
    },

    logout({ commit }) {
        commit('clearAuth')
        // CLEAR PERSIST
        localStorage.removeItem(FK_TOKEN_KEY)
    }
}

export default { namespaced: true, state, getters, actions, mutations }
