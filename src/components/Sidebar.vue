<template>
  <div class="sidebar">
    <!-- Logo -->
    <div class="logo">
      <div class="logo-icon">
        <svg width="51" height="46" viewBox="0 0 51 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M42.4254 14.9454L26.2615 23.4688C25.6108 23.8128 24.7921 23.8128 24.1203 23.4688L7.95645 14.9454C6.80189 14.3339 6.508 12.9006 7.38967 12.0024C7.99844 11.3717 8.69118 10.8557 9.4259 10.4926L20.8036 4.7594C23.2387 3.51721 27.1852 3.51721 29.6203 4.7594L40.998 10.4926C41.7327 10.8557 42.4254 11.3908 43.0342 12.0024C43.8739 12.9006 43.58 14.3339 42.4254 14.9454Z" fill="#5932EA"/>
          <path d="M23.9949 27.0223V40.0558C23.9949 41.5082 22.3785 42.4637 20.951 41.8331C16.6267 39.9029 9.34243 36.291 9.34243 36.291C6.7814 34.9723 4.68219 31.6471 4.68219 28.9142V19.0531C4.68219 17.5434 6.42453 16.5879 7.85199 17.3332L22.9453 25.3023C23.575 25.6654 23.9949 26.3152 23.9949 27.0223Z" fill="#5932EA"/>
          <path d="M26.3877 27.0223V40.0558C26.3877 41.5082 28.0041 42.4637 29.4315 41.8331C33.7559 39.9029 41.0402 36.291 41.0402 36.291C43.6012 34.9723 45.7004 31.6471 45.7004 28.9142V19.0531C45.7004 17.5434 43.958 16.5879 42.5306 17.3332L27.4373 25.3023C26.8075 25.6654 26.3877 26.3152 26.3877 27.0223Z" fill="#5932EA"/>
        </svg>
      </div>
      <span class="logo-text">track<span class="logo-text-light">ing</span></span>
    </div>
    
    <!-- Navigation Icons -->
    <div class="nav-icons">
      <div class="nav-icon" :class="{ active: route.name === 'orders' }" @click="navigateToOrders">
        <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.99093 8.97369C8.10802 8.97369 9.82426 7.41127 9.82426 5.48392C9.82426 3.55657 8.10802 1.99414 5.99093 1.99414C3.87383 1.99414 2.15759 3.55657 2.15759 5.48392C2.15759 7.41127 3.87383 8.97369 5.99093 8.97369Z" stroke="currentColor" stroke-width="1.5"/>
          <path d="M18.5862 14.9562H21.8719C23.0766 14.9562 24.0624 15.8535 24.0624 16.9503V19.9416C24.0624 21.0384 23.0766 21.9357 21.8719 21.9357H18.5862C17.3814 21.9357 16.3957 21.0384 16.3957 19.9416V16.9503C16.3957 15.8535 17.3814 14.9562 18.5862 14.9562Z" stroke="currentColor" stroke-width="1.5"/>
          <path d="M13.1429 4.98535H16.0781C18.1043 4.98535 19.0462 7.26866 17.5238 8.4851L8.77286 15.4547C7.25048 16.6611 8.19239 18.9445 10.2076 18.9445H13.1429" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.00874 5.48389H6.01859" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20.24683 18.4459H20.25668" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <div class="nav-icon" :class="{ active: route.name === 'orders-table' }" @click="navigateToOrdersTable">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 8.25V18C20 21 18.21 22 16 22H8C5.79 22 4 21 4 18V8.25C4 5 5.79 4.25 8 4.25C8 4.87 8.24997 5.43 8.65997 5.84C9.06997 6.25 9.63 6.5 10.25 6.5H13.75C14.99 6.5 16 5.49 16 4.25C18.21 4.25 20 5 20 8.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16 4.25C16 5.49 14.99 6.5 13.75 6.5H10.25C9.63 6.5 9.06997 6.25 8.65997 5.84C8.24997 5.43 8 4.87 8 4.25C8 3.01 9.01 2 10.25 2H13.75C14.37 2 14.93 2.25 15.34 2.66C15.75 3.07 16 3.63 16 4.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 13H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 17H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    
    <!-- Profile Picture -->
    <div class="profile-picture">
      <img src="https://www.figma.com/api/mcp/asset/e55a753b-1587-4885-8b69-2c6915c23b0b" alt="Profile" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function navigateToOrders() {
  router.push('/')
}

function navigateToOrdersTable() {
  router.push('/orders-table')
}
</script>

<style scoped>
.sidebar {
  width: 115px;
  height: 100vh;
  background: white;
  border-right: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px 0;
  position: relative;
  z-index: 10;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
}

.logo-icon {
  width: 51px;
  height: 46px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon svg {
  width: 100%;
  height: 100%;
}

.logo-text {
  font-family: 'Product Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0.16px;
}

.logo-text-light {
  font-weight: 400;
}

.nav-icons {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
}

.nav-icon {
  width: 64px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #9197b3;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

/* Hover эффект - фон меняется на фиолетовый, иконка становится белой */
.nav-icon:hover:not(.active) {
  background-color: #5932ea;
  box-shadow: 0px 8px 12px 0px rgba(135, 145, 233, 0.3);
  color: white;
}

.nav-icon.active {
  background-color: #5932ea;
  color: white;
  box-shadow: 0px 8px 12px 0px rgba(135, 145, 233, 0.3);
}

/* При hover цвет иконки становится белым */
.nav-icon:hover:not(.active) svg path,
.nav-icon:hover:not(.active) svg circle,
.nav-icon:hover:not(.active) svg rect {
  stroke: white;
  fill: white;
}

.nav-icon:hover:not(.active) svg path[fill="currentColor"],
.nav-icon:hover:not(.active) svg path[stroke="currentColor"] {
  stroke: white;
  fill: none;
}

/* Активное состояние - белый цвет для всех элементов */
.nav-icon.active svg path,
.nav-icon.active svg circle,
.nav-icon.active svg rect {
  stroke: white;
  fill: white;
}

.nav-icon.active svg path[fill="currentColor"] {
  fill: white;
  stroke: none;
}

.nav-number {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 10px;
  font-weight: 600;
  color: inherit;
}

.profile-picture {
  width: 57px;
  height: 52px;
  border-radius: 50%;
  overflow: hidden;
  margin-top: auto;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

