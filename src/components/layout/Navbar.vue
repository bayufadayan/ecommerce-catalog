<script>
import { mapGetters, mapState } from 'vuex';
import LogoApp from '@/components/common/LogoApp.vue';

export default {
    name: 'NavbarView',
    components: { LogoApp },
    data() {
        return {
            open: false,
            mobileMenuOpen: false
        }
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
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen
            if (!this.mobileMenuOpen) {
                this.closeMenu()
            }
        },
        closeMobileMenu() {
            this.mobileMenuOpen = false
            this.closeMenu()
        },
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
        <div class="nav-container">
            <div class="brand">
                <router-link to="/products" @click.native="closeMobileMenu">
                    <LogoApp />
                </router-link>
            </div>

            <button class="mobile-menu-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
                <FaIcon :icon="mobileMenuOpen ? 'times' : 'bars'" class="icon" />
            </button>

            <nav :class="['links', { open: mobileMenuOpen }]">
                <router-link to="/products" exact-active-class="active" class="products-link"
                    @click.native="closeMobileMenu">
                    <FaIcon icon="box" class="icon-products" />
                    <span>Products</span>
                </router-link>

                <router-link to="/cart" class="cart-link" exact-active-class="active" @click.native="closeMobileMenu">
                    <FaIcon icon="shopping-cart" class="icon" />
                    <span v-if="count > 0" class="badge">{{ displayCount }}</span>
                </router-link>


                <template v-if="isAuthenticated">
                    <!-- USER DROPDOWN -->
                    <div class="btn profile" ref="menu">
                        <button class="user-trigger" @click.stop="toggleMenu" @keydown.down.prevent="openMenu"
                            @keydown.esc.prevent="closeMenu" :aria-expanded="open ? 'true' : 'false'"
                            aria-haspopup="true">
                            <FaIcon icon="user-circle" class="user-icon" />
                            <span class="hello">Hi, {{ greet || 'There!' }}</span>
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
                    <router-link to="/login" exact-active-class="active" class="btn login"
                        @click.native="closeMobileMenu">Login</router-link>
                </template>
            </nav>
        </div>
    </header>
</template>

<style scoped>
</style>