// src/store/modules/cart.js

const state = () => ({
    /**
     * items = array of:
     * { id, title, price, image, qty }
     */
    items: []
})

const getters = {
    // jumlah BARANG unik dalam cart (bukan total qty)
    uniqueCount: (s) => s.items.length,

    // total qty seluruh item (akan dipakai untuk badge di navbar Step 6)
    count: (s) => s.items.reduce((sum, it) => sum + toInt(it.qty), 0),

    // subtotal (price * qty)
    subtotal: (s) => s.items.reduce((sum, it) => sum + toNum(it.price) * toInt(it.qty), 0)
}

const mutations = {
    /**
     * addItem: jika item sudah ada → tambahkan qty; kalau belum → push.
     * payload minimal: { id, title, price, image, qty?: number }
     */
    addItem(state, payload) {
        const id = payload && payload.id
        if (!id) return

        const exists = state.items.find((x) => x.id === id)
        const delta = toInt(payload.qty) || 1

        if (exists) {
            exists.qty = Math.max(1, toInt(exists.qty) + delta)
        } else {
            state.items.push({
                id,
                title: payload.title || '',
                price: toNum(payload.price),
                image: payload.image || '',
                qty: Math.max(1, delta)
            })
        }
    },

    /**
     * setQty: set kuantitas spesifik (>=1)
     * payload: { id, qty }
     */
    setQty(state, { id, qty }) {
        const it = state.items.find((x) => x.id === id)
        if (!it) return
        const q = Math.max(1, toInt(qty))
        it.qty = q
    },

    /**
     * removeItem: hapus 1 item by id
     */
    removeItem(state, id) {
        state.items = state.items.filter((x) => x.id !== id)
    },

    /**
     * clear: kosongkan keranjang
     */
    clear(state) {
        state.items = []
    }
}

const actions = {
    // wrapper nyaman dipanggil dari komponen
    addItem({ commit }, payload) { commit('addItem', payload) },
    setQty({ commit }, payload) { commit('setQty', payload) },
    removeItem({ commit }, id) { commit('removeItem', id) },
    clear({ commit }) { commit('clear') }
}

// helpers lokal
function toInt(v) { return Math.max(0, parseInt(v, 10) || 0) }
function toNum(v) { return Number(v) || 0 }

export default { namespaced: true, state, getters, actions, mutations }
