<template>
  <div class="delivery-card" :class="{ active: isActive, selected: isSelected }" @click="handleCardClick">
    <!-- Checkbox -->
    <div class="card-checkbox" @click.stop="toggleSelection">
      <div class="custom-checkbox" :class="{ checked: isSelected }">
        <svg v-if="isSelected" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M11.6667 3.5L5.25 9.91667L2.33333 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    
    <!-- Shipment Number -->
    <div class="shipment-header">
      <p class="shipment-label">Номер отправления</p>
      <p class="shipment-number">{{ order.id }}</p>
      <div class="shipment-meta">
        <p class="item-type">{{ order.item_type || 'Продукты питания' }}</p>
        <div class="order-info-row">
          <span class="order-date">{{ formatDate(order.date) }}</span>
          <span class="order-weight">{{ order.weight }} кг</span>
        </div>
        <span :class="['order-status-badge', `status-${getStatusClass(order.status)}`]">
          {{ order.status }}
        </span>
      </div>
    </div>
    
    <!-- Truck Image -->
    <div class="truck-image">
      <img src="https://www.figma.com/api/mcp/asset/c29c746f-bf40-46a8-97fd-35d0056a91cc" alt="Truck" />
    </div>
    
    <!-- Route -->
    <div class="route-section">
      <!-- Origin -->
      <div class="location-item origin">
        <div class="location-pin origin-pin">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="19" cy="19" r="19" fill="#E8F9EE"/>
            <circle cx="19" cy="19" r="7" fill="#0EBC93"/>
          </svg>
        </div>
        <div class="location-info">
          <p class="location-street">{{ order.sender_address?.street || `г. ${order.sender_city}` }}</p>
          <p class="location-full">{{ order.sender_address?.full || order.sender_city }}</p>
        </div>
      </div>
      
      <!-- Route Line -->
      <div class="route-line">
        <svg width="2" height="23" viewBox="0 0 2 23" fill="none">
          <path d="M1 0L1 23" stroke="#E8E8E8" stroke-width="1.5" stroke-dasharray="3 3"/>
        </svg>
      </div>
      
      <!-- Destination -->
      <div class="location-item destination">
        <div class="location-pin destination-pin">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#5932EA"/>
          </svg>
        </div>
        <div class="location-info">
          <p class="location-street">{{ order.receiver_address?.street || `г. ${order.receiver_city}` }}</p>
          <p class="location-full">{{ order.receiver_address?.full || order.receiver_city }}</p>
        </div>
      </div>
    </div>
    
    <!-- Divider -->
    <div class="divider"></div>
    
    <!-- Client Info -->
    <div class="client-section">
      <div class="client-info">
        <p class="client-label">Клиент</p>
        <div class="client-details">
          <img 
            v-if="order.client?.avatar" 
            :src="order.client.avatar" 
            :alt="order.client.name" 
            class="client-avatar" 
          />
          <div v-else class="client-avatar-placeholder">
            {{ getInitials(order.client?.name || 'Клиент') }}
          </div>
          <div>
            <p class="client-name">{{ order.client?.name || 'Не указан' }}</p>
            <p class="client-company">{{ order.client?.company || 'Не указана' }}</p>
          </div>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="action-btn" @click.stop>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" stroke="#5932EA" stroke-width="1.5" stroke-miterlimit="10"/>
          </svg>
        </button>
        <button class="action-btn message-btn" :class="{ 'has-notification': order.has_notification }" @click.stop>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z" stroke="#5932EA" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 8H17" stroke="#5932EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 13H13" stroke="#5932EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="order.has_notification" class="notification-badge"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOrdersStore } from '@entities/order/store'
import type { Order } from '@entities/order/types'

const props = defineProps<{
  order: Order
  isActive?: boolean
}>()

const emit = defineEmits<{
  click: []
  edit: [order: Order]
}>()

const store = useOrdersStore()

const isSelected = computed(() => store.selectedOrderIds.includes(props.order.id))

function toggleSelection() {
  store.toggleOrderSelection(props.order.id)
  // Небольшая задержка для обновления карты
  setTimeout(() => {
    // Маршруты обновятся автоматически через watch в MapWidget
  }, 100)
}

function handleCardClick() {
  emit('click')
  // При двойном клике открываем модалку редактирования
  emit('edit', props.order)
}

function getInitials(name: string): string {
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

function getStatusClass(status: string): string {
  const statusMap: Record<string, string> = {
    'Новый': 'new',
    'В пути': 'in-transit',
    'Доставлен': 'delivered'
  }
  return statusMap[status] || 'new'
}
</script>

<style scoped>
.delivery-card {
  width: 392px;
  min-height: 374px;
  background: white;
  border: 2px solid #eceef6;
  border-radius: 24px;
  padding: 20px;
  position: relative;
  cursor: pointer;
  transition: border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.delivery-card.selected {
  border-color: #5932ea;
  background: #f7f5ff;
}

.delivery-card:hover {
  border-color: #5932ea;
  box-shadow: 0px 8px 24px rgba(89, 50, 234, 0.3);
  transform: translateY(-2px);
}

.delivery-card.active {
  border-color: #5932ea;
  box-shadow: 0px 8px 24px rgba(89, 50, 234, 0.3);
}

.card-checkbox {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
  cursor: pointer;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #eceef6;
  border-radius: 6px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: pointer;
}

.custom-checkbox:hover {
  border-color: #5932ea;
}

.custom-checkbox.checked {
  background: #5932ea;
  border-color: #5932ea;
}

.custom-checkbox svg {
  width: 14px;
  height: 14px;
}

.shipment-header {
  margin-bottom: 20px;
  padding-left: 28px;
}

.shipment-label {
  font-family: 'Cabin', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #b0b0b0;
  letter-spacing: 0.14px;
  margin-bottom: 8px;
}

.shipment-number {
  font-family: 'Product Sans', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #232323;
  letter-spacing: 0.18px;
  margin-bottom: 4px;
}

.shipment-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
}

.item-type {
  font-family: 'Product Sans', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #484a58;
  letter-spacing: 0.14px;
}

.order-info-row {
  display: flex;
  gap: 12px;
  align-items: center;
  font-family: 'Cabin', sans-serif;
  font-size: 12px;
  color: #b0b0b0;
}

.order-date,
.order-weight {
  font-weight: 400;
}

.order-status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 8px;
  font-family: 'Cabin', sans-serif;
  font-weight: 600;
  font-size: 11px;
  width: fit-content;
  margin-top: 4px;
}

.order-status-badge.status-new {
  background: #e8f9ee;
  color: #0ebc93;
}

.order-status-badge.status-in-transit {
  background: #fff4e6;
  color: #ff9800;
}

.order-status-badge.status-delivered {
  background: #e3f2fd;
  color: #2196f3;
}

.truck-image {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 146px;
  height: 58px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.truck-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.route-section {
  margin: 20px 0;
  padding-left: 20px;
  position: relative;
}

.location-item {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  margin-bottom: 12px;
}

.location-pin {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.origin-pin {
  background: #e8f9ee;
  border-radius: 50%;
}

.destination-pin {
  background: #f7f5ff;
  border-radius: 50%;
}

.location-info {
  flex: 1;
}

.location-street {
  font-family: 'Product Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #232323;
  letter-spacing: 0.16px;
  margin-bottom: 4px;
}

.location-full {
  font-family: 'Cabin', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #b0b0b0;
  letter-spacing: 0.12px;
}

.route-line {
  display: flex;
  justify-content: center;
  margin: 8px 0;
  padding-left: 20px;
}

.divider {
  height: 1px;
  background: #eceef6;
  margin: 20px 0;
}

.client-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.client-info {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.client-label {
  font-family: 'Cabin', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #b0b0b0;
  letter-spacing: 0.14px;
}

.client-details {
  display: flex;
  align-items: center;
  gap: 13px;
}

.client-avatar {
  width: 47px;
  height: 47px;
  border-radius: 50%;
  object-fit: cover;
}

.client-avatar-placeholder {
  width: 47px;
  height: 47px;
  border-radius: 50%;
  background: #f7f5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Product Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #5932ea;
}

.client-name {
  font-family: 'Product Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #232323;
  letter-spacing: 0.16px;
  margin-bottom: 4px;
}

.client-company {
  font-family: 'Cabin', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #484a58;
  letter-spacing: 0.14px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.action-btn {
  width: 38px;
  height: 38px;
  border-radius: 9.12px;
  background: #f7f5ff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}

.action-btn:hover {
  background: #ede9ff;
}

.message-btn {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: -3px;
  right: -3px;
  width: 12px;
  height: 12px;
  background: #ff0000;
  border-radius: 50%;
  border: 2px solid white;
}
</style>

