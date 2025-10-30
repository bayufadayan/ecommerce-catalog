<template>
    <section class="container">
        <h1 style="margin-bottom:12px;">Keranjang</h1>

        <!-- EMPTY -->
        <EmptyState v-if="items.length === 0" title="Keranjang kosong"
            description="Belum ada item. Tambahkan produk dari katalog atau halaman detail.">
            <router-link class="btn" to="/products" style="margin-top:12px;">Lihat Katalog</router-link>
        </EmptyState>

        <!-- CONTENT -->
        <div v-else class="cart">
            <div class="list">
                <article v-for="it in items" :key="it.id" class="row">
                    <div class="media" @click="goDetail(it.id)">
                        <img :src="it.image" :alt="it.title" />
                    </div>

                    <div class="main">
                        <router-link class="title" :to="`/products/${it.id}`">{{ it.title }}</router-link>
                        <div class="price">{{ formatIDR(it.price) }}</div>

                        <div class="controls">
                            <div class="qty">
                                <button class="qbtn" @click="dec(it)">−</button>
                                <input :value="it.qty" @input="onQtyInput(it, $event.target.value)" inputmode="numeric"
                                    pattern="[0-9]*" />
                                <button class="qbtn" @click="inc(it)">+</button>
                            </div>

                            <button class="linklike danger" @click="remove(it.id)">Hapus</button>
                        </div>
                    </div>

                    <div class="sub">
                        <div class="label">Subtotal</div>
                        <div class="num">{{ formatIDR(it.price * it.qty) }}</div>
                    </div>
                </article>
            </div>

            <aside class="summary">
                <div class="line">
                    <span>Jumlah item</span>
                    <strong>{{ totalQty }}</strong>
                </div>
                <div class="line">
                    <span>Subtotal</span>
                    <strong>{{ formatIDR(subtotal) }}</strong>
                </div>

                <button class="btn primary" @click="checkout">Checkout (dummy)</button>
                <button class="btn ghost" @click="clearCart">Kosongkan Keranjang</button>
            </aside>
        </div>
    </section>
</template>

<script>
import EmptyState from '@/components/common/EmptyState.vue'
import { mapState, mapGetters } from 'vuex'
import { formatIDR } from '@/utils/format'

export default {
    name: 'CartView',
    components: { EmptyState },
    computed: {
        ...mapState('cart', ['items']),
        ...mapGetters('cart', ['subtotal', 'count']),
        totalQty() { return this.count }
    },
    methods: {
        formatIDR,
        goDetail(id) { this.$router.push(`/products/${id}`) },

        inc(it) {
            const q = Math.max(1, (it.qty || 1) + 1)
            this.$store.dispatch('cart/setQty', { id: it.id, qty: q })
        },
        dec(it) {
            const q = Math.max(1, (it.qty || 1) - 1)
            this.$store.dispatch('cart/setQty', { id: it.id, qty: q })
        },
        onQtyInput(it, val) {
            const parsed = parseInt(String(val).replace(/\D/g, ''), 10)
            const q = Math.max(1, isNaN(parsed) ? 1 : parsed)
            this.$store.dispatch('cart/setQty', { id: it.id, qty: q })
        },
        remove(id) {
            this.$store.dispatch('cart/removeItem', id)
            this.$root?.$children?.[0]?.$refs?.toast?.show?.('Item dihapus', 1200)
        },
        clearCart() {
            this.$store.dispatch('cart/clear')
            this.$root?.$children?.[0]?.$refs?.toast?.show?.('Keranjang dikosongkan', 1200)
        },
        checkout() {
            // dummy: cukup tampilkan toast
            // this.$root?.$children?.[0]?.$refs?.toast?.show?.('Checkout (dummy): segera hadir!', 1500)
            this.$router.push('/checkout')
        }
    }
}
</script>

<style scoped>
.cart {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

@media (min-width: 900px) {
    .cart {
        grid-template-columns: 2fr 1fr;
        align-items: start;
    }
}

.list {
    display: grid;
    gap: 10px;
}

.row {
    display: grid;
    grid-template-columns: 84px 1fr auto;
    gap: 12px;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 10px;
    background: #fff;
}

.media {
    width: 84px;
    height: 84px;
    background: #fafafa;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
}

.media img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.main {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.title {
    font-weight: 700;
    line-height: 1.35;
    color: inherit;
}

.price {
    font-weight: 700;
}

.controls {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 4px;
}

.qty {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #f6f6f6;
    border-radius: 10px;
    padding: 4px;
}

.qbtn {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: 1px solid #e5e5e5;
    background: #fff;
    cursor: pointer;
}

.qty input {
    width: 56px;
    text-align: center;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    padding: 6px;
}

.linklike {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
    font: inherit;
}

.linklike.danger {
    color: #b00020;
}

.sub {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
}

.sub .label {
    color: #777;
    font-size: 13px;
}

.sub .num {
    font-weight: 800;
}

.summary {
    position: sticky;
    top: 12px;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 12px;
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.summary .line {
    display: flex;
    justify-content: space-between;
}

.btn {
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    padding: 10px 12px;
    cursor: pointer;
    background: #f8f8f8;
}

.btn:hover {
    background: #f1f1f1;
}

.btn.primary {
    background: #111;
    color: #fff;
    border-color: #111;
}

.btn.ghost {
    background: #fff;
}
</style>
