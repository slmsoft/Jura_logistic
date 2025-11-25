import axios from 'axios'
import type { Order } from '@entities/order/types'

const api = axios.create({
  baseURL: '/',
  timeout: 5000
})

export const ordersApi = {
  async getOrders(): Promise<Order[]> {
    const response = await api.get<Order[]>('/mock/orders.json')
    return response.data
  }
}

