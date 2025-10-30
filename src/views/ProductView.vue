<template>
    <section class="container">
        <h1 class="h1">Products</h1>

        <!-- Controls -->
        <div class="toolbar" role="region" aria-label="Filter dan Sort">
            <div class="chips" role="tablist" aria-label="Kategori">
                <button v-for="cat in categories" :key="cat" class="chip" :class="{ active: filters.category === cat }"
                    role="tab" @click="onCategory(cat)">
                    {{ label(cat) }}
                </button>
            </div>

            <div class="right">
                <input class="search" type="search" placeholder="Cari produk…" :value="filters.query" @input="onQuery"
                    aria-label="Cari produk" />

                <select class="sort" :value="filters.sortBy" @change="onSort" aria-label="Urutkan">
                    <option value="relevance">Relevance</option>
                    <option value="price-asc">Harga: Terendah</option>
                    <option value="price-desc">Harga: Tertinggi</option>
                    <option value="rating-desc">Rating: Tertinggi</option>
                </select>
            </div>
        </div>

        <!-- ERROR -->
        <ErrorBanner v-if="error" :message="error" @retry="retry" />

        <!-- LOADING (server fetch) -->
        <div v-else-if="loading" class="grid">
            <SkeletonCard v-for="n in 8" :key="n" />
        </div>

        <!-- EMPTY -->
        <EmptyState v-else-if="items.length === 0" title="Tidak ada produk"
            description="Coba ubah kategori, urutan, atau kata kunci pencarian.">
            <button class="btn" @click="retry" style="margin-top:12px;">Muat Ulang</button>
        </EmptyState>

        <!-- CONTENT -->
        <div v-else class="grid">
            <ProductCard v-for="p in items" :key="p.id" :product="p" />
        </div>

        <a class="skip-top" href="#top">Kembali ke atas</a>
    </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ErrorBanner from '@/components/common/ErrorBanner.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import SkeletonCard from '@/components/common/SkeletonCard.vue'
import ProductCard from '@/components/products/ProductCard.vue'
import debounce from '@/utils/debounce'

export default {
    name: 'ProductView',
    components: { ErrorBanner, EmptyState, SkeletonCard, ProductCard },
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
            // query tidak fetch server; filter client-side dari cache
        }, 300),
        retry() {
            this.$store.dispatch('products/fetchProducts')
        }
    },
    created() {
        // Jangan pakai .finally pada hasil dispatch yang mungkin undefined ketika action unknown.
        // Gunakan Promise.resolve(...) agar aman.
        Promise.resolve(this.$store.dispatch('products/bootstrap'))
            .catch(() => { }) // kalau gagal bootstrap, lanjut fetch saja
            .then(() => this.$store.dispatch('products/fetchProducts'))
    }
}
</script>

<style scoped>
.h1 {
    margin-bottom: 12px;
}

.toolbar {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    flex-wrap: wrap;
}

.chips {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.chip {
    border: 1px solid #e5e5e5;
    border-radius: 999px;
    padding: 6px 10px;
    background: #fff;
    cursor: pointer;
}

.chip.active {
    background: #111;
    color: #fff;
    border-color: #111;
}

.right {
    display: flex;
    gap: 8px;
    align-items: center;
}

.search,
.sort {
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    padding: 8px 10px;
}

.search {
    min-width: 220px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
}

@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}

.btn {
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    padding: 10px 12px;
    cursor: pointer;
    background: #f8f8f8;
}

.skip-top {
    display: inline-block;
    margin-top: 16px;
    font-size: 13px;
    color: #666;
}
</style>
