<script>
export default {
  name: 'App'
}
</script>

<template>
  <div id="app">
    <nav style="display:flex; gap:12px; padding:12px;">
      <router-link to="/products">Products</router-link>
      <router-link to="/cart">Cart</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/profile">Profile</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped></style>
