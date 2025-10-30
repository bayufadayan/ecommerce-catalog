import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/assets/style/main.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faUser, faRightFromBracket, faUserCircle, faBox, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faShoppingCart, faUser, faRightFromBracket, faUserCircle, faBox, faChevronDown);
Vue.component('FaIcon', FontAwesomeIcon)

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