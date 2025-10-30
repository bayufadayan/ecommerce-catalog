<template>
    <section class="container">
        <h1 style="margin-bottom:12px;">Products</h1>

        <ProductsHeader :categories="categories" :valueCategory="category" :valueQuery="query" :valueSortBy="sortBy"
            :debounceMs="300" @update:category="category = $event" @update:query="query = $event"
            @update:sortBy="sortBy = $event" @reset="onResetFilters" />

        <ErrorBanner v-if="error" :message="error" @retry="retry" />
        <LoadingSpinner v-else-if="loading" />

        <!-- EMPTY (copy kontekstual) -->
        <EmptyState v-else-if="list.length === 0" :title="emptyTitle" :description="emptyDesc">
            <button class="btn" @click="onResetFilters" style="margin-top:12px;">Reset Filter</button>
        </EmptyState>

        <!-- CONTENT -->
        <div v-else>
            <div class="meta">
                Menampilkan <strong>{{ list.length }}</strong> dari <strong>{{ totalItems }}</strong> produk
                <template v-if="category !== 'all'"> • Kategori: <em>{{ category }}</em></template>
                <template v-if="query"> • Query: “<em>{{ query }}</em>”</template>
            </div>

            <ProductGrid :items="list" :loading="loading" :skeletonCount="8" @select="goToDetail" />
        </div>
    </section>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorBanner from '@/components/common/ErrorBanner.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import ProductsHeader from '@/components/products/ProductsHeader.vue'
import ProductGrid from '@/components/products/ProductGrid.vue'

export default {
    name: 'ProductsView',
    components: { LoadingSpinner, ErrorBanner, EmptyState, ProductsHeader, ProductGrid },
    computed: {
        ...mapState('products', ['loading', 'error', 'filters']),
        ...mapGetters('products', ['filteredProducts', 'categoriesWithAll']),
        categories() { return this.categoriesWithAll },
        category: {
            get() { return this.filters.category },
            set(v) { this.setCategory(v) }
        },
        query: {
            get() { return this.filters.query },
            set(v) { this.setQuery(v) }
        },
        sortBy: {
            get() { return this.filters.sortBy },
            set(v) { this.setSortBy(v) }
        },
        list() { return this.filteredProducts || [] },
        totalItems() { return this.$store.state.products.items.length },

        // Empty copy kontekstual
        emptyTitle() {
            if (this.query) return 'Tidak ada hasil untuk pencarian'
            return 'Belum ada produk'
        },
        emptyDesc() {
            const parts = []
            if (this.category !== 'all') parts.push(`kategori “${this.category}”`)
            if (this.query) parts.push(`query “${this.query}”`)
            const ctx = parts.length ? ` dengan ${parts.join(' dan ')}` : ''
            return `Coba ubah filter${ctx} atau reset filter.`
        }
    },
    methods: {
        ...mapMutations('products', ['setCategory', 'setQuery', 'setSortBy', 'resetFilters']),
        async retry() {
            if (this.category && this.category !== 'all') {
                await this.$store.dispatch('products/fetchByCategory', this.category)
            } else {
                await this.$store.dispatch('products/fetchAll')
            }
        },
        onResetFilters() {
            this.resetFilters()
            this.retry()
        },
        goToDetail(p) { this.$router.push(`/products/${p.id}`) }
    },
    watch: {
        category(newVal, oldVal) {
            if (newVal === oldVal) return
            if (!newVal || newVal === 'all') this.$store.dispatch('products/fetchAll')
            else this.$store.dispatch('products/fetchByCategory', newVal)
        }
    },
    created() {
        this.$store.dispatch('products/boot')
    }
}
</script>

<style scoped>
.meta {
    color: #666;
    font-size: 14px;
    margin: 6px 0 12px;
}

/* sentuhan kecil hover/focus untuk aksesibilitas */
:deep(.card.prod) {
    transition: transform .08s ease, box-shadow .08s ease;
}

:deep(.card.prod:hover) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, .06);
}
</style>
