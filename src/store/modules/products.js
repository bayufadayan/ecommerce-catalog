// src/store/modules/products.js
import { listProducts, listByCategory } from '@/api/products'
import { toNumber } from '@/helpers/numberHelper'
import { loadFilters, saveFilters } from '@/helpers/filterHelper'
import { getErrorMessage } from '@/helpers/errorHelper'

// === NEW: Allowed categories utils ===
import {
    allowedCategoriesList,
    isAllowedCategory,
    normalizeCategory
} from '@/constants/allowed-categories'

// --- State ---
const state = () => ({
    items: [],
    // kita simpan langsung ['all', "men's clothing", "women's clothing"]
    categories: allowedCategoriesList(),
    loading: false,
    errorMessage: '',
    filters: loadFilters()
})

// --- Getters ---
const getters = {
    // kategori untuk UI (sudah include 'all')
    categoriesWithAll: (state) => [...state.categories],

    // hasil list yang sudah difilter & disortir CLient-side
    filteredSorted: (state) => {
        let products = [...state.items]

        // filter by category (client-side cache)
        const activeCategory = normalizeCategory(state.filters.category)
        if (activeCategory !== 'all') {
            products = products.filter(
                (product) => normalizeCategory(product.category) === activeCategory
            )
        }

        // filter by search query
        const query = (state.filters.query || '').trim().toLowerCase()
        if (query) {
            products = products.filter((product) => {
                const text = [product.title, product.description, product.category]
                    .join(' ')
                    .toLowerCase()
                return text.includes(query)
            })
        }

        // sort
        const sortBy = state.filters.sortBy
        const sorters = {
            'price-asc': (a, b) => toNumber(a.price) - toNumber(b.price),
            'price-desc': (a, b) => toNumber(b.price) - toNumber(a.price),
            'rating-desc': (a, b) =>
                toNumber(b.rating?.rate) - toNumber(a.rating?.rate)
        }
        if (sorters[sortBy]) products.sort(sorters[sortBy])

        return products
    }
}

// --- Mutations ---
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

    // kita set langsung semua kategori yang diizinkan (tidak tergantung API)
    setCategories(state, categoriesFromAllowedUtils) {
        // Harusnya hasil dari allowedCategoriesList(): ['all', ..., ...]
        const valid = Array.isArray(categoriesFromAllowedUtils)
            ? categoriesFromAllowedUtils.filter(Boolean)
            : ['all']
        state.categories = valid
    },

    // --- Filters & persistence ---
    setQuery(state, query) {
        state.filters.query = String(query || '')
        saveFilters(state.filters)
    },

    setCategory(state, category) {
        const cat = String(category || 'all')
        // normalize dan validasi
        state.filters.category = isAllowedCategory(cat) ? cat : 'all'
        saveFilters(state.filters)
    },

    setSortBy(state, sortBy) {
        state.filters.sortBy = sortBy || 'relevance'
        saveFilters(state.filters)
    },

    // Saat restore, jaga validitas kategori
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

// --- Actions ---
const actions = {
    /**
     * Bootstrap kategori UI (pakai allowed list)
     * dan normalisasi filter tersimpan.
     */
    async bootstrap({ commit }) {
        try {
            commit('setLoading', true)
            commit('setError', '')

            // Kita TIDAK lagi bergantung pada listCategories() dari API
            // agar stabil sesuai kebutuhan project akhir.
            const cats = allowedCategoriesList() // ['all', "men's clothing", "women's clothing"]
            commit('setCategories', cats)

            // Normalisasi filter dari localStorage
            commit('restoreFilters')
        } catch (error) {
            // Bootstrap kategori UI tidak kritikal; tetap aman
            commit('setError', error?.message || 'Gagal inisialisasi kategori.')
        } finally {
            commit('setLoading', false)
        }
    },

    /**
     * Fetch items:
     * - Jika 'all': ambil semua produk API lalu filter client-side ke kategori yang diizinkan.
     * - Jika kategori spesifik:
     *     - Jika TIDAK diizinkan: kosongkan items (dan beri pesan singkat).
     *     - Jika diizinkan: ambil via listByCategory(category).
     */
    async fetchProducts({ state, commit }) {
        // Kalau sudah ada cache dan filter bukan 'all', biarkan filter client-side bekerja
        // (tetap fetch ulang agar data fresh? → di project ini cukup pakai cache untuk quick UX)
        if (state.items.length && state.filters.category !== 'all') return

        try {
            commit('setLoading', true)
            commit('setError', '')

            const activeCategory = normalizeCategory(state.filters.category)

            // Case: kategori spesifik tidak diizinkan
            if (activeCategory !== 'all' && !isAllowedCategory(activeCategory)) {
                commit('setItems', [])
                // opsional: beri pesan ringan (bukan error network)
                // commit('setError', 'Kategori tidak tersedia.')
                return
            }

            let products = []
            if (activeCategory === 'all') {
                // Ambil semua → filter client-side ke allowed
                const all = await listProducts()
                products = Array.isArray(all)
                    ? all.filter((p) => isAllowedCategory(p?.category))
                    : []
            } else {
                // Ambil by category (sudah diizinkan)
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

    // --- Filter setters (dispatch dari UI) ---
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
