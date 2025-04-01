import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import store from '@/store'
import PortfolioView from '@/views/PortfolioView.vue'
import ServicesView from '@/views/ServicesView.vue'
import ContactView from '@/views/ContactView.vue'
import ReviewsView from '@/views/ReviewsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: PortfolioView,
    meta: { requiresAuth: true }
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { requiresAuth: true }
  },
  {
    path: '/reviews',
    name: 'reviews',
    component: ReviewsView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated

  // Если маршрут требует аутентификации и пользователь не авторизован
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Показываем уведомление
    store.dispatch('showNotification', {
      title: 'Требуется авторизация',
      message: 'Пожалуйста, войдите или зарегистрируйтесь, чтобы продолжить',
      type: 'warning',
      duration: 3000
    })
    // Перенаправляем на главную страницу
    next('/')
  } else {
    next()
  }
})

export default router
