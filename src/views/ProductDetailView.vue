<script>
import ErrorBanner from '@/components/common/ErrorBanner.vue';
import ProductUnavailableCard from '@/components/products/ProductUnavailableCard.vue';
import SkeletonProductDetail from '@/components/products/SkeletonProductDetail.vue';
import { getProduct } from '@/api/products'
import { isAllowedCategory } from '@/constants/allowed-categories'

export default {
    name: 'ProductDetailView',
    components: { ErrorBanner, ProductUnavailableCard, SkeletonProductDetail },

    data() {
        return {
            loading: false,
            error: '',
            product: null,
            adding: false,
            isReadMore: false
        }
    },

    computed: {
        currentId() {
            const id = Number(this.$route.params.id)
            return Number.isFinite(id) && id > 0 ? id : 1
        },

        nextId() {
            return (this.currentId % 20) + 1
        },

        cartPayload() {
            if (!this.product) return null
            const { id, title, price, image } = this.product
            return { id, title, price, image, qty: 1 }
        },

        theme() {
            if (!this.product || !this.product.category) return 'neutral'
            const c = this.product.category.toLowerCase()
            if (c.includes('women')) return 'women'
            if (c.includes('men')) return 'men'
            return 'neutral'
        },

        themeClass() {
            return this.theme === 'women'
                ? 'theme-women'
                : this.theme === 'men'
                    ? 'theme-men'
                    : 'theme-neutral'
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

        async fetchDetail() {
            try {
                this.loading = true
                this.error = ''
                this.product = null

                const id = this.currentId
                const data = await getProduct(id)

                if (!isAllowedCategory(data?.category)) {
                    this.product = null
                    return
                }

                this.product = data || null
            } catch (e) {
                const msg = e?.message?.includes('HTTP 404')
                    ? 'Produk tidak ditemukan (404).'
                    : e?.message?.toLowerCase?.().includes('network')
                        ? 'Gagal terhubung ke server. Coba lagi.'
                        : e?.message || 'Gagal memuat detail produk.'
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
        },

        toggleReadMore() {
            this.isReadMore = !this.isReadMore
        },

        nextProduct() {
            this.$router.push(`/products/${this.nextId}`)
        },

        scrollToTop() {
            try {
                const supportsSmooth = 'scrollBehavior' in document.documentElement.style;
                if (supportsSmooth) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    window.scrollTo(0, 0);
                }
            } catch (_) {
                window.scrollTo(0, 0);
            }
        },
    },

    watch: {
        '$route.params.id': {
            handler() {
                this.scrollToTop();
                this.fetchDetail();
            }
        }
    },

    created() {
        this.scrollToTop();
        this.fetchDetail();
    }
}
</script>

<template>
    <main :class="['product-detail', themeClass]">
        <div class="pd-hero"></div>

        <section class="container-product-detail">
            <ErrorBanner v-if="error" :message="error" @retry="retry" />
            <SkeletonProductDetail v-else-if="loading" />
            <ProductUnavailableCard v-else-if="!product" :current-id="currentId" />

            <div v-else class="pd-card">
                <!-- MEDIA -->
                <div class="pd-media">
                    <div class="pd-media-box">
                        <img :src="product.image" :alt="product.title" />
                    </div>
                </div>

                <!-- INFO -->
                <div class="pd-info">
                    <div class="pd-top-content">
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

                        <p class="pd-desc custom-scrollbar" :class="{ 'read-more': isReadMore }">
                            {{ product.description }}
                        </p>

                        <button class="read-more-btn" @click="toggleReadMore">
                            {{ isReadMore ? 'Read Less...' : 'Read More...' }}
                        </button>
                    </div>

                    <div class="pd-down-content">
                        <hr class="pd-sep" />

                        <div class="pd-price-row">
                            <div class="pd-price">{{ formatPrice(product.price) }}</div>
                        </div>

                        <div class="pd-actions">
                            <button class="pd-btn pd-btn--solid" :disabled="loading || adding || !product"
                                @click="onAddToCart">
                                <span v-if="adding">Menambahkan…</span>
                                <span v-else class="cart-btn">
                                    <FaIcon icon="shopping-cart" class="icon" />
                                    Add to Cart
                                </span>
                            </button>

                            <button class="pd-btn pd-btn--outline" :aria-label="`Next product (ID ${nextId})`"
                                @click="nextProduct">
                                Next product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
</style>
