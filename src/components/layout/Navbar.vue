<template>
    <header class="nav">
        <div class="brand">
            <router-link to="/products">FakeStore</router-link>
        </div>

        <nav class="links">
            <router-link to="/products" exact-active-class="active">Products</router-link>

            <router-link to="/cart" class="cart-link" exact-active-class="active">
                Cart
                <span v-if="count > 0" class="badge">{{ count }}</span>
            </router-link>

            <template v-if="isAuthenticated">
                <router-link to="/profile" exact-active-class="active">Profile</router-link>
                <button class="linklike" @click="onLogout">Logout</button>
            </template>
            <template v-else>
                <router-link to="/login" exact-active-class="active">Login</router-link>
            </template>
        </nav>
    </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'NavbarView',
    computed: {
        ...mapGetters('auth', ['isAuthenticated']),
        // gunakan getter cart/count → total QTY (bukan jumlah baris)
        ...mapGetters('cart', ['count'])
    },
    methods: {
        onLogout() {
            this.$store.dispatch('auth/logout')
            this.$router.replace('/login')
            this.$root?.$children?.[0]?.$refs?.toast?.show?.('Logout berhasil', 1500)
        }
    }
}
</script>

<style scoped>
.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 10;
}

.links {
    display: flex;
    gap: 12px;
    align-items: center;
}

.brand a {
    font-weight: 700;
    text-decoration: none;
}

.cart-link {
    position: relative;
}

.badge {
    position: absolute;
    top: -6px;
    right: -10px;
    display: inline-block;
    min-width: 18px;
    padding: 2px 6px;
    font-size: 11px;
    line-height: 1;
    border-radius: 999px;
    background: #111;
    color: #fff;
    text-align: center;
}

.linklike {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
}
</style>
