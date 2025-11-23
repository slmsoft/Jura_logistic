<template>
  <div class="map-container">
    <div class="map-wrapper">
      <img src="https://www.figma.com/api/mcp/asset/37f3bf5c-20bc-43d7-aafd-6c18ee3d75bd" alt="Map" class="map-image" />
      
      <!-- Origin Marker -->
      <div class="map-marker origin-marker">
        <div class="marker-pin origin-pin">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="7" fill="#0EBC93"/>
          </svg>
        </div>
        <div class="marker-popup">
          <p class="marker-street">2972 Westheimer</p>
          <p class="marker-full">Rd. Santa Ana, Illinois 85486</p>
        </div>
      </div>
      
      <!-- Destination Marker -->
      <div class="map-marker destination-marker">
        <div class="marker-pin destination-pin">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#5932EA"/>
          </svg>
        </div>
        <div class="marker-popup">
          <p class="marker-street">8502 Preston</p>
          <p class="marker-full">Rd. Inglewood, Maine 98380</p>
        </div>
      </div>
      
      <!-- Route Line -->
      <svg class="route-line" width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path d="M200 200 Q500 400 800 600" stroke="#5932EA" stroke-width="3" fill="none" stroke-dasharray="10 5" opacity="0.5"/>
      </svg>
      
      <!-- Zoom Controls -->
      <div class="zoom-controls">
        <button class="zoom-btn zoom-in">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="#232323" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <button class="zoom-btn zoom-out">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16" stroke="#232323" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.map-container {
  position: absolute;
  left: 577px;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  overflow: hidden;
  background: #f0f0f0;
}

.map-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.map-marker {
  position: absolute;
  z-index: 10;
}

.origin-marker {
  top: 10%;
  left: 15%;
}

.destination-marker {
  bottom: 20%;
  right: 20%;
}

.marker-pin {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s;
}

.marker-pin:hover {
  transform: scale(1.1);
}

.origin-pin {
  background: #e8f9ee;
  box-shadow: 0px 20px 50px 0px rgba(220, 224, 249, 0.5);
}

.destination-pin {
  background: #f7f5ff;
  box-shadow: 0px 20px 50px 0px rgba(220, 224, 249, 0.5);
}

.marker-popup {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0px 20px 50px 0px rgba(220, 224, 249, 0.5);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.marker-pin:hover + .marker-popup {
  opacity: 1;
}

.marker-street {
  font-family: 'Product Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #232323;
  letter-spacing: 0.16px;
  margin-bottom: 4px;
}

.marker-full {
  font-family: 'Cabin', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #b0b0b0;
  letter-spacing: 0.12px;
}

.route-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.zoom-controls {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.zoom-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;
}

.zoom-btn:hover {
  background: #f5f5f5;
}

.zoom-in {
  border-bottom: 1px solid #eceef6;
}
</style>

