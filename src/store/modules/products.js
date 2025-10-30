import { listProducts, listCategories, listByCategory } from '@/api/products';
import { toNumber } from '@/helpers/numberHelper';
import { loadFilters, saveFilters } from '@/helpers/filterHelper';
import { getErrorMessage } from '@/helpers/errorHelper';


const state = () => ({
    items: [],
    categories: ['all'],
    loading: false,
    errorMessage: '',
    filters: loadFilters()
})

const getters = {
    categoriesWithAll: state => ['all', ...new Set(state.categories)],

    filteredSorted: state => {
        let products = [...state.items]

        // filter by category
        if (state.filters.category !== 'all') {
            products = products.filter(
                product => String(product.category) === String(state.filters.category)
            )
        }

        // filter by search query
        const query = (state.filters.query || '').trim().toLowerCase()
        if (query) {
            products = products.filter(product => {
                const text = [product.title, product.description, product.category]
                    .join(' ')
                    .toLowerCase()
                return text.includes(query)
            })
        }

        const sortBy = state.filters.sortBy
        const sorters = {
            'price-asc': (a, b) => toNumber(a.price) - toNumber(b.price),
            'price-desc': (a, b) => toNumber(b.price) - toNumber(a.price),
            'rating-desc': (a, b) => toNumber(b.rating?.rate) - toNumber(a.rating?.rate)
        }

        if (sorters[sortBy]) products.sort(sorters[sortBy])

        return products
    }
}

const mutations = {
    setLoading(state, isLoading) {
        state.loading = !!isLoading
    },

    setError(state, message = '') {
        state.errorMessage = message
    },

    setItems(state, items) {
        state.items = Array.isArray(items) ? items : []
    },

    setCategories(state, categories) {
        const validCategories = Array.isArray(categories) ? categories.filter(Boolean) : []
        state.categories = ['all', ...validCategories]
    },

    setQuery(state, query) {
        state.filters.query = String(query || '')
        saveFilters(state.filters)
    },

    setCategory(state, category) {
        state.filters.category = category || 'all'
        saveFilters(state.filters)
    },

    setSortBy(state, sortBy) {
        state.filters.sortBy = sortBy || 'relevance'
        saveFilters(state.filters)
    },

    restoreFilters(state) {
        const restoredFilters = loadFilters()
        state.filters = { ...state.filters, ...restoredFilters }
    }
}

const actions = {
    async bootstrap({ commit }) {
        try {
            commit('setLoading', true)
            commit('setError', '')
            const categories = await listCategories()
            commit('setCategories', categories || [])
        } catch (error) {
            commit('setError', error?.message || 'Gagal memuat kategori.')
        } finally {
            commit('setLoading', false)
        }
    },

    async fetchProducts({ state, commit }) {
        if (state.items.length && state.filters.category !== 'all') return

        try {
            commit('setLoading', true)
            commit('setError', '')

            const { category } = state.filters
            const products =
                category !== 'all'
                    ? await listByCategory(category)
                    : await listProducts()

            commit('setItems', products || [])
        } catch (error) {
            const message = getErrorMessage(error)
            commit('setError', message)
            commit('setItems', [])
        } finally {
            commit('setLoading', false)
        }
    },

    setQuery({ commit }, query) {
        commit('setQuery', query)
    },

    setCategory({ commit, dispatch }, category) {
        commit('setCategory', category)
        dispatch('fetchProducts')
    },

    setSortBy({ commit }, sortBy) {
        commit('setSortBy', sortBy)
    }
}

export default { namespaced: true, state, getters, mutations, actions }
