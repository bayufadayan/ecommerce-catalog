<template>
    <section class="container">
        <BackButton />
        <h1>Keranjang</h1>

        <!-- EMPTY -->
        <EmptyState v-if="items.length === 0" title="Keranjang kosong"
            description="Belum ada item. Tambahkan produk dari katalog atau halaman detail.">
            <router-link class="btn" to="/products">Lihat Katalog</router-link>
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
                        <div class="price">{{ formatPrice(it.price) }}</div>

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
                        <div class="num">{{ formatPrice(it.price * it.qty) }}</div>
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
                    <strong>{{ formatPrice(subtotal) }}</strong>
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
import { formatPrice } from '@/utils/format'
import BackButton from '@/components/common/BackButton.vue'

export default {
    name: 'CartView',
    components: { EmptyState, BackButton },
    computed: {
        ...mapState('cart', ['items']),
        ...mapGetters('cart', ['subtotal', 'count']),
        totalQty() { return this.count }
    },
    methods: {
        formatPrice,
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
