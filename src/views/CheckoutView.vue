<!-- eslint-disable no-unused-vars -->
<template>
    <section class="container">
        <button class="linklike" @click="$router.back()">← Kembali</button>
        <h1 style="margin:8px 0 12px;">Checkout</h1>

        <EmptyState v-if="items.length === 0" title="Keranjang kosong"
            description="Tambahkan produk dulu sebelum checkout.">
            <router-link class="btn" to="/products" style="margin-top:12px;">Lihat Katalog</router-link>
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
                            <div class="desc">Qty: {{ it.qty }} × {{ formatIDR(it.price) }}</div>
                        </div>
                        <div class="sub">{{ formatIDR(it.price * it.qty) }}</div>
                    </li>
                </ul>

                <div class="line">
                    <span>Subtotal</span>
                    <strong>{{ formatIDR(subtotal) }}</strong>
                </div>
                <div class="line">
                    <span>Ongkir (dummy)</span>
                    <strong>{{ formatIDR(shipping) }}</strong>
                </div>
                <div class="line total">
                    <span>Total</span>
                    <strong>{{ formatIDR(total) }}</strong>
                </div>
            </aside>
        </div>
    </section>
</template>

<script>
import EmptyState from '@/components/common/EmptyState.vue'
import { mapState, mapGetters } from 'vuex'
import { formatIDR } from '@/utils/format'

export default {
    name: 'CheckoutView',
    components: { EmptyState },
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
        formatIDR,
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

<style scoped>
.linklike {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
    font: inherit;
}

.co {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

@media (min-width: 900px) {
    .co {
        grid-template-columns: 2fr 1.2fr;
        align-items: start;
    }
}

.panel {
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 12px;
    background: #fff;
}

.h2 {
    font-size: 18px;
    margin: 0 0 10px;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 10px;
}

.field input,
.field textarea {
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    padding: 8px 10px;
    font-size: 14px;
}

.row2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

.err {
    color: #b00020;
    font-size: 12px;
}

.summary {
    position: sticky;
    top: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.items {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 10px;
    max-height: 360px;
    overflow: auto;
}

.it {
    display: grid;
    grid-template-columns: 60px 1fr auto;
    gap: 10px;
    align-items: center;
}

.it img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    background: #fafafa;
    border-radius: 10px;
}

.it .title {
    font-weight: 600;
    font-size: 14px;
    line-height: 1.35;
}

.it .desc {
    font-size: 13px;
    color: #666;
}

.it .sub {
    font-weight: 800;
}

.line {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.line.total {
    border-top: 1px dashed #e5e5e5;
    padding-top: 8px;
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
</style>
