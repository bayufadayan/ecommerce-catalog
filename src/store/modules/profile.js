// src/store/modules/products.js
import {
    listProducts,
    listCategories,
    listByCategory
} from '@/api/products'

const FILTERS_KEY = 'fakestore_products_filters_v1'

const state = () => ({
    items: [],
    categories: ['all'],
    loading: false,
    error: '',
    // filters persist
    filters: loadFilters() // { query:'', category:'all', sortBy:'relevance'|'price-asc'|'price-desc'|'rating-desc' }
})

const getters = {
    categoriesWithAll: (s) => Array.from(new Set(['all', ...s.categories])),
    // hasil akhir di client (karena fakestore gak support query server)
    filteredSorted: (s) => {
        let arr = [...s.items]

        // filter by category (server fetch jika bukan "all", tapi jaga-jaga kalau items full cache dipakai)
        if (s.filters.category && s.filters.category !== 'all') {
            arr = arr.filter(p => String(p.category) === String(s.filters.category))
        }

        // query (client-side contains)
        const q = (s.filters.query || '').trim().toLowerCase()
        if (q) {
            arr = arr.filter(p => {
                const hay = [p.title, p.description, p.category].join(' ').toLowerCase()
                return hay.includes(q)
            })
        }

        // sorting
        switch (s.filters.sortBy) {
            case 'price-asc': arr.sort((a, b) => num(a.price) - num(b.price)); break
            case 'price-desc': arr.sort((a, b) => num(b.price) - num(a.price)); break
            case 'rating-desc': arr.sort((a, b) => num(b.rating?.rate) - num(a.rating?.rate)); break
            default: /* relevance (no-op) */ break
        }

        return arr
    }
}

const mutations = {
    setLoading(s, v) { s.loading = !!v },
    setError(s, msg) { s.error = msg || '' },
    setItems(s, items) { s.items = Array.isArray(items) ? items : [] },
    setCategories(s, cats) {
        const base = Array.isArray(cats) ? cats : []
        s.categories = ['all', ...base.filter(Boolean)]
    },
    setQuery(s, v) {
        s.filters.query = String(v || '')
        saveFilters(s.filters)
    },
    setCategory(s, v) {
        s.filters.category = v || 'all'
        saveFilters(s.filters)
    },
    setSortBy(s, v) {
        s.filters.sortBy = v || 'relevance'
        saveFilters(s.filters)
    },
    restoreFilters(s) {
        const f = loadFilters()
        s.filters = { ...s.filters, ...f }
    }
}

const actions = {
    // eslint-disable-next-line no-unused-vars
    async bootstrap({ dispatch, commit }) {
        // muat kategori di awal (untuk chips)
        try {
            commit('setLoading', true)
            commit('setError', '')
            const cats = await listCategories()
            commit('setCategories', cats || [])
        } catch (e) {
            commit('setError', e?.message || 'Gagal memuat kategori.')
        } finally {
            commit('setLoading', false)
        }
    },

    async fetchProducts({ state, commit }) {
        // Ambil produk sesuai kategori:
        // - "all" → /products (full)
        // - spesifik → /products/category/:name (biar efisien)
        try {
            commit('setLoading', true)
            commit('setError', '')
            let data = []
            if (state.filters.category && state.filters.category !== 'all') {
                data = await listByCategory(state.filters.category, {})
            } else {
                data = await listProducts({})
            }
            commit('setItems', data || [])
        } catch (e) {
            const msg =
                e?.message?.includes('HTTP 404') ? 'Produk tidak ditemukan (404).' :
                    /network/i.test(e?.message || '') ? 'Gagal terhubung ke server.' :
                        (e?.message || 'Gagal memuat produk.')
            commit('setError', msg)
            commit('setItems', [])
        } finally {
            commit('setLoading', false)
        }
    },

    setQuery({ commit }, v) { commit('setQuery', v) },
    setCategory({ commit, dispatch }, v) {
        commit('setCategory', v)
        // fetch ulang dari server bila kategori berubah
        dispatch('fetchProducts')
    },
    setSortBy({ commit }, v) { commit('setSortBy', v) }
}

// helpers
function num(v) { return Number(v) || 0 }

function loadFilters() {
    try {
        const raw = localStorage.getItem(FILTERS_KEY)
        const def = { query: '', category: 'all', sortBy: 'relevance' }
        if (!raw) return def
        const f = JSON.parse(raw)
        return { ...def, ...f }
    } catch {
        return { query: '', category: 'all', sortBy: 'relevance' }
    }
}

function saveFilters(f) {
    try { localStorage.setItem(FILTERS_KEY, JSON.stringify(f || {})) } catch { /* empty */ }
}

export default { namespaced: true, state, getters, mutations, actions }
