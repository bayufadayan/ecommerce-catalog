<script>
import { SORT_OPTIONS } from '@/constants/products-filters'

export default {
    name: 'ProductsHeader',
    props: {
        categories: {
            type: Array,
            default: () => ['all']
        },
        valueCategory: {
            type: String,
            default: 'all'
        },
        valueQuery: {
            type: String,
            default: ''
        },
        valueSortBy: {
            type: String,
            default: 'relevance'
        },
        debounceMs: {
            type: Number,
            default: 300
        }
    },
    data() {
        return {
            sortOptions: SORT_OPTIONS,
            localQuery: this.valueQuery,
            t: null
        }
    },
    watch: {
        valueQuery(v) {
            this.localQuery = v
        }
    },
    methods: {
        onCategory(v) {
            this.$emit('update:category', v)
        },
        onQueryInput(v) {
            this.localQuery = v
            clearTimeout(this.t)
            this.t = setTimeout(() => {
                this.$emit('update:query', this.localQuery)
            }, this.debounceMs)
        },
        onSortBy(v) {
            this.$emit('update:sortBy', v)
        },
        labelize(s) {
            if (!s) return ''
            if (s === 'all') return 'All'
            const t = String(s).replace(/_/g, ' ')
            return t.charAt(0).toUpperCase() + t.slice(1)
        }
    },
    beforeDestroy() {
        clearTimeout(this.t)
    }
}
</script>

<template>
    <div class="pv-toolbar" role="region" aria-label="Filter dan Sort">
        <div class="pv-chips" role="tablist" aria-label="Kategori">
            <button v-for="c in categories" :key="c" class="pv-chip" :class="{ 'pv-chip--active': valueCategory === c }"
                role="tab" @click="onCategory(c)">
                {{ labelize(c) }}
            </button>
        </div>

        <div class="pv-controls">
            <input class="pv-search" type="search" :value="localQuery" placeholder="Cari produk…"
                @input="onQueryInput($event.target.value)" aria-label="Cari produk" />

            <select class="pv-sort" :value="valueSortBy" @change="onSortBy($event.target.value)" aria-label="Urutkan">
                <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                </option>
            </select>

            <button class="pv-reset-btn pv-reset" type="button" @click="$emit('reset')" aria-label="Reset filters">
                <FaIcon :icon="['fas', 'sync']" class="icon" />
                <span class="pv-reset-label">Refresh</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
</style>