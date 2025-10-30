<template>
    <section class="container">
        <button class="linklike" @click="goBack">← Kembali</button>
        <h1 style="margin:8px 0 12px;">Product Detail</h1>

        <!-- ERROR -->
        <ErrorBanner v-if="error" :message="error" @retry="retry" />

        <!-- LOADING -->
        <LoadingSpinner v-else-if="loading" />

        <!-- NOT FOUND / EMPTY -->
        <EmptyState v-else-if="!product" title="Produk tidak ditemukan"
            description="Produk yang Anda cari tidak tersedia. Kembali ke katalog untuk melihat item lainnya.">
            <router-link class="btn" to="/products" style="margin-top:12px;">Lihat Katalog</router-link>
        </EmptyState>

        <!-- CONTENT -->
        <div v-else class="detail">
            <div class="media">
                <div class="media-box">
                    <img :src="product.image" :alt="product.title" />
                </div>
            </div>

            <div class="info">
                <h2 class="title">{{ product.title }}</h2>

                <div class="price">{{ formatIDR(product.price) }}</div>

                <div class="meta">
                    <span class="badge">{{ humanCategory(product.category) }}</span>
                    <span class="rating">★ {{ product.rating?.rate || 0 }} <small>({{ product.rating?.count || 0
                            }})</small></span>
                </div>

                <p class="desc">{{ product.description }}</p>

                <div class="actions">
                    <button class="btn primary" :disabled="loading || adding || !product" @click="onAddToCart">
                        <span v-if="adding">Menambahkan…</span>
                        <span v-else>Add to Cart</span>
                    </button>
                    <router-link class="btn ghost" to="/products">Kembali ke Katalog</router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorBanner from '@/components/common/ErrorBanner.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { getProduct } from '@/api/products'
import { formatIDR } from '@/utils/format'

export default {
    name: 'ProductDetailView',
    components: { LoadingSpinner, ErrorBanner, EmptyState },
    data() {
        return {
            loading: false,
            error: '',
            product: null,
            adding: false,           // ← NEW: guard klik ganda
        }
    },
    computed: {
        // payload minimal yang dibutuhkan cart module
        cartPayload() {
            if (!this.product) return null
            const { id, title, price, image } = this.product
            return { id, title, price, image, qty: 1 }
        }
    },
    methods: {
        formatIDR,
        humanCategory(s) {
            if (!s) return ''
            const t = String(s).replace(/_/g, ' ')
            return t.charAt(0).toUpperCase() + t.slice(1)
        },
        goBack() {
            if (window.history.length > 1) this.$router.back()
            else this.$router.replace('/products')
        },
        async fetchDetail() {
            try {
                this.loading = true
                this.error = ''
                this.product = null
                const id = Number(this.$route.params.id)
                if (!Number.isFinite(id) || id <= 0) { this.product = null; return }
                const data = await getProduct(id)
                this.product = data || null
            } catch (e) {
                const msg =
                    e?.message?.includes('HTTP 404') ? 'Produk tidak ditemukan (404).' :
                        e?.message?.toLowerCase?.().includes('network') ? 'Gagal terhubung ke server. Coba lagi.' :
                            (e?.message || 'Gagal memuat detail produk.')
                this.error = msg
            } finally {
                this.loading = false
            }
        },
        retry() { this.fetchDetail() },

        // ← NEW: handler Add to Cart
        async onAddToCart() {
            if (this.adding || !this.cartPayload) return
            try {
                this.adding = true
                await this.$store.dispatch('cart/addItem', this.cartPayload)
                // Toast sukses (pakai Toast global yang sudah kita pasang)
                this.$root?.$children?.[0]?.$refs?.toast?.show?.('Ditambahkan ke keranjang', 1500)
            } finally {
                this.adding = false
            }
        }
    },
    watch: {
        '$route.params.id': { handler() { this.fetchDetail() } }
    },
    created() { this.fetchDetail() }
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

.detail {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

@media (min-width: 768px) {
    .detail {
        grid-template-columns: 1fr 1fr;
        align-items: start;
    }
}

.media-box {
    width: 100%;
    height: 360px;
    background: #f7f7f7;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.media-box img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.info .title {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px;
    line-height: 1.3;
}

.price {
    font-size: 20px;
    font-weight: 800;
    margin: 4px 0 10px;
}

.meta {
    display: flex;
    gap: 12px;
    align-items: center;
    color: #555;
    margin-bottom: 12px;
}

.badge {
    display: inline-block;
    background: #111;
    color: #fff;
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 12px;
    font-weight: 600;
}

.rating small {
    color: #777;
}

.desc {
    color: #444;
    line-height: 1.6;
    margin: 8px 0 16px;
}

.actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.btn {
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    padding: 8px 12px;
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

.btn.primary[disabled] {
    opacity: .6;
    cursor: not-allowed;
}

.btn.ghost {
    background: #fff;
}
</style>
