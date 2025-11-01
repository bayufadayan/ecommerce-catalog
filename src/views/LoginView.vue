<script>
import { mapState } from 'vuex'
import LoginForm from '@/components/auth/LoginForm.vue'

export default {
    name: 'LoginView',
    components: { LoginForm },
    computed: {
        ...mapState('auth', ['status', 'errorMessage'])
    },
    methods: {
        async handleSubmit({ username, password }) {
            if (this.status === 'loading') return
            try {
                await this.$store.dispatch('auth/login', { username, password })
                if (this.$store.state.auth.status === 'success') {
                    this.$store.dispatch('profile/fetchMe').catch(() => { })
                    const to = this.$route.query.redirect || '/products'
                    this.$root?.$children?.[0]?.$refs?.toast?.show?.('Login berhasil', 1500)
                    this.$router.replace(to)
                } else {
                    this.$nextTick(() => document.getElementById('username')?.focus())
                }
            } catch {
                this.$nextTick(() => document.getElementById('username')?.focus())
            }
        }
    }
}
</script>

<template>
    <main class="auth auth--login">
        <section class="auth__panel">
            <header class="auth__header">
                <h1 class="auth__title">Login</h1>
                <p class="auth__subtitle">Masuk ke akun untuk melanjutkan</p>
            </header>

            <LoginForm :loading="status === 'loading'"
                :error="status === 'error' ? (errorMessage || 'Login gagal') : ''" @submit="handleSubmit" />
        </section>
    </main>
</template>

<style scoped>
</style>