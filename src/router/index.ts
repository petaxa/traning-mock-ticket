import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/customer/HomeView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/customer/SearchResultsView.vue'),
    },
    {
      path: '/tickets/:id',
      name: 'ticket-detail',
      component: () => import('@/views/customer/TicketDetailView.vue'),
      props: true,
    },
    {
      path: '/tickets/:id/checkout/register',
      name: 'checkout-register',
      component: () => import('@/views/customer/CheckoutRegisterView.vue'),
      props: true,
    },
    {
      path: '/tickets/:id/checkout/payment',
      name: 'checkout-payment',
      component: () => import('@/views/customer/CheckoutPaymentView.vue'),
      props: true,
    },
    {
      path: '/tickets/:id/checkout/confirm',
      name: 'checkout-confirm',
      component: () => import('@/views/customer/CheckoutConfirmView.vue'),
      props: true,
    },
    {
      path: '/tickets/:id/pickup',
      name: 'ticket-pickup',
      component: () => import('@/views/customer/TicketPickupView.vue'),
      props: true,
    },
    {
      path: '/tickets/:id/ticket',
      redirect: (to) => ({ name: 'ticket-pickup', params: { id: to.params.id } }),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/customer/SignInView.vue'),
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import('@/views/customer/MyPageView.vue'),
    },
    {
      path: '/managed',
      name: 'managed-dashboard',
      component: () => import('@/views/managed/ManagedDashboardView.vue'),
    },
    {
      path: '/managed/events',
      name: 'managed-events',
      component: () => import('@/views/managed/ManagedEventsView.vue'),
    },
    {
      path: '/managed/orders',
      name: 'managed-orders',
      component: () => import('@/views/managed/ManagedOrdersView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
