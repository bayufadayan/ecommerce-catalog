<template>
    <main :class="['product-detail', themeClass]">
        <!-- band background sesuai tema -->
        <div class="pd-hero"></div>

        <section class="container">
            <h1 class="pd-page-title">Product Detail</h1>

            <ErrorBanner v-if="error" :message="error" @retry="retry" />
            <LoadingSpinner v-else-if="loading" />

            <EmptyState v-else-if="!product" title="Produk tidak ditemukan"
                description="Produk yang Anda cari tidak tersedia. Kembali ke katalog untuk melihat item lainnya.">
                <router-link class="btn" to="/products" style="margin-top:12px;">Lihat Katalog</router-link>
            </EmptyState>

            <div v-else class="pd-card">
                <!-- MEDIA -->
                <div class="pd-media">
                    <div class="pd-media-box">
                        <img :src="product.image" :alt="product.title" />
                    </div>
                </div>

                <!-- INFO -->
                <div class="pd-info">
                    <h2 class="pd-title">{{ product.title }}</h2>

                    <div class="pd-sub">
                        <span class="pd-category">{{ humanCategory(product.category) }}</span>

                        <div class="pd-rating" v-if="ratingScore">
                            <span class="pd-rating-score">{{ ratingScore.toFixed(1) }}/5</span>
                            <ul class="pd-rating-dots" aria-hidden="true">
                                <li v-for="n in 5" :key="n" :class="{ filled: n <= filledDots }"></li>
                            </ul>
                        </div>
                    </div>

                    <p class="pd-desc">{{ product.description }}</p>

                    <hr class="pd-sep" />

                    <div class="pd-price-row">
                        <div class="pd-price">{{ formatPrice(product.price) }}</div>
                    </div>

                    <div class="pd-actions">
                        <button class="pd-btn pd-btn--solid" :disabled="loading || adding || !product"
                            @click="onAddToCart">
                            <span v-if="adding">Menambahkan…</span>
                            <span v-else>Buy now</span>
                        </button>

                        <router-link class="pd-btn pd-btn--outline" to="/products">
                            Next product
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorBanner from '@/components/common/ErrorBanner.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { getProduct } from '@/api/products'

export default {
    name: 'ProductDetailView',
    components: { LoadingSpinner, ErrorBanner, EmptyState },

    data() {
        return {
            loading: false,
            error: '',
            product: null,
            adding: false,
        }
    },
    computed: {
        cartPayload() {
            if (!this.product) return null
            const { id, title, price, image } = this.product
            return { id, title, price, image, qty: 1 }
        },
        theme() {
            const c = (this.product?.category || '').toLowerCase()
            if (c.includes('women')) return 'women'
            if (c.includes('men')) return 'men'
            return 'men'
        },
        themeClass() {
            return this.theme === 'women' ? 'theme-women' : 'theme-men'
        },
        ratingScore() {
            return this.product?.rating?.rate || 0
        },
        filledDots() {
            return Math.round(Math.max(0, Math.min(5, this.ratingScore)))
        }
    },

    methods: {
        formatPrice(n) {
            if (typeof n !== 'number') return '-'
            return `$${n.toFixed(2)}`
        },
        humanCategory(s) {
            if (!s) return ''
            const t = String(s).replace(/_/g, ' ')
            return t.charAt(0).toUpperCase() + t.slice(1)
        },

        goBack() {
            if (window.history.length > 1) {
                this.$router.back()
            } else {
                this.$router.replace('/products')
            }
        },

        async fetchDetail() {
            try {
                this.loading = true
                this.error = ''
                this.product = null

                const id = Number(this.$route.params.id)
                if (!Number.isFinite(id) || id <= 0) {
                    this.product = null
                    return
                }

                const data = await getProduct(id)
                this.product = data || null
            } catch (e) {
                const msg = e?.message?.includes('HTTP 404')
                    ? 'Produk tidak ditemukan (404).'
                    : e?.message?.toLowerCase?.().includes('network')
                        ? 'Gagal terhubung ke server. Coba lagi.'
                        : (e?.message || 'Gagal memuat detail produk.')
                this.error = msg
            } finally {
                this.loading = false
            }
        },

        retry() {
            this.fetchDetail()
        },

        async onAddToCart() {
            if (this.adding || !this.cartPayload) return

            try {
                this.adding = true
                await this.$store.dispatch('cart/addItem', this.cartPayload)
                this.$root?.$children?.[0]?.$refs?.toast?.show?.('Ditambahkan ke keranjang', 1500)
            } finally {
                this.adding = false
            }
        }
    },

    watch: {
        '$route.params.id': {
            handler() {
                this.fetchDetail()
            }
        }
    },

    created() {
        this.fetchDetail()
    }
}
</script>
