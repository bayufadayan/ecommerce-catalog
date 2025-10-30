<template>
    <section class="container">
        <h1 style="margin-bottom:12px;">Products</h1>

        <ProductsHeader :categories="categories" :valueCategory="category" :valueQuery="query" :valueSortBy="sortBy"
            @update:category="category = $event" @update:query="query = $event" @update:sortBy="sortBy = $event"
            @reset="onResetFilters" />

        <ErrorBanner v-if="error" :message="error" @retry="retry" />
        <LoadingSpinner v-else-if="loading" />
        <EmptyState v-else-if="list.length === 0" title="Belum ada produk"
            description="Coba ubah kata kunci, kategori, atau reset filter.">
            <button class="btn" @click="onResetFilters" style="margin-top:12px;">Reset Filter</button>
        </EmptyState>

        <!-- Gantikan grid sementara dengan ProductGrid -->
        <ProductGrid v-else :items="list" :loading="loading" :skeletonCount="8" @select="goToDetail" />

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
        list() { return this.filteredProducts || [] }
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
