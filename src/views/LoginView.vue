<template>
    <section class="container" style="max-width:420px;">
        <h1 style="margin-bottom:12px;">Login</h1>
        <LoginForm :loading="status === 'loading'" :error="status === 'error' ? (errorMessage || 'Login gagal') : ''"
            @submit="handleSubmit" />
    </section>
</template>

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
            // cegah double submit
            if (this.status === 'loading') return
            try {
                await this.$store.dispatch('auth/login', { username, password })
                if (this.$store.state.auth.status === 'success') {
                    // fetch profile agar navbar greeting cepat muncul
                    this.$store.dispatch('profile/fetchMe').catch(() => { })
                    // redirect ke target (default /products)
                    const to = this.$route.query.redirect || '/products'
                    this.$root?.$children?.[0]?.$refs?.toast?.show?.('Login berhasil', 1500)
                    this.$router.replace(to)
                } else {
                    // fokuskan kembali ke username bila gagal
                    this.$nextTick(() => document.getElementById('username')?.focus())
                }
            } catch {
                // error sudah ditangani di store; fokus ke username
                this.$nextTick(() => document.getElementById('username')?.focus())
            }
        }
    }
}
</script>
