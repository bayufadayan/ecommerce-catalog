
<script>
import { mapState, mapGetters } from 'vuex'
import ErrorBanner from '@/components/common/ErrorBanner.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import SkeletonCard from '@/components/common/SkeletonCard.vue'
import ProductCard from '@/components/products/ProductCard.vue'
import ProductsHeader from '@/components/products/ProductsHeader.vue'
import debounce from '@/utils/debounce'

export default {
    name: 'ProductView',
    components: { ErrorBanner, EmptyState, SkeletonCard, ProductCard, ProductsHeader },
    computed: {
        ...mapState('products', ['loading', 'error', 'filters']),
        ...mapGetters('products', ['categoriesWithAll', 'filteredSorted']),
        categories() { return this.categoriesWithAll },
        items() { return this.filteredSorted }
    },
    methods: {
        label(s) { return s === 'all' ? 'All' : String(s).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) },
        onCategory(cat) { this.$store.dispatch('products/setCategory', cat) },
        onSort(e) { this.$store.dispatch('products/setSortBy', e.target.value) },
        onQuery: debounce(function (e) {
            this.$store.dispatch('products/setQuery', e.target.value)
        }, 300),
        retry() {
            this.$store.dispatch('products/fetchProducts')
        }
    },
    created() {
        Promise.resolve(this.$store.dispatch('products/bootstrap'))
            .catch(() => { })
            .then(() => this.$store.dispatch('products/fetchProducts'))
    }
}
</script>

<template>
    <section class="container">
        <h1 class="pv-title">Products</h1>

        <ProductsHeader
            :categories="categories"
            :valueCategory="filters.category"
            :valueQuery="filters.query"
            :valueSortBy="filters.sortBy"
            :debounceMs="300"
            @update:category="onCategory"
            @update:query="(q) => $store.dispatch('products/setQuery', q)"
            @update:sortBy="(s) => $store.dispatch('products/setSortBy', s)"
            @reset="retry"
        />

        <!-- ERROR -->
        <ErrorBanner v-if="error" :message="error" @retry="retry" />

        <!-- LOADING -->
        <div v-else-if="loading" class="pv-grid">
            <SkeletonCard v-for="n in 8" :key="n" />
        </div>

        <!-- EMPTY -->
        <EmptyState v-else-if="items.length === 0" title="Tidak ada produk"
            description="Coba ubah kategori, urutan, atau kata kunci pencarian.">
            <button class="btn" @click="retry" style="margin-top:12px;">Muat Ulang</button>
        </EmptyState>

        <!-- CONTENT -->
        <div v-else class="pv-grid">
            <ProductCard v-for="p in items" :key="p.id" :product="p" />
        </div>

        <a class="pv-skip-top" href="#top">Kembali ke atas</a>
    </section>
</template>

<style scoped>
</style>