import { createRouter, createWebHistory } from 'vue-router'
import OrdersPage from '@pages/orders/OrdersPage.vue'
import OrdersTablePage from '@pages/orders-table/OrdersTablePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'orders',
      component: OrdersPage
    },
    {
      path: '/orders-table',
      name: 'orders-table',
      component: OrdersTablePage
    }
  ]
})

export default router

