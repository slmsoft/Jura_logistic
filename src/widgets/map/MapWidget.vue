<template>
  <div class="map-container">
    <div ref="mapContainer" id="map" class="maplibre-map"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import axios from 'axios'
import { useOrdersStore } from '@entities/order/store'
import type { Order } from '@entities/order/types'

// Lazy load MapLibre GL для оптимизации начальной загрузки
let maplibregl: any = null
let mapLibreCssLoaded = false

async function loadMapLibre() {
  if (!maplibregl) {
    const module = await import('maplibre-gl')
    maplibregl = module.default
    if (!mapLibreCssLoaded) {
      // Динамически загружаем CSS
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css'
      document.head.appendChild(link)
      mapLibreCssLoaded = true
    }
  }
  return maplibregl
}

const mapContainer = ref<HTMLDivElement | null>(null)
const map = ref<any>(null)
const markers = ref<any[]>([])
const routeSourceId = 'route-source'
const routeLayerId = 'route-layer'

const store = useOrdersStore()

// Debounce функция для оптимизации обновлений
let updateMarkersTimeout: ReturnType<typeof setTimeout> | null = null
let updateRoutesTimeout: ReturnType<typeof setTimeout> | null = null

function debounceUpdateMarkers() {
  if (updateMarkersTimeout) {
    clearTimeout(updateMarkersTimeout)
  }
  updateMarkersTimeout = setTimeout(() => {
    if (map.value && map.value.loaded()) {
      updateMarkers()
      fitMapToFilteredOrders()
    }
  }, 150) // 150ms debounce
}

function debounceUpdateRoutes() {
  if (updateRoutesTimeout) {
    clearTimeout(updateRoutesTimeout)
  }
  updateRoutesTimeout = setTimeout(() => {
    if (map.value) {
      if (map.value.loaded()) {
        updateRoutes()
      } else {
        map.value.once('load', () => {
          updateRoutes()
        })
      }
    }
  }, 100) // 100ms debounce
}

onMounted(async () => {
  if (mapContainer.value) {
    // Загружаем MapLibre GL асинхронно
    const maplibregl = await loadMapLibre()
    
    map.value = new maplibregl.Map({
      container: mapContainer.value,
      style: 'https://demotiles.maplibre.org/globe.json',
      center: [37.6173, 55.7558],
      zoom: 4
    })

    map.value.on('load', () => {
      updateMarkers()
      // Маршруты будут строиться при выборе заказов
    })
  }
})

watch(() => store.filteredOrders, () => {
  debounceUpdateMarkers()
}, { deep: true })

watch(() => store.selectedOrderIds, () => {
  debounceUpdateRoutes()
}, { deep: true })

onUnmounted(() => {
  if (updateMarkersTimeout) {
    clearTimeout(updateMarkersTimeout)
  }
  if (updateRoutesTimeout) {
    clearTimeout(updateRoutesTimeout)
  }
  clearMarkers()
  if (map.value) {
    map.value.remove()
  }
})

async function updateMarkers() {
  clearMarkers()

  if (!map.value) return
  
  const maplibregl = await loadMapLibre()

  store.filteredOrders.forEach((order) => {
    // Pickup marker
    const pickupEl = createMarkerElement('pickup')
    const pickupMarker = new maplibregl.Marker({
      element: pickupEl,
      anchor: 'bottom'
    })
      .setLngLat([order.pickup.lng, order.pickup.lat])
      .setPopup(createPopup(order, 'pickup', maplibregl))
      .addTo(map.value!)

    markers.value.push(pickupMarker)

    // Delivery marker
    const deliveryEl = createMarkerElement('delivery')
    const deliveryMarker = new maplibregl.Marker({
      element: deliveryEl,
      anchor: 'bottom'
    })
      .setLngLat([order.delivery.lng, order.delivery.lat])
      .setPopup(createPopup(order, 'delivery', maplibregl))
      .addTo(map.value!)

    markers.value.push(deliveryMarker)
  })
}

function createMarkerElement(type: 'pickup' | 'delivery') {
  const el = document.createElement('div')
  el.className = `custom-marker custom-marker--${type}`
  
  // Используем одинаковую красную 3D иконку для всех маркеров
  el.innerHTML = `
    <div class="marker-pin">
      <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C10.477 0 6 4.477 6 10C6 17.5 16 40 16 40C16 40 26 17.5 26 10C26 4.477 21.523 0 16 0Z" fill="#FF3B30"/>
        <circle cx="16" cy="12" r="5" fill="white"/>
        <defs>
          <linearGradient id="markerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FF3B30;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#D32F2F;stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="M16 0C10.477 0 6 4.477 6 10C6 17.5 16 40 16 40C16 40 26 17.5 26 10C26 4.477 21.523 0 16 0Z" fill="url(#markerGradient)"/>
        <path d="M16 2C11.582 2 8 5.582 8 10C8 16.5 16 36 16 36C16 36 24 16.5 24 10C24 5.582 20.418 2 16 2Z" fill="#FF3B30" opacity="0.8"/>
        <circle cx="16" cy="12" r="5" fill="white"/>
        <circle cx="16" cy="12" r="3" fill="#FF3B30" opacity="0.3"/>
      </svg>
    </div>
  `
  
  return el
}

function createPopup(order: Order, type: 'pickup' | 'delivery', maplibregl: any) {
  const city = type === 'pickup' ? order.sender_city : order.receiver_city
  const locationType = type === 'pickup' ? 'Погрузка' : 'Выгрузка'
  const statusColors: Record<string, string> = {
    'Новый': '#0EBC93',
    'В пути': '#FF9800',
    'Доставлен': '#2196F3'
  }
  const statusColor = statusColors[order.status] || '#5932EA'
  
  const popup = new maplibregl.Popup({ 
    offset: 25,
    closeButton: false,
    closeOnClick: false,
    className: 'custom-popup'
  })
    .setHTML(`
      <div class="map-popup">
        <button class="popup-close-btn" data-popup-id="${order.id}-${type}">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L11 11M11 1L1 11" stroke="#484a58" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="popup-header">
          <div class="popup-type-badge popup-type-badge--${type}">
            ${locationType}
          </div>
        </div>
        <div class="popup-body">
          <h3 class="popup-title">Заказ #${order.id}</h3>
          <p class="popup-city">
            <svg class="popup-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z" fill="#b0b0b0"/>
              <path d="M8 0C5.23858 0 3 2.23858 3 5C3 8.5 8 16 8 16C8 16 13 8.5 13 5C13 2.23858 10.7614 0 8 0Z" stroke="#b0b0b0" stroke-width="1.5" fill="none"/>
            </svg>
            ${city}
          </p>
          <div class="popup-status" style="--status-color: ${statusColor}">
            <span class="popup-status-dot"></span>
            ${order.status}
          </div>
        </div>
      </div>
    `)
  
  // Добавляем обработчик клика для кнопки закрытия после создания попапа
  popup.on('open', () => {
    const closeBtn = popup.getElement()?.querySelector('.popup-close-btn')
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        popup.remove()
      })
    }
  })
  
  return popup
}

// Интерфейс для ответа OSRM API
interface OSRMRouteResponse {
  code: string
  routes: Array<{
    distance: number // расстояние в метрах
    duration: number // время в секундах
    geometry: {
      coordinates: [number, number][] // массив координат [lng, lat]
    }
  }>
}

function getRouteColorByStatus(status: string): string {
  const statusColors: Record<string, string> = {
    'Новый': '#0EBC93',      // Зеленый
    'В пути': '#FF9800',     // Оранжевый
    'Доставлен': '#2196F3'   // Синий
  }
  return statusColors[status] || '#5932EA'
}

// Функция для получения реального маршрута из OSRM API
async function getRouteFromOSRM(
  startLng: number,
  startLat: number,
  endLng: number,
  endLat: number
): Promise<{ coordinates: [number, number][], distance: number } | null> {
  try {
    // Формат координат для OSRM: lng,lat;lng,lat
    const coordinates = `${startLng},${startLat};${endLng},${endLat}`
    const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`
    
    const response = await axios.get<OSRMRouteResponse>(url)
    
    if (response.data.code === 'Ok' && response.data.routes.length > 0) {
      const route = response.data.routes[0]
      // OSRM возвращает координаты в формате [lng, lat]
      const routeCoordinates = route.geometry.coordinates as [number, number][]
      // Расстояние в метрах, преобразуем в километры
      const distanceKm = Math.round(route.distance / 1000)
      
      return {
        coordinates: routeCoordinates,
        distance: distanceKm
      }
    }
    
    return null
  } catch (error) {
    console.error('Error fetching route from OSRM:', error)
    // В случае ошибки возвращаем прямую линию как fallback
    return {
      coordinates: [[startLng, startLat], [endLng, endLat]],
      distance: 0
    }
  }
}

async function updateRoutes() {
  if (!map.value || !map.value.loaded()) {
    // Если карта еще не загружена, ждем события load
    return
  }

  const maplibregl = await loadMapLibre()
  const selectedOrders = store.selectedOrders

  // Удаляем все существующие маршруты и метки расстояний
  removeAllRoutes()

  if (selectedOrders.length === 0) {
    return
  }

  // Строим отдельный маршрут для каждого выбранного заказа
  const routePromises = selectedOrders.map(async (order) => {
    const routeId = `${routeSourceId}-${order.id}`
    const layerId = `${routeLayerId}-${order.id}`

    try {
      // Получаем реальный маршрут из OSRM API
      const routeData = await getRouteFromOSRM(
        order.pickup.lng,
        order.pickup.lat,
        order.delivery.lng,
        order.delivery.lat
      )

      if (!routeData) {
        console.error(`Failed to get route for order ${order.id}`)
        return
      }

      const { coordinates: routeCoordinates, distance } = routeData

      // Удаляем старый источник и слой, если они существуют
      try {
        if (map.value!.getLayer(layerId)) {
          map.value!.removeLayer(layerId)
        }
      } catch (e) {
        // Слой не существует
      }

      try {
        if (map.value!.getSource(routeId)) {
          map.value!.removeSource(routeId)
        }
      } catch (e) {
        // Источник не существует
      }

      // Создаем новый источник для маршрута
      map.value!.addSource(routeId, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {
            orderId: order.id,
            senderCity: order.sender_city,
            receiverCity: order.receiver_city,
            status: order.status,
            distance: distance
          },
          geometry: {
            type: 'LineString',
            coordinates: routeCoordinates
          }
        }
      })

      // Добавляем слой маршрута, если его еще нет
      if (!map.value!.getLayer(layerId)) {
        map.value!.addLayer({
          id: layerId,
          type: 'line',
          source: routeId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': getRouteColorByStatus(order.status),
            'line-width': 4,
            'line-opacity': 0.8
          }
        })
      }

      // Добавляем метку с расстоянием в середине маршрута
      const midIndex = Math.floor(routeCoordinates.length / 2)
      const midPoint = routeCoordinates[midIndex]

      // Создаем элемент для метки расстояния
      const routeColor = getRouteColorByStatus(order.status)
      const distanceEl = document.createElement('div')
      distanceEl.className = 'route-distance-label'
      distanceEl.innerHTML = `
        <div class="distance-badge">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0C5.23858 0 3 2.23858 3 5C3 8.5 8 16 8 16C8 16 13 8.5 13 5C13 2.23858 10.7614 0 8 0Z" fill="${routeColor}"/>
            <circle cx="8" cy="5" r="2" fill="white"/>
          </svg>
          <span>${distance} км</span>
        </div>
      `

      const distanceMarker = new maplibregl.Marker({
        element: distanceEl,
        anchor: 'center'
      })
        .setLngLat(midPoint)
        .addTo(map.value!)

      // Сохраняем маркер для последующего удаления
      if (!markers.value) markers.value = []
      markers.value.push(distanceMarker)
    } catch (error) {
      console.error(`Error creating route for order ${order.id}:`, error)
    }
  })

  // Ждем загрузки всех маршрутов
  await Promise.all(routePromises)

  // Автоматически подстраиваем карту под все маршруты
  if (selectedOrders.length > 0) {
    setTimeout(() => {
      fitMapToRoutes(selectedOrders)
    }, 500)
  }
}

async function fitMapToRoutes(orders: Order[]) {
  if (!map.value || orders.length === 0) return

  const maplibregl = await loadMapLibre()
  const bounds = new maplibregl.LngLatBounds()

  orders.forEach((order) => {
    bounds.extend([order.pickup.lng, order.pickup.lat])
    bounds.extend([order.delivery.lng, order.delivery.lat])
  })

  map.value.fitBounds(bounds, {
    padding: { top: 50, bottom: 50, left: 50, right: 50 },
    duration: 1000
  })
}

async function fitMapToFilteredOrders() {
  if (!map.value || !map.value.loaded()) return

  const filteredOrders = store.filteredOrders

  if (filteredOrders.length === 0) {
    // Если нет отфильтрованных заказов, возвращаемся к центру Москвы
    map.value.flyTo({
      center: [37.6173, 55.7558],
      zoom: 4,
      duration: 1000
    })
    return
  }

  const maplibregl = await loadMapLibre()
  const bounds = new maplibregl.LngLatBounds()

  filteredOrders.forEach((order) => {
    bounds.extend([order.pickup.lng, order.pickup.lat])
    bounds.extend([order.delivery.lng, order.delivery.lat])
  })

  map.value.fitBounds(bounds, {
    padding: { top: 80, bottom: 80, left: 80, right: 80 },
    duration: 1000
  })
}

function removeAllRoutes() {
  if (!map.value || !map.value.loaded()) return

  // Удаляем все маршруты для всех заказов
  const allOrders = store.orders
  allOrders.forEach((order) => {
    const routeId = `${routeSourceId}-${order.id}`
    const layerId = `${routeLayerId}-${order.id}`

    try {
      if (map.value!.getLayer(layerId)) {
        map.value!.removeLayer(layerId)
      }
    } catch (e) {
      // Слой уже удален или не существует
    }

    try {
      if (map.value!.getSource(routeId)) {
        map.value!.removeSource(routeId)
      }
    } catch (e) {
      // Источник уже удален или не существует
    }
  })
  
  // Удаляем все маркеры расстояний (они находятся в markers.value)
  // Оставляем только маркеры точек погрузки/выгрузки
  if (markers.value) {
    markers.value = markers.value.filter(marker => {
      // Проверяем, является ли маркер маркером расстояния
      const el = marker.getElement()
      if (el && el.classList.contains('route-distance-label')) {
        marker.remove()
        return false
      }
      return true
    })
  }
}

function clearMarkers() {
  markers.value.forEach(marker => marker.remove())
  markers.value = []
}
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

.maplibre-map {
  width: 100%;
  height: 100%;
}

:deep(.custom-marker) {
  cursor: pointer;
}

:deep(.marker-pin) {
  width: 32px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3));
}

:deep(.marker-pin:hover) {
  transform: scale(1.15);
  filter: drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.4));
}

:deep(.marker-pin svg) {
  width: 100%;
  height: 100%;
}

:deep(.mapboxgl-popup) {
  max-width: none !important;
}

:deep(.mapboxgl-popup-content) {
  padding: 0;
  border-radius: 24px;
  box-shadow: 0px 12px 32px rgba(0, 0, 0, 0.15);
  border: none;
  background: white;
  position: relative;
  overflow: hidden;
  min-width: 240px;
  max-width: 280px;
}

:deep(.mapboxgl-popup-tip) {
  border-top-color: white !important;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  filter: drop-shadow(0px 2px 8px rgba(89, 50, 234, 0.15));
  border-top-width: 10px !important;
  border-left-width: 10px !important;
  border-right-width: 10px !important;
}

:deep(.popup-close-btn) {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 20px;
  height: 20px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s ease;
  z-index: 10;
  padding: 0;
}

:deep(.popup-close-btn:hover) {
  opacity: 0.7;
}

:deep(.popup-close-btn svg path) {
  transition: stroke 0.2s ease;
}

:deep(.popup-close-btn:hover svg path) {
  stroke: #232323;
}

/* Скрываем стандартную кнопку закрытия MapLibre */
:deep(.mapboxgl-popup-close-button) {
  display: none !important;
}

:deep(.map-popup) {
  font-family: 'Product Sans', sans-serif;
}

:deep(.popup-header) {
  padding: 16px 20px 12px 20px;
  padding-right: 48px;
  background: transparent;
  border-bottom: none;
  position: relative;
  display: flex;
  align-items: flex-start;
}

:deep(.popup-type-badge) {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-family: 'Product Sans', sans-serif;
}

:deep(.popup-type-badge--pickup) {
  background: #e3f2fd;
  color: #2196f3;
}

:deep(.popup-type-badge--delivery) {
  background: #e8f9ee;
  color: #0ebc93;
}

:deep(.popup-body) {
  padding: 0 20px 16px 20px;
}

:deep(.popup-title) {
  font-weight: 700;
  font-size: 20px;
  color: #232323;
  margin: 0 0 10px 0;
  line-height: 1.2;
  font-family: 'Product Sans', sans-serif;
}

:deep(.popup-city) {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 400;
  font-size: 14px;
  color: #484a58;
  margin: 0 0 16px 0;
  line-height: 1.5;
  font-family: 'Product Sans', sans-serif;
}

:deep(.popup-icon) {
  color: #b0b0b0;
  flex-shrink: 0;
}

:deep(.popup-status) {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 400;
  font-size: 14px;
  color: var(--status-color, #5932ea);
  line-height: 1.4;
  padding: 10px 16px;
  background: rgba(89, 50, 234, 0.08);
  border-radius: 20px;
  margin: 0;
  font-family: 'Product Sans', sans-serif;
  width: 100%;
}

:deep(.popup-status-dot) {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--status-color, #5932ea);
  flex-shrink: 0;
}


@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
}

:deep(.route-distance-label) {
  pointer-events: none;
}

:deep(.distance-badge) {
  display: flex;
  align-items: center;
  gap: 6px;
  background: white;
  padding: 6px 10px;
  border-radius: 24px;
  box-shadow: 0px 4px 12px rgba(89, 50, 234, 0.25);
  border: 2px solid #5932EA;
  font-family: 'Product Sans', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #5932EA;
  white-space: nowrap;
  backdrop-filter: blur(10px);
}

:deep(.distance-badge svg) {
  flex-shrink: 0;
}

:deep(.distance-badge span) {
  line-height: 1;
}
</style>

