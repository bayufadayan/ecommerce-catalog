const state = () => ({
    items: [] // { product, qty }
})

const getters = {
    // totalItems: s => 0,
    // subTotal: s => 0
}

const actions = {
    // optional
}

const mutations = {
    // add(state, product) {},
    // remove(state, productId) {},
    // setQty(state, { id, qty }) {},
    // clear(state) {},
    // persist(state) {}
}

export default { namespaced: true, state, getters, actions, mutations }
