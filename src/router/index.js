import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

// LAZY views
const LoginView = () => import('../views/LoginView.vue')
const ProductView = () => import('../views/ProductView.vue')
const ProductDetailView = () => import('../views/ProductDetailView.vue')
const CartView = () => import('../views/CartView.vue')
const CheckoutView = () => import('../views/CheckoutView.vue')
const ProfileView = () => import('../views/ProfileView.vue')

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/products' },
    { path: '/login', component: LoginView },
    { path: '/products', component: ProductView },
    { path: '/products/:id', component: ProductDetailView },
    { path: '/cart', component: CartView },
    { path: '/checkout', component: CheckoutView, meta: { requiresAuth: true } },
    { path: '/profile', component: ProfileView, meta: { requiresAuth: true } },
    { path: '*', redirect: '/products' }
  ]
})

// (pertahankan guard kamu; ini contoh aman)
router.beforeEach((to, from, next) => {
  const isAuthed = store.getters['auth/isAuthenticated']
  if (to.matched.some(r => r.meta.requiresAuth) && !isAuthed) {
    return next({ path: '/login', query: { redirect: to.fullPath } })
  }
  if (to.path === '/login' && isAuthed) {
    const target = to.query.redirect || '/products'
    return next(target)
  }
  next()
})

export default router
