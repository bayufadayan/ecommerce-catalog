import { getUserById } from '@/api/users';
import { getUserIdFromToken } from '@/utils/jwt';

const state = () => ({
    data: null,
    loading: false,
    error: '',
});

const getters = {
    isLoaded: (state) => !!state.data && !state.loading && !state.error,

    fullName: (state) => {
        const first = state.data?.name?.firstname || '';
        const last = state.data?.name?.lastname || '';
        return `${capitalize(first)} ${capitalize(last)}`.trim();
    },

    email: (state) => state.data?.email || '',
    username: (state) => state.data?.username || '',
    phone: (state) => state.data?.phone || '',

    addressLine: (state) => {
        const address = state.data?.address;
        if (!address) return '';
        const parts = [address.street, address.city, address.zipcode].filter(Boolean);
        return parts.join(', ');
    },

    geo: (state) => state.data?.address?.geolocation || null,
};

const mutations = {
    setLoading(state, value) {
        state.loading = !!value;
    },
    setError(state, message) {
        state.error = message || '';
    },
    setData(state, data) {
        state.data = data || null;
    },
    clear(state) {
        state.data = null;
        state.error = '';
        state.loading = false;
    },
};

const actions = {
    /**
     * fetchMe:
     * - Jika userId tidak diberikan, coba ambil dari token auth di store
     * - Ambil /users/:id dan simpan di state
     */
    async fetchMe({ commit, rootState }, userId) {
        commit('setLoading', true);
        commit('setError', '');

        try {
            let id = userId;
            if (!id) {
                const token = rootState?.auth?.token;
                id = getUserIdFromToken(token);
            }

            if (!id) throw new Error('User ID tidak ditemukan dari token.');

            const data = await getUserById(id);
            commit('setData', data || null);
        } catch (err) {
            const raw = err?.message || '';
            let msg = 'Gagal memuat profil.';

            if (raw.includes('HTTP 404')) {
                msg = 'Profil tidak ditemukan (404).';
            } else if (raw.toLowerCase().includes('network')) {
                msg = 'Gagal terhubung ke server.';
            }

            commit('setError', msg);
            commit('setData', null);
        } finally {
            commit('setLoading', false);
        }
    },

    clear({ commit }) {
        commit('clear');
    },
};

function capitalize(str) {
    if (!str) return '';
    return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
