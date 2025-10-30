import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import CheckoutView from '../views/CheckoutView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/products'
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/products',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/products/:id',
      component: () => import('../views/ProductDetailView.vue')
    },
    {
      path: '/cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/checkout',
      component: CheckoutView
    },
    {
      path: '/profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      redirect: '/products'
    }
  ]
})

// Global auth guard
router.beforeEach((to, from, next) => {
  const isAuthed = store.getters['auth/isAuthenticated'] // true jika token ada

  // Kalau butuh login & belum login → redirect ke /login?redirect=...
  if (to.matched.some(rec => rec.meta.requiresAuth) && !isAuthed) {
    return next({ path: '/login', query: { redirect: to.fullPath } })
  }

  // Kalau sudah login dan menuju /login → lempar ke tujuan/produk
  if (to.path === '/login' && isAuthed) {
    const target = to.query.redirect || '/products'
    return next({ path: target })
  }

  return next()
})


export default router