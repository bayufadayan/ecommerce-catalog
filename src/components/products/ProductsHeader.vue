<template>
    <div class="ph">
        <!-- Kategori -->
        <label class="row">
            <span class="lbl">Kategori</span>
            <select class="ctl" :value="valueCategory" @change="onCategory($event.target.value)">
                <option v-for="c in categories" :key="c" :value="c">
                    {{ labelize(c) }}
                </option>
            </select>
        </label>

        <!-- Search -->
        <label class="row">
            <span class="lbl">Cari</span>
            <input class="ctl" type="search" :value="valueQuery" placeholder="cari judul / deskripsi…"
                @input="onQuery($event.target.value)" />
        </label>

        <!-- Sort -->
        <label class="row">
            <span class="lbl">Urutkan</span>
            <select class="ctl" :value="valueSortBy" @change="onSortBy($event.target.value)">
                <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                </option>
            </select>
        </label>

        <!-- Reset -->
        <button class="btn reset" type="button" @click="$emit('reset')">Reset</button>
    </div>
</template>

<script>
import { SORT_OPTIONS } from '@/constants/products-filters'

export default {
    name: 'ProductsHeader',
    props: {
        categories: { type: Array, default: () => ['all'] },   // ex: ['all','electronics','jewelery',...]
        valueCategory: { type: String, default: 'all' },       // v-model:category
        valueQuery: { type: String, default: '' },             // v-model:query
        valueSortBy: { type: String, default: 'relevance' }    // v-model:sortBy
    },
    data() {
        return { sortOptions: SORT_OPTIONS }
    },
    methods: {
        onCategory(v) { this.$emit('update:category', v) },
        onQuery(v) { this.$emit('update:query', v) },
        onSortBy(v) { this.$emit('update:sortBy', v) },
        labelize(s) {
            if (!s) return ''
            if (s === 'all') return 'All'
            // ubah 'men\'s clothing' → "Men’s clothing", 'electronics' → 'Electronics'
            const t = String(s).replace(/_/g, ' ')
            return t.charAt(0).toUpperCase() + t.slice(1)
        }
    }
}
</script>

<style scoped>
.ph {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 12px;
    margin-bottom: 12px;
    background: #fff;
}

@media (min-width: 768px) {
    .ph {
        grid-template-columns: 1fr 1fr 1fr auto;
        align-items: end;
    }
}

.row {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.lbl {
    font-size: 14px;
    color: #555;
}

.ctl {
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    padding: 8px 10px;
    font-size: 14px;
}

.btn.reset {
    height: 36px;
    padding: 0 12px;
    border-radius: 10px;
    border: 1px solid #e5e5e5;
    background: #f8f8f8;
    cursor: pointer;
}

.btn.reset:hover {
    background: #f1f1f1;
}
</style>
