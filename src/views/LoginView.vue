<template>
    <section class="container">
        <h1 style="margin-bottom:12px;">Login</h1>
        <LoginForm :loading="status === 'loading'" :error="errorMessage" @submit="handleSubmit" />
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
            await this.$store.dispatch('auth/login', { username, password })

            if (this.$store.state.auth.status === 'success') {
                const to = this.$route.query.redirect || '/products'
                this.$router.replace(to)
                // toast sukses (jika ada)
                this.$root?.$children?.[0]?.$refs?.toast?.show?.('Login berhasil', 1500)
            } else {
                // opsional: fokuskan ulang ke username/password
                this.$nextTick(() => document.getElementById('username')?.focus())
            }
        }
    }
}
</script>
