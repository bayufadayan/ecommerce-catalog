<template>
    <section class="container">
        <h1 style="margin-bottom:12px;">Product Detail</h1>

        <ErrorBanner v-if="error" :message="error" @retry="retry" />
        <LoadingSpinner v-else-if="loading" />

        <div v-else class="card">
            <!-- placeholder detail -->
            <div style="height:180px; background:#fafafa; border-radius:10px; margin-bottom:12px;"></div>
            <div style="font-weight:600; margin-bottom:6px;">Product Title</div>
            <div style="color:#666; margin-bottom:12px;">Category • Rating</div>
            <div style="margin-bottom:12px;">Deskripsi singkat produk (placeholder)…</div>
            <button class="btn">Tambah ke Keranjang</button>
        </div>
    </section>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorBanner from '@/components/common/ErrorBanner.vue'

export default {
    name: 'ProductDetailView',
    components: { LoadingSpinner, ErrorBanner },
    data() {
        return { loading: true, error: '' }
    },
    created() {
        // simulasi fetch detail: sukses
        setTimeout(() => { this.loading = false }, 500)
    },
    methods: {
        retry() {
            this.error = ''
            this.loading = true
            setTimeout(() => { this.loading = false }, 400)
        }
    }
}
</script>
