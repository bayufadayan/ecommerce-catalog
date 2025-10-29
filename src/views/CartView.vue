<template>
    <section class="container">
        <h1 style="margin-bottom:12px;">Cart</h1>

        <EmptyState v-if="items.length === 0" title="Keranjang kosong"
            description="Mulai tambahkan produk dari katalog.">
            <router-link to="/products" class="btn" style="margin-top:12px;">Ke Produk</router-link>
        </EmptyState>

        <div v-else class="card">Daftar item (placeholder)…</div>
    </section>
</template>

<script>
import EmptyState from '@/components/common/EmptyState.vue'
export default {
    name: 'CartView',
    components: { EmptyState },
    computed: {
        items() { return this.$store.state.cart.items || [] }
    }
}
</script>
