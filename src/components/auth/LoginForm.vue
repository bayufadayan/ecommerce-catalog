<template>
    <form @submit.prevent>
        <div class="field">
            <label>Username</label>
            <input type="text" placeholder="username" />
        </div>
        <div class="field">
            <label>Password</label>
            <input type="password" placeholder="password" />
        </div>
        <button class="btn" type="submit">Login</button>
        <!-- placeholder untuk error -->
        <p class="error" aria-live="polite" style="margin-top:8px;"></p>
    </form>
</template>
<script>
export default { name: 'LoginForm' }
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
