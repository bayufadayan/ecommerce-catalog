<script>
import Navbar from '@/components/layout/Navbar.vue';
import FooterBar from '@/components/layout/Footer.vue';
import Toast from '@/components/common/Toast.vue';

export default {
  name: 'App',
  components: { Navbar, FooterBar, Toast }
}
</script>

<template>
  <div id="app">
    <Navbar />
    <main class="container-outside">
      <router-view />
    </main>
    <Toast ref="toast" />
    <FooterBar />
  </div>
</template>

<style scoped></style>