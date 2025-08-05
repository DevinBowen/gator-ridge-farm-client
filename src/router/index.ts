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
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/market',
      name: 'market',
      component: () => import('../views/MarketView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
      meta: { requiresAuth: true }
    },
  ],
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    const authenticated = AuthService.isAuthenticated()
    if (!authenticated) {
      next({ name: 'login' })
    }
  }
  next()
})

export default router
