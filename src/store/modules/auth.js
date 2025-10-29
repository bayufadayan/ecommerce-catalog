const state = () => ({
    token: null,
    user: null,
    status: 'idle',
    errorMessage: ''
})

const getters = {
    isAuthenticated: s => !!s.token
}

const actions = {
    // async login({ commit }, { username, password }) {},
    // logout({ commit }) {}
}

const mutations = {
    // setToken(state, token) {},
    // setUser(state, user) {},
    // setStatus(state, status) {},
    // setErrorMessage(state, msg) {},
    // clearAuth(state) {}
}

export default { namespaced: true, state, getters, actions, mutations }
