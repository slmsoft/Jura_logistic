import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'orders',
      component: () => import('@pages/orders/OrdersPage.vue')
    },
    {
      path: '/orders-table',
      name: 'orders-table',
      component: () => import('@pages/orders-table/OrdersTablePage.vue')
    }
  ]
})

export default router

