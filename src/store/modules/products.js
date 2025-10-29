const state = () => ({
    list: [],
    categories: [],
    selectedCategory: 'all',
    search: '',
    sort: 'price-asc', // 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc'
    loading: false,
    error: ''
})

const getters = {
    // filteredProducts: s => s.list
}

const actions = {
    // boot({ commit }) {},
    // changeCategory({ commit }, name) {}
}

const mutations = {
    // setProducts(state, list) {},
    // setCategories(state, cats) {},
    // setSelectedCategory(state, name) {},
    // setSearch(state, q) {},
    // setSort(state, key) {},
    // setLoading(state, v) {},
    // setError(state, msg) {}
}

export default { namespaced: true, state, getters, actions, mutations }
