<template>
  <div class="delivery-card" :class="{ active: isActive }">
    <!-- Shipment Number -->
    <div class="shipment-header">
      <p class="shipment-label">Shipment number</p>
      <p class="shipment-number">{{ delivery.shipmentNumber }}</p>
      <p class="item-type">{{ delivery.itemType }}</p>
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
          <p class="location-street">{{ delivery.origin.street }}</p>
          <p class="location-full">{{ delivery.origin.full }}</p>
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
            <path d="M20.62 8.45C19.57 3.83 15.54 1.75 12 1.75C12 1.75 12 1.75 11.99 1.75C8.46 1.75 4.42 3.82 3.37 8.44C2.2 13.6 5.36 17.97 8.22 20.72C9.28 21.74 10.64 22.25 12 22.25C13.36 22.25 14.72 21.74 15.77 20.72C18.63 17.97 21.79 13.61 20.62 8.45ZM12 13.46C10.26 13.46 8.85 12.05 8.85 10.31C8.85 8.57 10.26 7.16 12 7.16C13.74 7.16 15.15 8.57 15.15 10.31C15.15 12.05 13.74 13.46 12 13.46Z" fill="#5251FA"/>
          </svg>
        </div>
        <div class="location-info">
          <p class="location-street">{{ delivery.destination.street }}</p>
          <p class="location-full">{{ delivery.destination.full }}</p>
        </div>
      </div>
    </div>
    
    <!-- Divider -->
    <div class="divider"></div>
    
    <!-- Client Info -->
    <div class="client-section">
      <div class="client-info">
        <p class="client-label">Client</p>
        <div class="client-details">
          <img :src="delivery.client.avatar" :alt="delivery.client.name" class="client-avatar" />
          <div>
            <p class="client-name">{{ delivery.client.name }}</p>
            <p class="client-company">{{ delivery.client.company }}</p>
          </div>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="action-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" stroke="#5932EA" stroke-width="1.5" stroke-miterlimit="10"/>
          </svg>
        </button>
        <button class="action-btn message-btn" :class="{ 'has-notification': delivery.hasNotification }">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z" stroke="#5932EA" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 8H17" stroke="#5932EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 13H13" stroke="#5932EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="delivery.hasNotification" class="notification-badge"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  delivery: {
    type: Object,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.delivery-card {
  width: 392px;
  min-height: 374px;
  background: white;
  border: 2px solid #eceef6;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  cursor: pointer;
  transition: border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

.shipment-header {
  margin-bottom: 20px;
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

.item-type {
  font-family: 'Product Sans', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #484a58;
  letter-spacing: 0.14px;
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

