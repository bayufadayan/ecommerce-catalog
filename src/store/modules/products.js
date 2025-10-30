import { DEFAULT_FILTERS } from '../../constants/products-filters';
import { listProducts, listCategories, listByCategory } from '../../api/products';

const state = () => ({
    items: [],
    categories: [],
    loading: false,
    error: '',
    filters: { ...DEFAULT_FILTERS },
    lastLoadedAt: 0
})
const getters = {
    filteredProducts: (s) => s.items, // logic search/sort nanti di Step 6
    categoriesWithAll: (s) => ['all', ...s.categories],
    hasError: (s) => !!s.error,
    isLoading: (s) => !!s.loading
}

const mutations = {
    setItems(state, items) { state.items = Array.isArray(items) ? items : [] },
    setCategories(state, categories) { state.categories = Array.isArray(categories) ? categories : [] },

    setLoading(state, val) { state.loading = !!val },
    setError(state, msg) { state.error = msg || '' },
    setLastLoadedAt(state, ts) { state.lastLoadedAt = ts || Date.now() },

    setCategory(state, category) { state.filters.category = category || 'all' },
    setQuery(state, query) { state.filters.query = (query || '').trim() },
    setSortBy(state, sortBy) { state.filters.sortBy = sortBy || 'relevance' },

    resetFilters(state) { state.filters = { ...DEFAULT_FILTERS } },
    clear(state) {
        state.items = []
        state.error = ''
        state.loading = false
        state.lastLoadedAt = 0
    }
}

const actions = {
    /**
     * boot(): Ambil kategori + produk awal paralel.
     * - Tampilkan loading
     * - Simpan categories & items
     */
    async boot({ commit, state }) {
        // Kalau sudah pernah load & masih fresh, boleh di-skip (opsional)
        if (state.items.length && state.categories.length) return

        commit('setLoading', true)
        commit('setError', '')
        try {
            const [categories, items] = await Promise.all([
                listCategories(),
                listProducts() // bisa kasih { limit, sort } kalau mau
            ])
            commit('setCategories', categories)
            commit('setItems', items)
            commit('setLastLoadedAt', Date.now())
        } catch (e) {
            commit('setError', e?.message || 'Gagal memuat katalog.')
            commit('setItems', [])
        } finally {
            commit('setLoading', false)
        }
    },

    /**
     * fetchAll(): Ambil semua produk (opsional limit/sort dari API)
     */
    async fetchAll({ commit }, { limit, sort } = {}) {
        commit('setLoading', true)
        commit('setError', '')
        try {
            const items = await listProducts({ limit, sort })
            commit('setItems', items)
            commit('setLastLoadedAt', Date.now())
        } catch (e) {
            commit('setError', e?.message || 'Gagal memuat produk.')
            commit('setItems', [])
        } finally {
            commit('setLoading', false)
        }
    },

    /**
     * fetchByCategory(name): Ambil produk untuk kategori tertentu.
     * - Jika 'all', delegasikan ke fetchAll.
     */
    async fetchByCategory({ dispatch, commit }, name, { limit, sort } = {}) {
        if (!name || name === 'all') {
            return dispatch('fetchAll', { limit, sort })
        }
        commit('setLoading', true)
        commit('setError', '')
        try {
            const items = await listByCategory(name, { limit, sort })
            commit('setItems', items)
            commit('setLastLoadedAt', Date.now())
        } catch (e) {
            commit('setError', e?.message || 'Gagal memuat produk per kategori.')
            commit('setItems', [])
        } finally {
            commit('setLoading', false)
        }
    },

    /**
     * (Opsional) setFilters: helper untuk update beberapa filter sekaligus
     */
    setFilters({ commit }, { category, query, sortBy } = {}) {
        if (typeof category !== 'undefined') commit('setCategory', category)
        if (typeof query !== 'undefined') commit('setQuery', query)
        if (typeof sortBy !== 'undefined') commit('setSortBy', sortBy)
    }
}

export default { namespaced: true, state, getters, actions, mutations }
