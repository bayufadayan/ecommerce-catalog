<script>
export default {
    name: 'LoginForm',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        error: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            showPassword: false,
            credOpen: false,
            demo: {
                username: 'mor_2314',
                password: '83r5^_'
            },
            localToast: {
                show: false,
                message: '',
                timer: null
            }
        }
    },
    computed: {
        disabled() {
            return this.loading || !this.form.username || !this.form.password
        }
    },
    methods: {
        onSubmit() {
            if (this.disabled) return
            this.$emit('submit', { ...this.form })
        },
        toggleCred() {
            this.credOpen = !this.credOpen
        },
        closeCredOnOutside(e) {
            if (!this.credOpen) return
            const el = this.$refs.cred
            if (el && !el.contains(e.target)) this.credOpen = false
        },
        async copyAndToast(text, message) {
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(text)
                } else {
                    const ta = document.createElement('textarea')
                    ta.value = text
                    ta.setAttribute('readonly', '')
                    ta.style.position = 'absolute'
                    ta.style.left = '-9999px'
                    document.body.appendChild(ta)
                    ta.select()
                    document.execCommand('copy')
                    document.body.removeChild(ta)
                }
                const globalToast = this.$root?.$children?.[0]?.$refs?.toast
                if (globalToast?.show) {
                    globalToast.show(message, 1200)
                } else {
                    this.showLocalToast(message)
                }
            } catch {
                this.showLocalToast('Gagal menyalin')
            }
        },
        showLocalToast(msg) {
            clearTimeout(this.localToast.timer)
            this.localToast.message = msg
            this.localToast.show = true
            this.localToast.timer = setTimeout(() => {
                this.localToast.show = false
            }, 1300)
        }
    },
    mounted() {
        document.addEventListener('click', this.closeCredOnOutside)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.closeCredOnOutside)
        clearTimeout(this.localToast.timer)
    }
}
</script>

<template>
    <form class="form" @submit.prevent="onSubmit" novalidate>
        <!-- Error global -->
        <div v-if="error" class="alert alert--error" role="alert" aria-live="polite">
            {{ error }}
        </div>

        <!-- Username -->
        <div class="field">
            <label class="label" for="username">Username</label>
            <input id="username" v-model.trim="form.username" class="input" type="text" placeholder="username"
                autocomplete="username" :disabled="loading" autofocus />
        </div>

        <!-- Password -->
        <div class="field">
            <label class="label" for="password">Password</label>
            <div class="pw">
                <input id="password" v-model="form.password" class="input pw__input"
                    :type="showPassword ? 'text' : 'password'" placeholder="password" autocomplete="current-password"
                    :disabled="loading" />
                <button type="button" class="pw__toggle" @click="showPassword = !showPassword" :disabled="loading"
                    :aria-pressed="showPassword ? 'true' : 'false'">
                    {{ showPassword ? 'Hide' : 'Show' }}
                </button>
            </div>
        </div>

        <!-- Submit -->
        <button class="btn btn--primary" type="submit" :disabled="disabled">
            <span v-if="loading">Loading…</span>
            <span v-else>Login</span>
        </button>

        <!-- Credential dropdown -->
        <div class="cred" ref="cred">
            <button type="button" class="cred__toggle" @click.stop="toggleCred"
                :aria-expanded="credOpen ? 'true' : 'false'" aria-controls="cred-panel">
                Credential contoh
                <FaIcon :icon="credOpen ? 'chevron-down' : 'chevron-down'" class="cred__caret" />
            </button>

            <div v-show="credOpen" id="cred-panel" class="cred__panel" role="region" aria-label="Contoh credential">
                <div class="cred__row">
                    <div class="cred__label">Username</div>
                    <div class="cred__value">
                        <code>{{ demo.username }}</code>
                        <button type="button" class="cred__copy"
                            @click="copyAndToast(demo.username, 'Username disalin')"
                            :aria-label="`Salin username ${demo.username}`">
                            <FaIcon icon="copy" class="cred__copy-icon" />
                            Copy
                        </button>
                    </div>
                </div>

                <div class="cred__row">
                    <div class="cred__label">Password</div>
                    <div class="cred__value">
                        <code>{{ demo.password }}</code>
                        <button type="button" class="cred__copy"
                            @click="copyAndToast(demo.password, 'Password disalin')"
                            :aria-label="`Salin password ${demo.password}`">
                            <FaIcon icon="copy" class="cred__copy-icon" />
                            Copy
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="localToast.show" class="toast-local" role="status" aria-live="polite">
            {{ localToast.message }}
        </div>
    </form>
</template>

<style scoped>
</style>