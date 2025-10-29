<template>
    <header class="nav">
        <div class="brand"><router-link to="/products">FakeStore</router-link></div>
        <nav class="links">
            <router-link to="/products">Products</router-link>
            <router-link to="/cart" class="cart-link">
                Cart <span class="badge">{{ cartCount }}</span>
            </router-link>
            <router-link to="/login">Login</router-link>
            <router-link to="/profile">Profile</router-link>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'NavbarView',
    computed: {
        cartCount() {
            return this.$store?.state?.cart?.items?.length || 0
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
    display: inline-block;
    min-width: 18px;
    padding: 2px 6px;
    font-size: 12px;
    border-radius: 12px;
    background: #111;
    color: #fff;
    text-align: center;
    margin-left: 6px;
}
</style>
