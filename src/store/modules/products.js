import { listProducts, listByCategory } from '@/api/products'
import { toNumber } from '@/helpers/numberHelper'
import { loadFilters, saveFilters } from '@/helpers/filterHelper'
import { getErrorMessage } from '@/helpers/errorHelper'

import {
    allowedCategoriesList,
    isAllowedCategory,
    normalizeCategory
} from '@/constants/allowed-categories'

const state = () => ({
    items: [],
    categories: allowedCategoriesList(),
    loading: false,
    errorMessage: '',
    filters: loadFilters()
})

const getters = {
    categoriesWithAll: (state) => [...state.categories],
    filteredSorted: (state) => {
        let products = [...state.items]

        const activeCategory = normalizeCategory(state.filters.category)
        if (activeCategory !== 'all') {
            products = products.filter(
                (product) => normalizeCategory(product.category) === activeCategory
            )
        }

        const query = (state.filters.query || '').trim().toLowerCase()
        if (query) {
            products = products.filter((product) => {
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

    setCategories(state, categoriesFromAllowedUtils) {
        const valid = Array.isArray(categoriesFromAllowedUtils)
            ? categoriesFromAllowedUtils.filter(Boolean)
            : ['all']
        state.categories = valid
    },

    setQuery(state, query) {
        state.filters.query = String(query || '')
        saveFilters(state.filters)
    },

    setCategory(state, category) {
        const cat = String(category || 'all')
        state.filters.category = isAllowedCategory(cat) ? cat : 'all'
        saveFilters(state.filters)
    },

    setSortBy(state, sortBy) {
        state.filters.sortBy = sortBy || 'relevance'
        saveFilters(state.filters)
    },

    restoreFilters(state) {
        const restored = loadFilters() || {}
        const restoredCategory = restored.category
        state.filters = { ...state.filters, ...restored }

        if (!isAllowedCategory(restoredCategory) && restoredCategory !== 'all') {
            state.filters.category = 'all'
            saveFilters(state.filters)
        }
    }
}

const actions = {
    async bootstrap({ commit }) {
        try {
            commit('setLoading', true)
            commit('setError', '')

            const cats = allowedCategoriesList()
            commit('setCategories', cats)

            commit('restoreFilters')
        } catch (error) {
            commit('setError', error?.message || 'Gagal inisialisasi kategori.')
        } finally {
            commit('setLoading', false)
        }
    },

    async fetchProducts({ state, commit }) {
        if (state.items.length && state.filters.category !== 'all') return

        try {
            commit('setLoading', true)
            commit('setError', '')

            const activeCategory = normalizeCategory(state.filters.category)
            
            if (activeCategory !== 'all' && !isAllowedCategory(activeCategory)) {
                commit('setItems', [])
                return
            }

            let products = []
            if (activeCategory === 'all') {
                const all = await listProducts()
                products = Array.isArray(all)
                    ? all.filter((p) => isAllowedCategory(p?.category))
                    : []
            } else {
                const byCat = await listByCategory(activeCategory)
                products = Array.isArray(byCat) ? byCat : []
            }

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
