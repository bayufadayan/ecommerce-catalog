<template>
  <div>
    <Navbar />
    <main class="container">
      <router-view />
    </main>
    <Toast ref="toast" />
    <FooterBar />
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue'
import FooterBar from '@/components/layout/Footer.vue'
import Toast from '@/components/common/Toast.vue'

export default {
  name: 'App',
  components: { Navbar, FooterBar, Toast }
}
</script>

<style>
html,
body,
#app {
  height: 100%;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

a.router-link-exact-active {
  font-weight: 700;
}

.container {
  max-width: 1040px;
  margin: 0 auto;
  padding: 16px;
}
</style>
