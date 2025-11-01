<template>
    <section class="container">
        <BackButton />
        <h1 class="profile-title">Profile</h1>

        <!-- ERROR -->
        <ErrorBanner v-if="error" :message="error" @retry="retry" />

        <!-- LOADING -->
        <ProfileSkeleton v-else-if="loading" />

        <!-- EMPTY -->
        <EmptyState v-else-if="!profile" title="Profil tidak tersedia"
            description="Silakan muat ulang atau login kembali.">
            <button class="btn" @click="retry" style="margin-top:12px;">Muat Ulang</button>
        </EmptyState>

        <!-- CONTENT -->
        <div v-else class="pf">
            <!-- KIRI -->
            <div class="panel">
                <div class="head">
                    <div class="avatar">{{ initials }}</div>
                    <div class="ident">
                        <div class="name">{{ effectiveFullName }}</div>
                        <div class="uname">@{{ draft.username || effective.username }}</div>
                    </div>
                </div>

                <!-- MODE VIEW -->
                <div v-if="!editing" class="grid">
                    <div class="item">
                        <div class="label">Email</div>
                        <div class="value">{{ effective.email || '—' }}</div>
                    </div>
                    <div class="item">
                        <div class="label">Telepon</div>
                        <div class="value">{{ effective.phone || '—' }}</div>
                    </div>
                    <div class="item span2">
                        <div class="label">Alamat</div>
                        <div class="value">
                            <div>{{ effective.address.street || '—' }}</div>
                            <div>
                                {{ effective.address.city || '' }}
                                <span v-if="effective.address.zipcode">({{ effective.address.zipcode }})</span>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">Latitude</div>
                        <div class="value">{{ effective.address.geolocation.lat || '—' }}</div>
                    </div>
                    <div class="item">
                        <div class="label">Longitude</div>
                        <div class="value">{{ effective.address.geolocation.long || '—' }}</div>
                    </div>
                </div>

                <!-- MODE EDIT -->
                <form v-else class="form" @submit.prevent="onSave">
                    <div class="row2">
                        <div class="field">
                            <label>First name</label>
                            <input v-model.trim="draft.firstname" type="text" class="input" />
                        </div>
                        <div class="field">
                            <label>Last name</label>
                            <input v-model.trim="draft.lastname" type="text" class="input"/>
                        </div>
                    </div>

                    <div class="row2">
                        <div class="field">
                            <label>Username</label>
                            <input v-model.trim="draft.username" type="text" class="input"/>
                        </div>
                        <div class="field">
                            <label>Email</label>
                            <input v-model.trim="draft.email" type="email" class="input" />
                        </div>
                    </div>

                    <div class="row2">
                        <div class="field">
                            <label>Telepon</label>
                            <input v-model.trim="draft.phone" type="text" class="input" />
                        </div>
                        <div class="field">
                            <label>Kode Pos</label>
                            <input v-model.trim="draft.zipcode" type="text" inputmode="numeric" pattern="[0-9]*" class="input" />
                        </div>
                    </div>

                    <div class="field">
                        <label>Jalan / Alamat</label>
                        <input v-model.trim="draft.street" type="text" class="input"/>
                    </div>

                    <div class="row2">
                        <div class="field">
                            <label>Kota</label>
                            <input v-model.trim="draft.city" type="text" class="input"/>
                        </div>
                        <div class="field">
                            <label>Negara</label>
                            <input v-model.trim="draft.country" type="text" class="input" />
                        </div>
                    </div>

                    <div class="row2">
                        <div class="field">
                            <label>Latitude</label>
                            <input v-model.trim="draft.lat" type="text" class="input"/>
                        </div>
                        <div class="field">
                            <label>Longitude</label>
                            <input v-model.trim="draft.long" type="text" class="input"/>
                        </div>
                    </div>
                </form>

                <div class="actions">
                    <template v-if="!editing">
                        <button class="btn primary" @click="startEdit">Edit</button>
                        <button class="btn" @click="retry">Muat Ulang</button>
                        <button v-if="hasOverrides" class="btn ghost" @click="onResetOverrides">Reset Perubahan</button>
                    </template>
                    <template v-else>
                        <button class="btn primary" @click="onSave">Simpan (Local)</button>
                        <button class="btn" @click="cancelEdit">Batal</button>
                        <button v-if="hasOverrides" class="btn ghost" @click="onResetOverrides">Reset Perubahan</button>
                    </template>
                </div>
            </div>

            <!-- KANAN -->
            <aside class="panel side">
                <div class="line"><span>Nama</span><strong>{{ effectiveFullName }}</strong></div>
                <div class="line"><span>Username</span><strong>@{{ draft.username || effective.username }}</strong>
                </div>
                <div class="line"><span>Email</span><strong>{{ (draft.email || effective.email) || '—' }}</strong></div>
                <div class="line"><span>Phone</span><strong>{{ (draft.phone || effective.phone) || '—' }}</strong></div>
            </aside>
        </div>
    </section>
</template>

<script>
import ErrorBanner from '@/components/common/ErrorBanner.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import BackButton from '@/components/common/BackButton.vue'
import ProfileSkeleton from '@/components/common/ProfileSkeleton.vue'
import { mapState } from 'vuex'

const OVERRIDES_KEY = 'fakestore_profile_overrides'

export default {
    name: 'ProfileView',
    components: { ErrorBanner, EmptyState, BackButton, ProfileSkeleton },
    data() {
        return {
            editing: false,
            overrides: null,
            draft: {
                firstname: '', lastname: '', username: '', email: '', phone: '',
                street: '', city: '', country: '', zipcode: '',
                lat: '', long: ''
            }
        }
    },
    computed: {
        ...mapState('profile', ['data', 'loading', 'error']),
        profile() { return this.data },

        effective() {
            const p = this.profile
            if (!p) return null
            const o = this.overrides || {}
            return {
                ...p,
                username: o.username ?? p.username,
                email: o.email ?? p.email,
                phone: o.phone ?? p.phone,
                name: {
                    ...p.name,
                    firstname: o.firstname ?? p.name?.firstname,
                    lastname: o.lastname ?? p.name?.lastname
                },
                address: {
                    ...p.address,
                    street: o.street ?? p.address?.street,
                    city: o.city ?? p.address?.city,
                    zipcode: o.zipcode ?? p.address?.zipcode,
                    country: o.country ?? p.address?.country,
                    geolocation: {
                        ...(p.address?.geolocation || {}),
                        lat: o.lat ?? p.address?.geolocation?.lat,
                        long: o.long ?? p.address?.geolocation?.long
                    }
                }
            }
        },

        initials() {
            const n = (this.effectiveFullName || '').trim()
            const [a = '', b = ''] = n.split(/\s+/)
            return ((a[0] || '') + (b[0] || '')).toUpperCase() || 'U'
        },
        effectiveFullName() {
            const f = this.draft.firstname || this.effective?.name?.firstname || ''
            const l = this.draft.lastname || this.effective?.name?.lastname || ''
            return `${cap(f)} ${cap(l)}`.trim()
        },

        hasOverrides() {
            return !!this.overrides && Object.keys(this.overrides).length > 0
        }
    },
    methods: {
        retry() { this.$store.dispatch('profile/fetchMe').then(this.loadOverrides) },

        loadOverrides() {
            try {
                const raw = localStorage.getItem(OVERRIDES_KEY)
                this.overrides = raw ? JSON.parse(raw) : null
            } catch { this.overrides = null }
            this.toDraftFromEffective()
        },
        saveOverrides() {
            try {
                localStorage.setItem(OVERRIDES_KEY, JSON.stringify(this.overrides || {}))
            } catch { /* empty */ }
        },
        clearOverrides() {
            try { localStorage.removeItem(OVERRIDES_KEY) } catch { /* empty */ }
            this.overrides = null
        },

        startEdit() {
            this.editing = true
            this.toDraftFromEffective()
        },
        cancelEdit() {
            this.editing = false
            this.toDraftFromEffective()
        },
        onSave() {
            const base = this.effective || {}
            const o = {}
            const setIfChanged = (key, current, baseVal) => {
                const val = (current ?? '').trim()
                if (val && val !== (baseVal ?? '')) o[key] = val
                else if (!val && baseVal) o[key] = '' // izinkan kosongkan
            }

            setIfChanged('firstname', this.draft.firstname, base.name?.firstname)
            setIfChanged('lastname', this.draft.lastname, base.name?.lastname)
            setIfChanged('username', this.draft.username, base.username)
            setIfChanged('email', this.draft.email, base.email)
            setIfChanged('phone', this.draft.phone, base.phone)
            setIfChanged('street', this.draft.street, base.address?.street)
            setIfChanged('city', this.draft.city, base.address?.city)
            setIfChanged('country', this.draft.country, base.address?.country)
            setIfChanged('zipcode', this.draft.zipcode, base.address?.zipcode)
            setIfChanged('lat', this.draft.lat, base.address?.geolocation?.lat)
            setIfChanged('long', this.draft.long, base.address?.geolocation?.long)

            this.overrides = { ...(this.overrides || {}), ...o }

            Object.keys(this.overrides).forEach(k => {
                if (this.overrides[k] === undefined) delete this.overrides[k]
            })

            this.saveOverrides()
            this.editing = false
            this.$root?.$children?.[0]?.$refs?.toast?.show?.('Profil disimpan lokal', 1400)
        },
        onResetOverrides() {
            this.clearOverrides()
            this.toDraftFromEffective()
            this.$root?.$children?.[0]?.$refs?.toast?.show?.('Perubahan lokal direset', 1400)
        },

        toDraftFromEffective() {
            const e = this.effective || {}
            this.draft = {
                firstname: e.name?.firstname || '',
                lastname: e.name?.lastname || '',
                username: e.username || '',
                email: e.email || '',
                phone: e.phone || '',
                street: e.address?.street || '',
                city: e.address?.city || '',
                country: e.address?.country || '',
                zipcode: e.address?.zipcode || '',
                lat: e.address?.geolocation?.lat || '',
                long: e.address?.geolocation?.long || ''
            }
        }
    },
    created() {
        // Fetch profil dulu; setelah ada → load overrides
        this.$store.dispatch('profile/fetchMe').then(this.loadOverrides)
    }
}

function cap(s) {
    if (!s) return ''
    s = String(s)
    return s.charAt(0).toUpperCase() + s.slice(1)
}

</script>
