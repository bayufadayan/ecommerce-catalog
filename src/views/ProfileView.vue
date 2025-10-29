<template>
    <section class="container">
        <h1 style="margin-bottom:12px;">Profile</h1>

        <ErrorBanner v-if="error" :message="error" @retry="fetchUser" />
        <LoadingSpinner v-else-if="loading" />

        <div v-else class="card">
            <div style="display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap;">
                <div style="flex:1 1 260px;">
                    <div style="font-weight:700; font-size:18px; margin-bottom:6px;">
                        {{ fullName }}
                    </div>
                    <div style="color:#666; margin-bottom:8px;">
                        Username: <strong>{{ user.username }}</strong>
                    </div>
                    <div style="margin-bottom:8px;">
                        Email: <strong>{{ user.email }}</strong>
                    </div>
                    <div style="margin-bottom:8px;">
                        Phone: <strong>{{ user.phone }}</strong>
                    </div>
                </div>

                <div style="flex:1 1 260px;">
                    <div style="font-weight:600; margin-bottom:6px;">Alamat</div>
                    <div style="color:#444;">
                        {{ addressLine }}<br />
                        {{ user.address.city }}, {{ user.address.zipcode }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorBanner from '@/components/common/ErrorBanner.vue'
import { getUser } from '@/api/users'

export default {
    name: 'ProfileView',
    components: { LoadingSpinner, ErrorBanner },
    data() {
        return {
            loading: true,
            error: '',
            user: null
        }
    },
    computed: {
        fullName() {
            const n = this.user?.name || {}
            return [n.firstname, n.lastname].filter(Boolean).join(' ')
        },
        addressLine() {
            const a = this.user?.address || {}
            return [a.number, a.street].filter(Boolean).join(' ')
        }
    },
    created() {
        this.fetchUser()
    },
    methods: {
        async fetchUser() {
            try {
                this.loading = true
                this.error = ''
                // NOTE: untuk demo pakai userId tetap 2 (cocok dengan 'mor_2314')
                const DEFAULT_USER_ID = 2
                this.user = await getUser(DEFAULT_USER_ID)
            } catch (e) {
                this.error = e?.message || 'Gagal memuat profil.'
            } finally {
                this.loading = false
            }
        }
    }
}
</script>
