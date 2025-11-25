export interface Order {
  id: number
  sender_city: string
  receiver_city: string
  pickup: {
    lat: number
    lng: number
  }
  delivery: {
    lat: number
    lng: number
  }
  status: 'Новый' | 'В пути' | 'Доставлен'
  date: string
  weight: number
  sender_address?: {
    street: string
    full: string
  }
  receiver_address?: {
    street: string
    full: string
  }
  item_type?: string
  client?: {
    name: string
    company: string
    avatar: string
  }
  has_notification?: boolean
}

export interface OrderFilters {
  status?: Order['status']
  dateFrom?: string
  dateTo?: string
  city?: string
}

