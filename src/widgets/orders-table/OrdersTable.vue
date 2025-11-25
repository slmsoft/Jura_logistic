<template>
  <div class="orders-table-widget">
    <!-- Header -->
    <div class="page-header">
      <h1 class="page-title">Управление заказами</h1>
      <p class="page-subtitle">Просмотр и управление всеми заказами</p>
    </div>
    
    <!-- Filters -->
    <div class="filters-section">
      <div class="search-box">
        <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 12.7543 18.1045 14.9163 16.5104 16.5104C14.9163 18.1045 12.7543 19 10.5 19C8.24566 19 6.08365 18.1045 4.48959 16.5104C2.89553 14.9163 2 12.7543 2 10.5C2 8.24566 2.89553 6.08365 4.48959 4.48959C6.08365 2.89553 8.24566 2 10.5 2C12.7543 2 14.9163 2.89553 16.5104 4.48959C18.1045 6.08365 19 8.24566 19 10.5V10.5Z" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input
          v-model="cityFilter"
          type="text"
          placeholder="Поиск по ID или городу..."
          class="search-input"
          @input="handleCityFilter"
        />
        <div class="filter-icon-inline" @click="toggleFilterMenu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 6.5H16" stroke="#C4C4C4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6.5H2" stroke="#C4C4C4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z" stroke="#C4C4C4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 17.5H18" stroke="#C4C4C4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 17.5H2" stroke="#C4C4C4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z" stroke="#C4C4C4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <Transition name="filters">
        <div v-if="showFilters" class="filters-row">
          <Select
            v-model="statusFilter"
            :options="statusOptions"
            placeholder="Все статусы"
            class="filter-select"
            @update:modelValue="handleStatusFilter"
          />
          <Input
            v-model="dateFrom"
            type="date"
            placeholder="От"
            class="filter-input"
            @update:modelValue="handleDateFilter"
          />
          <Input
            v-model="dateTo"
            type="date"
            placeholder="До"
            class="filter-input"
            @update:modelValue="handleDateFilter"
          />
          <Button v-if="hasActiveFilters" variant="outline" @click="clearFilters">
            Сбросить
          </Button>
        </div>
      </Transition>
    </div>

    <!-- Table -->
    <div class="table-container">
      <table class="orders-table">
        <thead>
          <tr>
            <th class="checkbox-col">
              <input
                type="checkbox"
                :checked="allSelected"
                @change="toggleAllSelection"
              />
            </th>
            <th>ID</th>
            <th>Город отправки</th>
            <th>Город доставки</th>
            <th>Статус</th>
            <th>Дата</th>
            <th>Вес (кг)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in filteredOrders"
            :key="order.id"
            :class="{ 'selected': isSelected(order.id), 'active-row': selectedOrderId === order.id }"
            @click="handleRowClick(order)"
          >
            <td class="checkbox-col">
              <input
                type="checkbox"
                :checked="isSelected(order.id)"
                @click.stop="toggleSelection(order.id)"
              />
            </td>
            <td class="order-id-cell" @click.stop="handleOrderIdClick(order)">{{ order.id }}</td>
            <td>{{ order.sender_city }}</td>
            <td>{{ order.receiver_city }}</td>
            <td>
              <span :class="['status-badge', `status-badge--${getStatusClass(order.status)}`]">
                {{ order.status }}
              </span>
            </td>
            <td>{{ formatDate(order.date) }}</td>
            <td>{{ order.weight }}</td>
          </tr>
          <tr v-if="filteredOrders.length === 0">
            <td colspan="7" class="empty-state">Заказы не найдены</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useOrdersStore } from '@entities/order/store'
import Select from '@shared/ui/Select/Select.vue'
import Input from '@shared/ui/Input/Input.vue'
import Button from '@shared/ui/Button/Button.vue'
import type { Order } from '@entities/order/types'

const store = useOrdersStore()
const cityFilter = ref('')
const statusFilter = ref('')
const dateFrom = ref('')
const dateTo = ref('')
const selectedOrderId = ref<number | null>(null)
const showFilters = ref(false)

const statusOptions = [
  { value: 'Новый', label: 'Новый' },
  { value: 'В пути', label: 'В пути' },
  { value: 'Доставлен', label: 'Доставлен' }
]

const filteredOrders = computed(() => store.filteredOrders)

const allSelected = computed(() => {
  return filteredOrders.value.length > 0 &&
    filteredOrders.value.every(order => store.selectedOrderIds.includes(order.id))
})

const hasActiveFilters = computed(() => {
  return !!statusFilter.value || !!dateFrom.value || !!dateTo.value || !!cityFilter.value
})

function isSelected(orderId: number) {
  return store.selectedOrderIds.includes(orderId)
}

function toggleSelection(orderId: number) {
  store.toggleOrderSelection(orderId)
}

function toggleAllSelection() {
  if (allSelected.value) {
    filteredOrders.value.forEach(order => {
      const index = store.selectedOrderIds.indexOf(order.id)
      if (index > -1) {
        store.selectedOrderIds.splice(index, 1)
      }
    })
  } else {
    filteredOrders.value.forEach(order => {
      if (!store.selectedOrderIds.includes(order.id)) {
        store.selectedOrderIds.push(order.id)
      }
    })
  }
}

function handleStatusFilter(value: string) {
  statusFilter.value = value
  store.setFilters({ status: value as Order['status'] || undefined })
}

function handleCityFilter() {
  store.setFilters({ city: cityFilter.value || undefined })
}

function handleDateFilter() {
  store.setFilters({
    dateFrom: dateFrom.value || undefined,
    dateTo: dateTo.value || undefined
  })
}

function clearFilters() {
  cityFilter.value = ''
  statusFilter.value = ''
  dateFrom.value = ''
  dateTo.value = ''
  store.clearFilters()
}

function handleRowClick(order: Order) {
  selectedOrderId.value = order.id
  emit('orderSelected', order)
  // Открываем модалку редактирования при клике на строку
  emit('orderEdit', order)
}

function getStatusClass(status: string) {
  const statusMap: Record<string, string> = {
    'Новый': 'new',
    'В пути': 'in-transit',
    'Доставлен': 'delivered'
  }
  return statusMap[status] || 'new'
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU')
}

function toggleFilterMenu() {
  showFilters.value = !showFilters.value
}

const emit = defineEmits<{
  orderSelected: [order: Order]
  orderEdit: [order: Order]
  navigateToMap: [orderId: number]
}>()

function handleOrderIdClick(order: Order) {
  // Выделяем заказ
  if (!isSelected(order.id)) {
    toggleSelection(order.id)
  }
  // Переходим на страницу с картой
  emit('navigateToMap', order.id)
}
</script>

<style scoped>
.orders-table-widget {
  width: 100%;
  background: transparent;
  padding: 0;
}

.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-family: 'Product Sans', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2;
  color: #000000;
  letter-spacing: -0.5px;
  margin-bottom: 8px;
}

.page-subtitle {
  font-family: 'Cabin', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #b0b0b0;
  line-height: 1.5;
  margin: 0;
}

.filters-section {
  margin-bottom: 24px;
}

.search-box {
  position: relative;
  width: 100%;
  height: 52px;
  background: white;
  border: 1px solid #eceef7;
  border-radius: 26px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 12px;
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
  filter: drop-shadow(0px 20px 50px rgba(0, 0, 0, 0.05));
}

.search-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-family: 'Product Sans', sans-serif;
  font-size: 16px;
  color: #232323;
  background: transparent;
  padding: 0;
}

.search-input::placeholder {
  color: #c4c4c4;
  font-weight: 400;
}

.filter-icon-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: auto;
  padding: 4px;
  transition: opacity 0.2s ease;
}

.filter-icon-inline:hover {
  opacity: 0.7;
}

.filter-icon-inline svg {
  width: 24px;
  height: 24px;
}

.filters-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.filters-enter-active,
.filters-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
  overflow: hidden;
}

.filters-enter-from,
.filters-leave-to {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
}

.filter-select,
.filter-input {
  flex: 1;
  min-width: 150px;
}

.table-container {
  overflow-x: auto;
}

.orders-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
}

.orders-table thead {
  background: #f8fafb;
}

.orders-table th {
  padding: 20px 16px;
  text-align: left;
  font-family: 'Product Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #232323;
  border-bottom: 1px solid #eceef6;
  white-space: nowrap;
}

.orders-table th:first-child {
  padding-left: 20px;
}

.orders-table th:last-child {
  padding-right: 20px;
}

.orders-table td {
  padding: 20px 16px;
  font-family: 'Product Sans', sans-serif;
  font-size: 14px;
  color: #484a58;
  border-bottom: 1px solid #eceef6;
  background: white;
}

.orders-table td:first-child {
  padding-left: 20px;
}

.orders-table td:last-child {
  padding-right: 20px;
}

.orders-table tbody tr {
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.orders-table tbody tr:hover {
  background-color: #f8fafb;
}

.orders-table tbody tr:hover td {
  background-color: #f8fafb;
}

.orders-table tbody tr.selected {
  background-color: #f7f5ff;
}

.orders-table tbody tr.selected td {
  background-color: #f7f5ff;
}

.orders-table tbody tr.active-row {
  background-color: #ede9ff;
}

.orders-table tbody tr.active-row td {
  background-color: #ede9ff;
}

.orders-table tbody tr.active-row td:first-child {
  border-left: 4px solid #5932ea;
  padding-left: 16px;
}

.orders-table tbody tr:last-child td {
  border-bottom: none;
}

.checkbox-col {
  width: 50px;
  text-align: center;
  padding: 16px 8px !important;
}

.checkbox-col input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  border: 2px solid #eceef6;
  border-radius: 6px;
  background: white;
  position: relative;
  transition: all 0.2s ease;
}

.checkbox-col input[type="checkbox"]:checked {
  background: #5932EA;
  border-color: #5932EA;
}

.checkbox-col input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -60%) rotate(45deg);
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #b0b0b0;
  font-family: 'Cabin', sans-serif;
  font-size: 14px;
}

.order-id-cell {
  cursor: pointer;
  color: #5932EA;
  font-weight: 600;
  transition: color 0.2s ease;
}

.order-id-cell:hover {
  color: #7c5ce8;
  text-decoration: underline;
}

.status-badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-family: 'Cabin', sans-serif;
  font-weight: 600;
  font-size: 12px;
  white-space: nowrap;
}

.status-badge--new {
  background: #e8f9ee;
  color: #0ebc93;
}

.status-badge--in-transit {
  background: #fff4e6;
  color: #ff9800;
}

.status-badge--delivered {
  background: #e3f2fd;
  color: #2196f3;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #b0b0b0;
  font-family: 'Product Sans', sans-serif;
}
</style>

