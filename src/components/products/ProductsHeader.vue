<template>
    <div class="pv-toolbar" role="region" aria-label="Filter dan Sort">
        <!-- Kategori -->
        <div class="pv-chips" role="tablist" aria-label="Kategori">
            <button
                v-for="c in categories"
                :key="c"
                class="pv-chip"
                :class="{ 'pv-chip--active': valueCategory === c }"
                role="tab"
                @click="onCategory(c)">
                {{ labelize(c) }}
            </button>
        </div>

        <!-- Controls: search + sort + reset -->
        <div class="pv-controls">
            <input
                class="pv-search"
                type="search"
                :value="localQuery"
                placeholder="Cari produk…"
                @input="onQueryInput($event.target.value)"
                aria-label="Cari produk" />

            <select class="pv-sort" :value="valueSortBy" @change="onSortBy($event.target.value)" aria-label="Urutkan">
                <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                </option>
            </select>

            <!-- Reset -->
            <button class="pv-reset-btn pv-reset" type="button" @click="$emit('reset')" aria-label="Reset filters">
                <FaIcon :icon="['fas','sync']" class="icon" />
                <span class="pv-reset-label">Reset</span>
            </button>
        </div>
    </div>
</template>

<script>
import { SORT_OPTIONS } from '@/constants/products-filters'

export default {
    name: 'ProductsHeader',
    props: {
        categories: { type: Array, default: () => ['all'] },
        valueCategory: { type: String, default: 'all' },
        valueQuery: { type: String, default: '' },
        valueSortBy: { type: String, default: 'relevance' },
        debounceMs: { type: Number, default: 300 }   // ← baru
    },
    data() {
        return {
            sortOptions: SORT_OPTIONS,
            localQuery: this.valueQuery,  // ← buffer lokal untuk debounce
            t: null
        }
    },
    watch: {
        // sinkronkan jika parent mengubah query (mis. reset)
        valueQuery(v) { this.localQuery = v }
    },
    methods: {
        onCategory(v) { this.$emit('update:category', v) },
        onQueryInput(v) {
            this.localQuery = v
            clearTimeout(this.t)
            this.t = setTimeout(() => {
                this.$emit('update:query', this.localQuery)
            }, this.debounceMs)
        },
        onSortBy(v) { this.$emit('update:sortBy', v) },
        labelize(s) {
            if (!s) return ''
            if (s === 'all') return 'All'
            const t = String(s).replace(/_/g, ' ')
            return t.charAt(0).toUpperCase() + t.slice(1)
        }
    },
    beforeDestroy() { clearTimeout(this.t) }
}
</script>

<!-- Styles moved to main.css (pv- prefixed classes). -->
