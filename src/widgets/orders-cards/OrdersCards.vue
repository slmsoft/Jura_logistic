<template>
  <div class="orders-cards-widget">
    <h1 class="page-title">Текущие доставки</h1>
    
    <!-- Search and Filters -->
    <div class="filters-section">
      <div class="search-box">
        <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 12.7543 18.1045 14.9163 16.5104 16.5104C14.9163 18.1045 12.7543 19 10.5 19C8.24566 19 6.08365 18.1045 4.48959 16.5104C2.89553 14.9163 2 12.7543 2 10.5C2 8.24566 2.89553 6.08365 4.48959 4.48959C6.08365 2.89553 8.24566 2 10.5 2C12.7543 2 14.9163 2.89553 16.5104 4.48959C18.1045 6.08365 19 8.24566 19 10.5V10.5Z" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input
          v-model="cityFilter"
          type="text"
          placeholder="Search..."
          class="search-input"
          @input="handleCityFilter"
        />
        <div class="filter-icon-inline" :class="{ active: showFilters }" @click="toggleFilterMenu">
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
    </div>

    <div class="cards-container">
      <DeliveryCard
        v-for="(order, index) in filteredOrders"
        :key="order.id"
        :order="order"
        :is-active="index === 0"
        @click="handleCardClick(order)"
        @edit="handleCardEdit(order)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useOrdersStore } from '@entities/order/store'
import DeliveryCard from './DeliveryCard.vue'
import Select from '@shared/ui/Select/Select.vue'
import Input from '@shared/ui/Input/Input.vue'
import Button from '@shared/ui/Button/Button.vue'
import type { Order } from '@entities/order/types'

const store = useOrdersStore()

const cityFilter = ref('')
const statusFilter = ref('')
const dateFrom = ref('')
const dateTo = ref('')
const showFilters = ref(false)

const statusOptions = [
  { value: 'Новый', label: 'Новый' },
  { value: 'В пути', label: 'В пути' },
  { value: 'Доставлен', label: 'Доставлен' }
]

const filteredOrders = computed(() => store.filteredOrders)

const hasActiveFilters = computed(() => {
  return !!statusFilter.value || !!dateFrom.value || !!dateTo.value || !!cityFilter.value
})

function handleCityFilter() {
  store.setFilters({ city: cityFilter.value || undefined })
}

function handleStatusFilter(value: string) {
  statusFilter.value = value
  store.setFilters({ status: value as Order['status'] || undefined })
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

function toggleFilterMenu() {
  showFilters.value = !showFilters.value
}

const emit = defineEmits<{
  orderSelected: [order: Order]
  orderEdit: [order: Order]
}>()

function handleCardClick(order: Order) {
  emit('orderSelected', order)
}

function handleCardEdit(order: Order) {
  emit('orderEdit', order)
}
</script>

<style scoped>
.orders-cards-widget {
  width: 100%;
}

.page-title {
  font-family: 'Product Sans', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: normal;
  color: #000000;
  letter-spacing: 0.2px;
  margin-bottom: 24px;
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
  transition: all 0.2s ease;
  border-radius: 6px;
}

.filter-icon-inline:hover {
  background-color: #f5f5f5;
}

.filter-icon-inline.active {
  background-color: #f7f5ff;
}

.filter-icon-inline.active svg path {
  stroke: #5932ea;
}

.filter-icon-inline svg {
  width: 24px;
  height: 24px;
}

.filters-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  animation: slideDown 0.3s ease-out;
  overflow: hidden;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
    margin-top: 0;
  }
  to {
    opacity: 1;
    max-height: 200px;
    margin-top: 16px;
  }
}

.filter-select,
.filter-input {
  flex: 1;
  min-width: 150px;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 40px;
  padding-right: 30px;
}
</style>

