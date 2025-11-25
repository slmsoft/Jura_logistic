<template>
  <div class="orders-table-page">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content -->
    <div class="main-content">
      <!-- Orders Table -->
      <OrdersTable 
        @orderSelected="handleOrderSelected"
        @orderEdit="handleOrderEdit"
        @navigateToMap="handleNavigateToMap"
      />
    </div>
    
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrdersStore } from '@entities/order/store'
import Sidebar from '../../components/Sidebar.vue'
import OrdersTable from '@widgets/orders-table/OrdersTable.vue'
import EditOrderModal from '@features/orders/EditOrderModal.vue'
import Toast from '@shared/ui/Toast/Toast.vue'
import type { Order } from '@entities/order/types'

const router = useRouter()

const store = useOrdersStore()
const isModalOpen = ref(false)
const selectedOrder = ref<Order | null>(null)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')
const showToast = ref(false)

onMounted(() => {
  store.fetchOrders()
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

function handleNavigateToMap(orderId: number) {
  // Переходим на страницу с картой
  router.push('/')
  // Заказ уже выделен через toggleSelection в таблице
}
</script>

<style scoped>
.orders-table-page {
  width: 100vw;
  height: 100vh;
  background-color: #f8fafb;
  position: relative;
  overflow: hidden;
}

.main-content {
  position: absolute;
  left: 115px;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 39px 30px 0 30px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 5;
}
</style>

