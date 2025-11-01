<!-- eslint-disable no-unused-vars -->
<template>
    <section class="container">
        <BackButton />
        <h1>Checkout</h1>

        <EmptyState v-if="items.length === 0" title="Keranjang kosong"
            description="Tambahkan produk dulu sebelum checkout.">
            <router-link class="btn" to="/products">Lihat Katalog</router-link>
        </EmptyState>

        <div v-else class="co">
            <!-- LEFT: form -->
            <form class="panel" @submit.prevent="onSubmit" novalidate>
                <h2 class="h2">Data Pemesan</h2>

                <div class="field">
                    <label>Nama Lengkap</label>
                    <input v-model.trim="form.name" type="text" required placeholder="Nama sesuai pengiriman" />
                    <small v-if="submitted && !form.name" class="err">Wajib diisi</small>
                </div>

                <div class="field">
                    <label>Email</label>
                    <input v-model.trim="form.email" type="email" required placeholder="nama@email.com" />
                    <small v-if="submitted && !isEmail(form.email)" class="err">Email tidak valid</small>
                </div>

                <div class="field">
                    <label>Alamat</label>
                    <textarea v-model.trim="form.address" rows="3" required
                        placeholder="Jalan/Perumahan, RT/RW, No. Rumah"></textarea>
                    <small v-if="submitted && !form.address" class="err">Wajib diisi</small>
                </div>

                <div class="row2">
                    <div class="field">
                        <label>Kota</label>
                        <input v-model.trim="form.city" type="text" required />
                        <small v-if="submitted && !form.city" class="err">Wajib diisi</small>
                    </div>
                    <div class="field">
                        <label>Kode Pos</label>
                        <input v-model.trim="form.postal" type="text" inputmode="numeric" pattern="[0-9]*" required />
                        <small v-if="submitted && !/^[0-9]{4,6}$/.test(form.postal)" class="err">Kode pos tidak
                            valid</small>
                    </div>
                </div>

                <div class="field">
                    <label>Catatan (opsional)</label>
                    <textarea v-model.trim="form.note" rows="2" placeholder="Catatan untuk kurir"></textarea>
                </div>

                <button class="btn primary" type="submit" :disabled="placing">
                    <span v-if="placing">Memproses…</span>
                    <span v-else>Place Order (dummy)</span>
                </button>
            </form>

            <!-- RIGHT: ringkasan -->
            <aside class="panel summary">
                <h2 class="h2">Ringkasan</h2>
                <ul class="items">
                    <li v-for="it in items" :key="it.id" class="it">
                        <img :src="it.image" :alt="it.title" />
                        <div class="meta">
                            <div class="title" :title="it.title">{{ it.title }}</div>
                            <div class="desc">Qty: {{ it.qty }} × {{ formatPrice(it.price) }}</div>
                        </div>
                        <div class="sub">{{ formatPrice(it.price * it.qty) }}</div>
                    </li>
                </ul>

                <div class="line">
                    <span>Subtotal</span>
                    <strong>{{ formatPrice(subtotal) }}</strong>
                </div>
                <div class="line">
                    <span>Ongkir (dummy)</span>
                    <strong>{{ formatPrice(shipping) }}</strong>
                </div>
                <div class="line total">
                    <span>Total</span>
                    <strong>{{ formatPrice(total) }}</strong>
                </div>
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
    name: 'CheckoutView',
    components: { EmptyState, BackButton },
    data() {
        return {
            form: { name: '', email: '', address: '', city: '', postal: '', note: '' },
            submitted: false,
            placing: false
        }
    },
    computed: {
        ...mapState('cart', ['items']),
        ...mapGetters('cart', ['subtotal', 'count']),
        shipping() {
            // dummy ongkir: Rp 20.000 kalau ada barang, else 0
            return this.items.length ? 20000 : 0
        },
        total() {
            return this.subtotal + this.shipping
        }
    },
    methods: {
        formatPrice,
        isEmail(s) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || '').toLowerCase())
        },
        async onSubmit() {
            this.submitted = true
            // validasi minimal
            if (!this.form.name || !this.isEmail(this.form.email) || !this.form.address || !this.form.city || !/^[0-9]{4,6}$/.test(this.form.postal)) {
                this.$root?.$children?.[0]?.$refs?.toast?.show?.('Lengkapi data dengan benar', 1500)
                return
            }

            try {
                this.placing = true
                // di real app → kirim payload order ke server.
                // di sini dummy saja.
                // eslint-disable-next-line no-unused-vars
                const payload = {
                    customer: { ...this.form },
                    items: this.items.map(it => ({ id: it.id, qty: it.qty, price: it.price })),
                    subtotal: this.subtotal,
                    shipping: this.shipping,
                    total: this.total,
                    createdAt: new Date().toISOString()
                }
                // simulate 700ms
                await new Promise(r => setTimeout(r, 700))

                // clear cart & success toast
                this.$store.dispatch('cart/clear')
                this.$root?.$children?.[0]?.$refs?.toast?.show?.('Order berhasil (dummy) ✔', 1600)

                // redirect ke katalog
                this.$router.replace('/products')
            } finally {
                this.placing = false
            }
        }
    },
    created() {
        // jika cart kosong, arahkan balik
        if (this.items.length === 0) {
            this.$router.replace('/cart')
        }
    }
}
</script>
