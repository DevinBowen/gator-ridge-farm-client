import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { AuthService } from '@/services/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/market',
      name: 'market',
      component: () => import('../views/MarketView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:catchAll(.*)',
      redirect: { name: 'home' }
    }
  ],
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    const authenticated = AuthService.isAuthenticated()
    if (!authenticated) {
      return next({ name: 'login' })
    }
  }
  next()
})

export default router
