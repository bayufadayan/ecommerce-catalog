const state = () => ({
    token: null,                 // string | null
    user: null,                  // object | null (dipakai Step 7 / Profile)
    status: 'idle',              // 'idle' | 'loading' | 'error' | 'success'
    errorMessage: ''             // pesan error untuk ditampilkan di UI
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
    /**
     * Step 2 (scaffold):
     * - Siapkan alur status untuk login (tanpa API).
     * - Di Step 3 kita ganti "TODO" dengan call API + error handling.
     */
    async login({ commit }, { username, password }) {
        // validasi minimum (opsional, biar alur status terasa dari sekarang)
        if (!username || !password) {
            commit('setStatus', 'error')
            commit('setErrorMessage', 'Username dan password wajib diisi.')
            return
        }

        commit('setStatus', 'loading')
        commit('setErrorMessage', '')

        // TODO (Step 3): panggil API login, tangani error/sukses
        // sementara: simulasi hasil sukses biar UI bisa dicoba jika perlu
        // HAPUS simulasi ini di Step 3
        try {
            // simulasi delay
            await new Promise((r) => setTimeout(r, 350))

            // simulasi token sukses (dummy)
            const dummyToken = 'DUMMY_TOKEN_REPLACE_IN_STEP_3'
            commit('setToken', dummyToken)
            commit('setStatus', 'success')
        } catch (e) {
            commit('setStatus', 'error')
            commit('setErrorMessage', 'Gagal login. (simulasi)')
        }
    },

    logout({ commit }) {
        commit('clearAuth')
        // NOTE: persist (localStorage) akan ditangani di Step 4
    }
}

export default { namespaced: true, state, getters, actions, mutations }