<template>
    <form @submit.prevent="onSubmit">
        <div class="field">
            <label>Username</label>
            <input v-model.trim="form.username" type="text" placeholder="username" autocomplete="username" />
        </div>

        <div class="field">
            <label>Password</label>
            <input v-model="form.password" type="password" placeholder="password" autocomplete="current-password" />
        </div>

        <button class="btn" type="submit" :disabled="disabled">
            <span v-if="loading">Loading…</span>
            <span v-else>Login</span>
        </button>

        <p v-if="error" class="error" aria-live="polite" style="margin-top:8px;">{{ error }}</p>
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
            form: { username: '', password: '' }
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
            // emit ke parent: { username, password }
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

.error {
    color: #b00020;
    font-size: 14px;
}
</style>
