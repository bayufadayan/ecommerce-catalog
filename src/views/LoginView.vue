<template>
    <section class="container">
        <h1 style="margin-bottom:12px;">Login</h1>
        <LoginForm />
    </section>
</template>
<script>
import LoginForm from '@/components/auth/LoginForm.vue'
export default { name: 'LoginView', components: { LoginForm } }
</script>
