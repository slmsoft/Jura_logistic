import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Order, OrderFilters } from './types'
import { ordersApi } from '@shared/lib/api'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>([])
  const loading = ref(false)
  const selectedOrderIds = ref<number[]>([])
  const filters = ref<OrderFilters>({})

  const filteredOrders = computed(() => {
    let result = [...orders.value]

    if (filters.value.status) {
      result = result.filter(order => order.status === filters.value.status)
    }

    if (filters.value.city) {
      const cityLower = filters.value.city.toLowerCase()
      result = result.filter(
        order =>
          order.sender_city.toLowerCase().includes(cityLower) ||
          order.receiver_city.toLowerCase().includes(cityLower)
      )
    }

    if (filters.value.dateFrom) {
      result = result.filter(order => order.date >= filters.value.dateFrom!)
    }

    if (filters.value.dateTo) {
      result = result.filter(order => order.date <= filters.value.dateTo!)
    }

    return result
  })

  const selectedOrders = computed(() => {
    return orders.value.filter(order => selectedOrderIds.value.includes(order.id))
  })

  async function fetchOrders() {
    loading.value = true
    try {
      orders.value = await ordersApi.getOrders()
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      loading.value = false
    }
  }

  function updateOrder(orderId: number, updates: Partial<Order>) {
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
      Object.assign(order, updates)
    }
  }

  function toggleOrderSelection(orderId: number) {
    const index = selectedOrderIds.value.indexOf(orderId)
    if (index > -1) {
      selectedOrderIds.value.splice(index, 1)
    } else {
      selectedOrderIds.value.push(orderId)
    }
  }

  function setFilters(newFilters: OrderFilters) {
    filters.value = { ...filters.value, ...newFilters }
  }

  function clearFilters() {
    filters.value = {}
  }

  return {
    orders,
    loading,
    selectedOrderIds,
    filters,
    filteredOrders,
    selectedOrders,
    fetchOrders,
    updateOrder,
    toggleOrderSelection,
    setFilters,
    clearFilters
  }
})

