<template>
  <div class="orders-page">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content -->
    <div class="main-content">
      <!-- Orders Cards -->
      <OrdersCards 
        @orderSelected="handleOrderSelected"
        @orderEdit="handleOrderEdit"
      />
    </div>
    
    <!-- Map -->
    <MapWidget />
    
    <!-- Edit Modal -->
    <EditOrderModal
      :is-open="isModalOpen"
      :order="selectedOrder"
      @close="closeModal"
      @saved="handleOrderSaved"
    />
    
    <!-- Toast Notification -->
    <Toast
      v-if="showToast"
      :message="toastMessage"
      :type="toastType"
      :duration="3000"
      @close="closeToast"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useOrdersStore } from '@entities/order/store'
import Sidebar from '../../components/Sidebar.vue'
import type { Order } from '@entities/order/types'

// Lazy loading для тяжелых компонентов
const OrdersCards = defineAsyncComponent(() => import('@widgets/orders-cards/OrdersCards.vue'))
const MapWidget = defineAsyncComponent(() => import('@widgets/map/MapWidget.vue'))
const EditOrderModal = defineAsyncComponent(() => import('@features/orders/EditOrderModal.vue'))
const Toast = defineAsyncComponent(() => import('@shared/ui/Toast/Toast.vue'))

const route = useRoute()
const store = useOrdersStore()
const isModalOpen = ref(false)
const selectedOrder = ref<Order | null>(null)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')
const showToast = ref(false)

function handleOrderIdFromQuery() {
  const orderIdParam = route.query.orderId
  if (orderIdParam) {
    const orderId = parseInt(orderIdParam as string, 10)
    if (!isNaN(orderId)) {
      // Очищаем все выделения и выделяем только нужный заказ
      store.selectedOrderIds = []
      const order = store.orders.find(o => o.id === orderId)
      if (order) {
        store.toggleOrderSelection(orderId)
      }
    }
  }
}

onMounted(() => {
  store.fetchOrders().then(() => {
    // Проверяем query параметр для выделения заказа после загрузки
    handleOrderIdFromQuery()
  })
  
  // Если заказы уже загружены, сразу обрабатываем query
  if (store.orders.length > 0) {
    handleOrderIdFromQuery()
  }
})

// Отслеживаем изменения query параметра
watch(() => route.query.orderId, () => {
  handleOrderIdFromQuery()
})

// Отслеживаем загрузку заказов
watch(() => store.orders.length, () => {
  if (store.orders.length > 0 && route.query.orderId) {
    handleOrderIdFromQuery()
  }
})

function handleOrderSelected(order: Order) {
  // Можно использовать для других действий
}

function handleOrderEdit(order: Order) {
  // Находим актуальный заказ из store, чтобы получить свежие данные
  const currentOrder = store.orders.find(o => o.id === order.id)
  if (currentOrder) {
    selectedOrder.value = currentOrder
    isModalOpen.value = true
  }
}

function closeModal() {
  isModalOpen.value = false
  selectedOrder.value = null
}

function handleOrderSaved() {
  // Показываем тост-уведомление об успешном сохранении
  toastMessage.value = `Заказ #${selectedOrder.value?.id} успешно обновлен`
  toastType.value = 'success'
  showToast.value = true
}

function closeToast() {
  showToast.value = false
}
</script>

<style scoped>
.orders-page {
  width: 100vw;
  height: 100vh;
  background-color: #f8fafb;
  position: relative;
  overflow: hidden;
}

.main-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 577px;
  height: 100vh;
  padding: 39px 0 0 145px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 5;
}

.content-header {
  margin-bottom: 24px;
}

.page-title {
  font-family: 'Product Sans', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: normal;
  color: #000000;
  letter-spacing: 0.2px;
}
</style>

