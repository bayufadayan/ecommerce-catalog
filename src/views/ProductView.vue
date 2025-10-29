<template>
    <section class="container">
        <h1 style="margin-bottom:12px;">Products</h1>

        <!-- ERROR -->
        <ErrorBanner v-if="error" :message="error" @retry="retry" />

        <!-- LOADING -->
        <LoadingSpinner v-else-if="loading" />

        <!-- EMPTY -->
        <EmptyState v-else-if="items.length === 0" title="Belum ada produk"
            description="Coba perbarui atau ganti filter.">
            <button class="btn" @click="retry" style="margin-top:12px;">Muat Ulang</button>
        </EmptyState>

        <!-- CONTENT PLACEHOLDER -->
        <div v-else class="grid">
            <div v-for="n in 8" :key="n" class="card">Product card placeholder #{{ n }}</div>
        </div>
    </section>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorBanner from '@/components/common/ErrorBanner.vue'
import EmptyState from '@/components/common/EmptyState.vue'

export default {
    name: 'ProductsView',
    components: { LoadingSpinner, ErrorBanner, EmptyState },
    data() {
        return {
            loading: true,
            error: '',
            items: []
        }
    },
    created() {
        // simulasi fetch: sukses
        setTimeout(() => {
            this.loading = false
            this.items = new Array(8).fill(null) // nanti diganti data beneran
        }, 600)
    },
    methods: {
        retry() {
            this.error = ''
            this.loading = true
            setTimeout(() => {
                // ganti jadi simulasi gagal/sukses sesuai kebutuhan
                this.loading = false
                this.items = new Array(8).fill(null)
            }, 500)
        }
    }
}
</script>

<style scoped>
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
</style>
