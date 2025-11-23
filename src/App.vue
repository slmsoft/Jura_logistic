<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content -->
    <div class="main-content">
      <!-- Search and Title -->
      <div class="content-header">
        <div class="search-container">
          <div class="search-box">
            <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input type="text" placeholder="Search..." class="search-input" />
            <div class="filter-icon-inline">
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
        </div>
        <h1 class="page-title">Ongoing Delivery</h1>
      </div>
      
      <!-- Delivery Cards -->
      <div class="deliveries-container">
        <DeliveryCard 
          v-for="(delivery, index) in deliveries" 
          :key="delivery.id"
          :delivery="delivery"
          :is-active="index === 0"
        />
      </div>
    </div>
    
    <!-- Map -->
    <Map />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import DeliveryCard from './components/DeliveryCard.vue'
import Map from './components/Map.vue'

const deliveries = ref([
  {
    id: 1,
    shipmentNumber: 'EV-2017002346',
    itemType: 'Food Materials',
    origin: {
      street: '2972 Westheimer',
      full: 'Rd. Santa Ana, Illinois 85486'
    },
    destination: {
      street: '8502 Preston',
      full: 'Rd. Inglewood, Maine 98380'
    },
    client: {
      name: 'Darrell Steward',
      company: 'Mariene, LTD',
      avatar: 'https://www.figma.com/api/mcp/asset/e55a753b-1587-4885-8b69-2c6915c23b0b'
    },
    hasNotification: true
  },
  {
    id: 2,
    shipmentNumber: 'EV-2017003323',
    itemType: 'Food Materials',
    origin: {
      street: '2972 Westheimer',
      full: 'Rd. Santa Ana, Illinois 85486'
    },
    destination: {
      street: '8502 Preston',
      full: 'Rd. Inglewood, Maine 98380'
    },
    client: {
      name: 'Jenny Wilson',
      company: 'Food State, LTD',
      avatar: 'https://www.figma.com/api/mcp/asset/a9f0a8b5-b911-4610-94e3-8f061a97e12c'
    },
    hasNotification: false
  },
  {
    id: 3,
    shipmentNumber: 'EV-2017002312',
    itemType: 'Food Materials',
    origin: {
      street: '2972 Westheimer',
      full: 'Rd. Santa Ana, Illinois 85486'
    },
    destination: {
      street: '8502 Preston',
      full: 'Rd. Inglewood, Maine 98380'
    },
    client: {
      name: 'Darrell Steward',
      company: 'Mariene, LTD',
      avatar: 'https://www.figma.com/api/mcp/asset/e55a753b-1587-4885-8b69-2c6915c23b0b'
    },
    hasNotification: false
  }
])
</script>

<style scoped>
.dashboard {
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

.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-box {
  position: relative;
  width: 392px;
  height: 52px;
  background: white;
  border: 1px solid #eceef6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  gap: 10px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
}

.search-icon {
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-family: 'Product Sans', sans-serif;
  font-size: 16px;
  color: #232323;
  background: transparent;
}

.search-input::placeholder {
  color: #c4c4c4;
  font-family: 'Product Sans', sans-serif;
  font-weight: 400;
}

.filter-icon-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: auto;
}

.page-title {
  font-family: 'Product Sans', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: normal;
  color: #000000;
  letter-spacing: 0.2px;
  margin-top: 20px;
}

.deliveries-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 40px;
  padding-right: 30px;
}
</style>

