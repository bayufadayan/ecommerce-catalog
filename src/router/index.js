import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/products'
    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/products',
      component: () => import('@/views/ProductsView.vue')
    },
    {
      path: '/products/:id',
      component: () => import('@/views/ProductDetailView.vue')
    },
    {
      path: '/cart',
      component: () => import('@/views/CartView.vue')
    },
    {
      path: '/profile',
      component: () => import('@/views/ProfileView.vue')
    },
    {
      path: '*',
      redirect: '/products'
    }
  ]
})
