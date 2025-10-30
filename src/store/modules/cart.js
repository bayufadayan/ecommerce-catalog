const state = () => ({
    items: [] // { id, title, price, image, qty }
});

const getters = {
    uniqueCount: (state) => state.items.length,
    count: (state) => state.items.reduce((sum, item) => sum + toInt(item.qty), 0),
    subtotal: (state) =>
        state.items.reduce((sum, item) => sum + toNum(item.price) * toInt(item.qty), 0)
};

const mutations = {
    addItem(state, payload) {
        if (!payload?.id) return;
        const existing = state.items.find((item) => item.id === payload.id);
        const qtyToAdd = toInt(payload.qty) || 1;

        if (existing) {
            existing.qty = Math.max(1, toInt(existing.qty) + qtyToAdd);
        } else {
            state.items.push({
                id: payload.id,
                title: payload.title || '',
                price: toNum(payload.price),
                image: payload.image || '',
                qty: Math.max(1, qtyToAdd)
            });
        }
    },

    setQty(state, { id, qty }) {
        const item = state.items.find((x) => x.id === id);
        if (item) item.qty = Math.max(1, toInt(qty));
    },

    removeItem(state, id) {
        state.items = state.items.filter((x) => x.id !== id);
    },

    clear(state) {
        state.items = [];
    }
};

const actions = {
    addItem({ commit }, payload) {
        commit('addItem', payload);
    },
    setQty({ commit }, payload) {
        commit('setQty', payload);
    },
    removeItem({ commit }, id) {
        commit('removeItem', id);
    },
    clear({ commit }) {
        commit('clear');
    }
};

function toInt(value) {
    return Math.max(0, parseInt(value, 10) || 0);
}

function toNum(value) {
    return Number(value) || 0;
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};