<template>
    <section class="container">
        <button class="linklike" @click="$router.back()">← Kembali</button>
        <h1 style="margin:8px 0 12px;">Profil</h1>

        <!-- ERROR -->
        <ErrorBanner v-if="error" :message="error" @retry="retry" />

        <!-- LOADING -->
        <LoadingSpinner v-else-if="loading" />

        <!-- EMPTY -->
        <EmptyState v-else-if="!profile" title="Profil tidak tersedia"
            description="Silakan muat ulang atau login kembali.">
            <button class="btn" @click="retry" style="margin-top:12px;">Muat Ulang</button>
        </EmptyState>

        <!-- CONTENT -->
        <div v-else class="pf">
            <!-- Kiri: data utama -->
            <div class="panel">
                <div class="head">
                    <div class="avatar">{{ initials }}</div>
                    <div class="ident">
                        <div class="name">{{ fullName }}</div>
                        <div class="uname">@{{ username }}</div>
                    </div>
                </div>

                <div class="grid">
                    <div class="item">
                        <div class="label">Email</div>
                        <div class="value">{{ email || '—' }}</div>
                    </div>
                    <div class="item">
                        <div class="label">Telepon</div>
                        <div class="value">{{ phone || '—' }}</div>
                    </div>
                    <div class="item span2">
                        <div class="label">Alamat</div>
                        <div class="value">
                            <div>{{ address.street || '—' }}</div>
                            <div>{{ address.city || '' }} <span v-if="address.zipcode">({{ address.zipcode }})</span>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">Latitude</div>
                        <div class="value">{{ geo?.lat || '—' }}</div>
                    </div>
                    <div class="item">
                        <div class="label">Longitude</div>
                        <div class="value">{{ geo?.long || '—' }}</div>
                    </div>
                </div>

                <div class="actions">
                    <button class="btn" @click="retry">Muat Ulang</button>
                    <!-- Tombol Edit/Save akan ditambahkan di Step 5 -->
                </div>
            </div>

            <!-- Kanan: ringkasan (opsional) -->
            <aside class="panel side">
                <div class="line"><span>Nama</span><strong>{{ fullName }}</strong></div>
                <div class="line"><span>Username</span><strong>@{{ username }}</strong></div>
                <div class="line"><span>Email</span><strong>{{ email || '—' }}</strong></div>
                <div class="line"><span>Phone</span><strong>{{ phone || '—' }}</strong></div>
            </aside>
        </div>
    </section>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorBanner from '@/components/common/ErrorBanner.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'ProfileView',
    components: { LoadingSpinner, ErrorBanner, EmptyState },
    computed: {
        ...mapState('profile', ['data', 'loading', 'error']),
        ...mapGetters('profile', ['fullName', 'email', 'username', 'phone', 'geo']),
        profile() { return this.data },
        address() { return this.profile?.address || {} },
        initials() {
            const n = (this.fullName || '').trim()
            const parts = n.split(/\s+/).filter(Boolean)
            const a = parts[0]?.[0] || ''
            const b = parts[1]?.[0] || ''
            return (a + b).toUpperCase() || 'U'
        }
    },
    methods: {
        retry() {
            this.$store.dispatch('profile/fetchMe')
        }
    },
    created() {
        // auto-fetch saat masuk halaman
        this.$store.dispatch('profile/fetchMe')
    }
}
</script>

<style scoped>
.linklike {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
    font: inherit;
}

.pf {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

@media (min-width: 900px) {
    .pf {
        grid-template-columns: 2fr 1fr;
        align-items: start;
    }
}

.panel {
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 12px;
    background: #fff;
}

.head {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 12px;
}

.avatar {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    background: #111;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
}

.ident .name {
    font-size: 18px;
    font-weight: 800;
    line-height: 1.2;
}

.ident .uname {
    color: #666;
}

.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 8px;
}

.item {
    border: 1px solid #f0f0f0;
    border-radius: 10px;
    padding: 10px;
    background: #fafafa;
}

.item.span2 {
    grid-column: span 2;
}

.label {
    font-size: 12px;
    color: #777;
    margin-bottom: 4px;
}

.value {
    font-weight: 600;
}

.actions {
    margin-top: 12px;
    display: flex;
    gap: 10px;
}

.btn {
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    padding: 8px 12px;
    cursor: pointer;
    background: #f8f8f8;
}

.btn:hover {
    background: #f1f1f1;
}

.side {
    position: sticky;
    top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.line {
    display: flex;
    justify-content: space-between;
}
</style>
