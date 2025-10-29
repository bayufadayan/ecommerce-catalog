const state = () => ({
    token: null,
    user: null,
    status: 'idle' // 'idle' | 'loading' | 'error' | 'success'
})

const getters = {
    isAuthenticated: s => !!s.token
}

const actions = {
    // login({ commit }, { username, password }) {},
    // logout({ commit }) {}
}

const mutations = {
    // setToken(state, token) {},
    // setUser(state, user) {},
    // setStatus(state, status) {},
    // clearAuth(state) {}
}

export default { namespaced: true, state, getters, actions, mutations }
