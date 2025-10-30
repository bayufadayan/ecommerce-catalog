// src/store/modules/profile.js
import { getUserById } from '@/api/users'
import { getUserIdFromToken } from '@/utils/jwt'

const state = () => ({
    data: null,        // objek user FakeStore
    loading: false,
    error: ''
})

const getters = {
    isLoaded: (s) => !!s.data && !s.loading && !s.error,
    fullName: (s) => {
        const f = s.data?.name?.firstname || ''
        const l = s.data?.name?.lastname || ''
        return `${cap(f)} ${cap(l)}`.trim()
    },
    email: (s) => s.data?.email || '',
    username: (s) => s.data?.username || '',
    phone: (s) => s.data?.phone || '',
    addressLine: (s) => {
        const a = s.data?.address
        if (!a) return ''
        const segs = [a.street, a.city, a.zipcode].filter(Boolean)
        return segs.join(', ')
    },
    geo: (s) => s.data?.address?.geolocation || null
}

const mutations = {
    setLoading(s, v) { s.loading = !!v },
    setError(s, msg) { s.error = msg || '' },
    setData(s, data) { s.data = data || null },
    clear(s) { s.data = null; s.error = ''; s.loading = false }
}

const actions = {
    /**
     * fetchMe:
     * - Jika userId tidak diberikan, coba ambil dari token auth di store
     * - Ambil /users/:id dan simpan di state
     */
    async fetchMe({ commit, rootState }, userId) {
        commit('setLoading', true)
        commit('setError', '')
        try {
            let id = userId
            if (!id) {
                const token = rootState?.auth?.token
                id = getUserIdFromToken(token)
            }
            if (!id) {
                throw new Error('User ID tidak ditemukan dari token.')
            }
            const data = await getUserById(id)
            commit('setData', data || null)
        } catch (e) {
            const msg =
                e?.message?.includes('HTTP 404') ? 'Profil tidak ditemukan (404).' :
                    e?.message?.toLowerCase?.().includes('network') ? 'Gagal terhubung ke server.' :
                        (e?.message || 'Gagal memuat profil.')
            commit('setError', msg)
            commit('setData', null)
        } finally {
            commit('setLoading', false)
        }
    },

    clear({ commit }) { commit('clear') }
}

// helper kecil
function cap(s) {
    if (!s) return ''
    return String(s).charAt(0).toUpperCase() + String(s).slice(1)
}

export default { namespaced: true, state, getters, mutations, actions }