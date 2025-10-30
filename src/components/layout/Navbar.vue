<script>
import { mapGetters, mapState } from 'vuex';
import LogoApp from '@/components/common/LogoApp.vue';

export default {
    name: 'NavbarView',
    components: { LogoApp },
    data() {
        return { open: false }
    },
    computed: {
        ...mapGetters('auth', ['isAuthenticated']),
        ...mapGetters('cart', ['count']),
        ...mapState('profile', ['data', 'loading']),
        greet() {
            if (this.loading) return ''
            const f = this.data && this.data.name && this.data.name.firstname
            return f ? (String(f).charAt(0).toUpperCase() + String(f).slice(1)) : ''
        },
        displayCount() {
            return this.count > 9 ? '9+' : String(this.count)
        }
    },
    methods: {
        toggleMenu() { this.open = !this.open },
        openMenu() { this.open = true },
        closeMenu() { this.open = false },
        handleOutside(e) {
            if (!this.open) return
            const el = this.$refs.menu
            if (el && !el.contains(e.target)) this.closeMenu()
        },
        onLogoutAndClose() {
            this.closeMenu()
            this.onLogout()
        },
        onLogout() {
            this.$store.dispatch('auth/logout')
            this.$router.replace('/login')
            this.$root && this.$root.$children && this.$root.$children[0] &&
                this.$root.$children[0].$refs && this.$root.$children[0].$refs.toast &&
                this.$root.$children[0].$refs.toast.show && this.$root.$children[0].$refs.toast.show('Logout berhasil', 1500)
        }
    },
    mounted() {
        document.addEventListener('click', this.handleOutside)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleOutside)
    }
}
</script>

<template>
    <header class="nav">
        <div class="brand">
            <router-link to="/products">
                <LogoApp />
            </router-link>
        </div>

        <nav class="links">
            <router-link to="/products" exact-active-class="active" class="products-link">
                <FaIcon icon="box" class="icon-products" />
                <span>Products</span>
            </router-link>

            <router-link to="/cart" class="cart-link" exact-active-class="active">
                <FaIcon icon="shopping-cart" class="icon" />
                <span v-if="count > 0" class="badge">{{ displayCount }}</span>
            </router-link>


            <template v-if="isAuthenticated">
                <!-- USER DROPDOWN -->
                <div class="btn profile" ref="menu">
                    <button class="user-trigger" @click.stop="toggleMenu" @keydown.down.prevent="openMenu"
                        @keydown.esc.prevent="closeMenu" :aria-expanded="open ? 'true' : 'false'" aria-haspopup="true">
                        <FaIcon icon="user-circle" class="user-icon" />
                        <span class="hello">Hi, {{ greet || 'Account' }}</span>
                        <span :class="{ open }">
                            <FaIcon icon="chevron-down" class="caret" />
                        </span>
                    </button>

                    <ul v-show="open" class="dropdown" role="menu">
                        <li role="none">
                            <router-link to="/profile" role="menuitem" @click.native="closeMenu">
                                Profile
                            </router-link>
                        </li>
                        <li role="none">
                            <button class="linklike" role="menuitem" @click="onLogoutAndClose">
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </template>

            <template v-else>
                <router-link to="/login" exact-active-class="active" class="btn login">Login</router-link>
            </template>
        </nav>
    </header>
</template>

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
    gap: 16px;
    align-items: center;
}

.products-link {
    background-color: #def9fd;
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    padding: 6px 16px;
}

.icon-products {
    font-size: 16px;
}

.brand a {
    font-weight: 700;
    text-decoration: none;
}

.cart-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.cart-link .icon {
    font-size: 20px;
}

.badge {
    position: absolute;
    top: -8px;
    right: -6px;
    min-width: 18px;
    width: fit-content;
    height: 18px;
    padding-inline: 2px;
    border-radius: 10px;
    display: grid;
    font-size: 11px;
    font-weight: 500;
    line-height: normal;
    color: #fff;
    background: #ef4444;
    border: 2px solid #fff;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
}


.linklike {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
}

.user-menu {
    position: relative;
}

.user-trigger {
    display: flex;
    align-items: center;
    border: none;
    background: transparent;
    cursor: pointer;
    font: inherit;
    color: white;
    font-weight: 600;
    gap: 10px;
}

.hello {
    line-height: normal;
}

.caret {
    transition: transform .15s ease;
}

.caret.open {
    transform: rotate(180deg);
}

.dropdown {
    position: absolute;
    right: 0;
    top: calc(100% + 8px);
    min-width: 160px;
    background: #fff;
    border: 1px solid #e6eaf0;
    border-radius: 10px;
    box-shadow: 0 10px 24px rgba(15, 39, 66, .12);
    padding: 6px;
    list-style: none;
    margin: 0;
    z-index: 50;
}

.dropdown li>a,
.dropdown li>.linklike {
    display: block;
    width: 100%;
    text-align: left;
    padding: 10px 12px;
    border-radius: 8px;
    text-decoration: none;
    color: #2c2c2c;
    font-weight: 600;
    background: transparent;
    border: none;
    cursor: pointer;
}

.dropdown li>a:hover,
.dropdown li>.linklike:hover {
    background: #f3f6fb;
}

.icon {
    font-size: 20px;
    vertical-align: middle;
}

.login {
    margin-left: 10px;
}

.profile {
    padding-inline: 8px;
}

.user-icon {
    font-size: 19px;
}
</style>
