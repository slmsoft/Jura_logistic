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
      <div class="nav-icon" :class="{ active: false }">
        <svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.7303 26.8714H5.48867C2.88083 26.8714 1.62231 25.7729 1.62231 23.5051V4.84285C1.62231 2.57504 2.8938 1.47656 5.48867 1.47656H10.7303C13.3382 1.47656 14.5967 2.57504 14.5967 4.84285V23.5051C14.5967 25.7729 13.3252 26.8714 10.7303 26.8714ZM5.48867 3.2483C3.84093 3.2483 3.56847 3.64989 3.56847 4.84285V23.5051C3.56847 24.6981 3.84093 25.0997 5.48867 25.0997H10.7303C12.3781 25.0997 12.6505 24.6981 12.6505 23.5051V4.84285C12.6505 3.64989 12.3781 3.2483 10.7303 3.2483H5.48867Z" fill="currentColor"/>
          <path d="M25.6501 16.241H20.4085C17.8006 16.241 16.5421 15.1425 16.5421 12.8747V4.84285C16.5421 2.57504 17.8136 1.47656 20.4085 1.47656H25.6501C28.258 1.47656 29.5165 2.57504 29.5165 4.84285V12.8747C29.5165 15.1425 28.245 16.241 25.6501 16.241ZM20.4085 3.24829C18.7607 3.24829 18.4883 3.64989 18.4883 4.84285V12.8747C18.4883 14.0677 18.7607 14.4693 20.4085 14.4693H25.6501C27.2979 14.4693 27.5703 14.0677 27.5703 12.8747V4.84285C27.5703 3.64989 27.2979 3.24829 25.6501 3.24829H20.4085Z" fill="currentColor"/>
          <path d="M25.6501 26.8707H20.4085C17.8006 26.8707 16.5421 25.7723 16.5421 23.5045V21.3784C16.5421 19.1106 17.8136 18.0121 20.4085 18.0121H25.6501C28.258 18.0121 29.5165 19.1106 29.5165 21.3784V23.5045C29.5165 25.7723 28.245 26.8707 25.6501 26.8707ZM20.4085 19.7838C18.7607 19.7838 18.4883 20.1854 18.4883 21.3784V23.5045C18.4883 24.6974 18.7607 25.099 20.4085 25.099H25.6501C27.2979 25.099 27.5703 24.6974 27.5703 23.5045V21.3784C27.5703 20.1854 27.2979 19.7838 25.6501 19.7838H20.4085Z" fill="currentColor"/>
        </svg>
      </div>
      
      <div class="nav-icon active">
        <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.99093 8.97369C8.10802 8.97369 9.82426 7.41127 9.82426 5.48392C9.82426 3.55657 8.10802 1.99414 5.99093 1.99414C3.87383 1.99414 2.15759 3.55657 2.15759 5.48392C2.15759 7.41127 3.87383 8.97369 5.99093 8.97369Z" stroke="white" stroke-width="1.5"/>
          <path d="M18.5862 14.9562H21.8719C23.0766 14.9562 24.0624 15.8535 24.0624 16.9503V19.9416C24.0624 21.0384 23.0766 21.9357 21.8719 21.9357H18.5862C17.3814 21.9357 16.3957 21.0384 16.3957 19.9416V16.9503C16.3957 15.8535 17.3814 14.9562 18.5862 14.9562Z" stroke="white" stroke-width="1.5"/>
          <path d="M13.1429 4.98535H16.0781C18.1043 4.98535 19.0462 7.26866 17.5238 8.4851L8.77286 15.4547C7.25048 16.6611 8.19239 18.9445 10.2076 18.9445H13.1429" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.00874 5.48389H6.01859" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20.24683 18.4459H20.25668" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <div class="nav-icon" :class="{ active: false }">
        <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.6924 10.7584V14.7468C19.6924 15.006 19.6814 15.2553 19.6486 15.4946C19.3967 18.1867 17.6553 19.5227 14.4462 19.5227H14.0081C13.7343 19.5227 13.4714 19.6424 13.3071 19.8418L11.9929 21.4371C11.4124 22.1451 10.4705 22.1451 9.89001 21.4371L8.57571 19.8418C8.43333 19.6723 8.11573 19.5227 7.87478 19.5227H7.43669C3.94288 19.5227 2.19049 18.7351 2.19049 14.7468V10.7584C2.19049 7.837 3.66907 6.25164 6.61526 6.02231C6.87812 5.9924 7.15193 5.98242 7.43669 5.98242H14.4462C17.94 5.98242 19.6924 7.57776 19.6924 10.7584Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M24.0733 6.77016V10.7585C24.0733 13.6899 22.5947 15.2653 19.6486 15.4946C19.6814 15.2553 19.6924 15.006 19.6924 14.7468V10.7585C19.6924 7.57779 17.94 5.98246 14.4462 5.98246H7.43666C7.1519 5.98246 6.87809 5.99244 6.61523 6.02235C6.86714 3.34021 8.60857 1.99414 11.8176 1.99414H18.8271C22.3209 1.99414 24.0733 3.58948 24.0733 6.77016Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.7808 13.2113H14.7906" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10.9475 13.2113H10.9573" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.1141 13.2113H7.12396" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <div class="nav-icon" :class="{ active: false }">
        <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.9048 8.22586V17.9474C21.9048 20.9386 19.9443 21.9357 17.5238 21.9357H8.76193C6.34146 21.9357 4.38098 20.9386 4.38098 17.9474V8.22586C4.38098 4.98536 6.34146 4.23755 8.76193 4.23755C8.76193 4.85574 9.03571 5.4141 9.48476 5.8229C9.93381 6.2317 10.5472 6.48098 11.2262 6.48098H15.0596C16.4176 6.48098 17.5238 5.47393 17.5238 4.23755C19.9443 4.23755 21.9048 4.98536 21.9048 8.22586Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17.5238 4.23757C17.5238 5.47395 16.4176 6.481 15.0595 6.481H11.2262C10.5471 6.481 9.93378 6.23172 9.48473 5.82292C9.03568 5.41412 8.7619 4.85576 8.7619 4.23757C8.7619 3.00119 9.86809 1.99414 11.2262 1.99414H15.0595C15.7386 1.99414 16.3519 2.24341 16.801 2.65222C17.25 3.06102 17.5238 3.61938 17.5238 4.23757Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8.7619 12.962H13.1429" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8.7619 16.9503H17.5238" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <div class="nav-icon" :class="{ active: false }">
        <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.7619 1.99414V4.98538" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17.5238 1.99414V4.98538" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3.83331 9.06348H22.4524" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M24.0952 18.9445C24.0952 19.6923 23.8652 20.4002 23.46 20.9985C22.7043 22.1551 21.3133 22.9328 19.7143 22.9328C18.6081 22.9328 17.6005 22.5639 16.8338 21.9357C16.4943 21.6765 16.1986 21.3574 15.9686 20.9985C15.5633 20.4002 15.3333 19.6923 15.3333 18.9445C15.3333 16.7409 17.2938 14.9562 19.7143 14.9562C21.0285 14.9562 22.2005 15.4846 23 16.3122C23.679 17.0201 24.0952 17.9374 24.0952 18.9445Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.0057 18.9444L19.09 19.9315L21.4228 17.9673" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M23 8.47514V16.3122C22.2005 15.4846 21.0286 14.9562 19.7143 14.9562C17.2938 14.9562 15.3333 16.7409 15.3333 18.9445C15.3333 19.6923 15.5633 20.4002 15.9686 20.9984C16.1986 21.3574 16.4943 21.6765 16.8338 21.9357H8.76189C4.92856 21.9357 3.28571 19.9415 3.28571 16.9503V8.47514C3.28571 5.4839 4.92856 3.48975 8.76189 3.48975H17.5238C21.3571 3.48975 23 5.4839 23 8.47514Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.1379 13.66H13.1478" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.08427 13.66H9.0941" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.08427 16.6512H9.0941" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <div class="nav-icon" :class="{ active: false }">
        <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.8676 21.5569C18.9038 21.8161 17.7648 21.9357 16.4286 21.9357H9.85714C8.52095 21.9357 7.3819 21.8161 6.41809 21.5569C6.65904 18.9644 9.58333 16.9204 13.1429 16.9204C16.7024 16.9204 19.6267 18.9644 19.8676 21.5569Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16.4286 1.99414H9.85716C4.38097 1.99414 2.19049 3.9883 2.19049 8.97369V14.9562C2.19049 18.7251 3.43906 20.7891 6.41811 21.5568C6.65906 18.9644 9.58335 16.9204 13.1429 16.9204C16.7024 16.9204 19.6267 18.9644 19.8676 21.5568C22.8467 20.7891 24.0952 18.7251 24.0952 14.9562V8.97369C24.0952 3.9883 21.9048 1.99414 16.4286 1.99414ZM13.1429 14.1286C10.9743 14.1286 9.22192 12.5233 9.22192 10.5491C9.22192 8.57488 10.9743 6.97954 13.1429 6.97954C15.3114 6.97954 17.0638 8.57488 17.0638 10.5491C17.0638 12.5233 15.3114 14.1286 13.1429 14.1286Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17.0638 10.5491C17.0638 12.5233 15.3114 14.1285 13.1429 14.1285C10.9743 14.1285 9.22192 12.5233 9.22192 10.5491C9.22192 8.57484 10.9743 6.97949 13.1429 6.97949C15.3114 6.97949 17.0638 8.57484 17.0638 10.5491Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <div class="nav-icon" :class="{ active: false }">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"/>
        </svg>
      </div>
    </div>
    
    <!-- Profile Picture -->
    <div class="profile-picture">
      <img src="https://www.figma.com/api/mcp/asset/e55a753b-1587-4885-8b69-2c6915c23b0b" alt="Profile" />
    </div>
  </div>
</template>

<script setup>
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
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.nav-icon:hover {
  background-color: #f5f5f5;
  transform: scale(1.05);
}

.nav-icon.active {
  background-color: #5932ea;
  color: white;
  box-shadow: 0px 8px 12px 0px rgba(135, 145, 233, 0.3);
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

