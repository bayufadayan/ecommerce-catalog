<template>
    <form @submit.prevent="onSubmit" novalidate>
        <div class="field">
            <label for="username">Username</label>
            <input id="username" v-model.trim="form.username" type="text" placeholder="username" autocomplete="username"
                :disabled="loading" autofocus />
        </div>

        <div class="field">
            <label for="password">Password</label>
            <div class="pw">
                <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'"
                    placeholder="password" autocomplete="current-password" :disabled="loading" />
                <button type="button" class="toggle" @click="showPassword = !showPassword" :disabled="loading">
                    {{ showPassword ? 'Hide' : 'Show' }}
                </button>
            </div>
        </div>

        <button class="btn" type="submit" :disabled="disabled">
            <span v-if="loading">Loading…</span>
            <span v-else>Login</span>
        </button>

        <p v-if="error" class="error" aria-live="polite" style="margin-top:8px;">{{ error }}</p>

        <!-- hint opsional untuk tester -->
        <details class="hint" style="margin-top:8px;">
            <summary>Credential contoh</summary>
            <code>mor_2314 / 83r5^_</code>
        </details>
    </form>
</template>

<script>
export default {
    name: 'LoginForm',
    props: {
        loading: { type: Boolean, default: false },
        error: { type: String, default: '' }
    },
    data() {
        return {
            form: { username: '', password: '' },
            showPassword: false
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
        }
    }
}
</script>

<style scoped>
.field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 10px;
}

.pw {
    display: flex;
    gap: 8px;
    align-items: center;
}

.pw input {
    flex: 1;
}

.toggle {
    background: #f3f3f3;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    padding: 6px 10px;
    cursor: pointer;
}

.btn {
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    padding: 10px 12px;
    cursor: pointer;
    background: #f8f8f8;
}

.btn:disabled {
    opacity: .6;
    cursor: not-allowed;
}

.error {
    color: #b00020;
    font-size: 14px;
}
</style>
