import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/assets/style/main.css';

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

app.$mount('#app')

if (import.meta.env.DEV) {
  window.__app = app
  window.__root = app.$children[0]
}