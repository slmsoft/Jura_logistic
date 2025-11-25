# Система управления логистическими маршрутами

Vue.js приложение для управления заказами и отслеживания доставок с интерактивной картой маршрутов.

## Демо

**Живая версия:** [https://jura-logistic.vercel.app/](https://jura-logistic.vercel.app/)

## Инструкция по запуску

### Требования

- Node.js >= 20.14.0
- npm >= 10.7.0

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`

### Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут находиться в директории `dist/`

### Предпросмотр production сборки

```bash
npm run preview
```

## Архитектура проекта

Проект использует **Feature-Sliced Design (FSD)** архитектуру для организации кода:

```
src/
├── app/                    # Инициализация приложения
│   ├── router/            # Конфигурация Vue Router
│   └── store/             # Инициализация Pinia
│
├── pages/                  # Страницы приложения
│   ├── orders/            # Страница с карточками заказов и картой
│   └── orders-table/      # Страница с таблицей заказов
│
├── widgets/                # Крупные UI блоки
│   ├── map/               # Виджет карты (MapLibre GL)
│   ├── orders-cards/      # Виджет карточек заказов
│   └── orders-table/      # Виджет таблицы заказов
│
├── features/               # Бизнес-логика
│   └── orders/            # Редактирование заказов (модалка)
│
├── entities/               # Бизнес-сущности
│   └── order/             # Сущность заказа (store, types)
│
└── shared/                 # Переиспользуемый код
    ├── ui/                # UI компоненты (Button, Input, Select, Toast)
    └── lib/               # Утилиты (API клиент)
```

### Технологический стек

- **Vue 3** с `<script setup>` и TypeScript
- **Pinia** для управления состоянием
- **Vue Router** для навигации
- **MapLibre GL JS** для интерактивных карт
- **Axios** для HTTP запросов
- **Vite** для сборки и разработки

### Оптимизации производительности

- **Code Splitting**: Роуты и тяжелые компоненты загружаются асинхронно
- **Lazy Loading**: MapLibre GL загружается только при необходимости
- **Debounce**: Оптимизация обновлений карты (150ms для маркеров, 100ms для маршрутов)
- **Chunking**: Разделение больших библиотек на отдельные chunks
- **Минификация**: Terser для production сборки

## Построение маршрутов

### Реализация

Построение маршрутов реализовано через **OSRM (Open Source Routing Machine)** API - открытый сервис для расчета маршрутов по реальным дорогам.

### Как это работает:

1. **Выбор заказов**: Пользователь выбирает заказы через чекбоксы в таблице или карточках
2. **Получение координат**: Для каждого выбранного заказа берутся координаты точек погрузки (`pickup`) и выгрузки (`delivery`)
3. **Запрос к OSRM API**: 
   ```typescript
   const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`
   ```
   - Формат координат: `lng,lat;lng,lat`
   - Тип маршрута: `driving` (автомобильный)
   - Геометрия: `geojson` формат
4. **Обработка ответа**: 
   - Извлекаются координаты маршрута (массив точек)
   - Рассчитывается расстояние (в метрах, преобразуется в километры)
5. **Отображение на карте**:
   - Создается GeoJSON источник с координатами маршрута
   - Добавляется слой линии (`line`) с цветом в зависимости от статуса заказа
   - В середине маршрута отображается метка с расстоянием

### Цвета маршрутов по статусам:

- **Новый** (`#0EBC93`) - Зеленый
- **В пути** (`#FF9800`) - Оранжевый  
- **Доставлен** (`#2196F3`) - Синий

### Особенности:

- Маршруты следуют реальным дорогам (не прямые линии)
- Отображается реальное расстояние в километрах
- Автоматическое центрирование карты на выбранных маршрутах
- Поддержка нескольких маршрутов одновременно
- Fallback на прямую линию при ошибке API

### Пример кода:

```typescript
async function getRouteFromOSRM(
  startLng: number,
  startLat: number,
  endLng: number,
  endLat: number
): Promise<{ coordinates: [number, number][], distance: number } | null> {
  const coordinates = `${startLng},${startLat};${endLng},${endLat}`
  const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`
  
  const response = await axios.get<OSRMRouteResponse>(url)
  
  if (response.data.code === 'Ok' && response.data.routes.length > 0) {
    const route = response.data.routes[0]
    return {
      coordinates: route.geometry.coordinates,
      distance: Math.round(route.distance / 1000) // км
    }
  }
  
  return null
}
```

## Структура данных

### Формат заказа:

```typescript
interface Order {
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
}
```

## Особенности UI

- **Superellipse дизайн**: Скругленные углы для всех элементов интерфейса
- **Адаптивная верстка**: Поддержка различных размеров экрана
- **Интерактивная карта**: MapLibre GL с кастомными маркерами и попапами
- **Фильтрация**: Поиск по городу, фильтры по статусу и дате
- **Редактирование**: Модальное окно для изменения заказов
- **Уведомления**: Toast-уведомления при сохранении изменений

## Лицензия

MIT
