<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Product Sans', 'Cabin', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Глобальные стили для выпадающих списков с superellipse */
select {
  border-radius: 20px !important;
}

select option {
  border-radius: 20px !important;
  padding: 8px 12px !important;
  margin: 2px 0 !important;
}

/* Стилизация для календаря (date picker) */
input[type="date"] {
  border-radius: 20px !important;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  border-radius: 20px;
  cursor: pointer;
  padding: 4px;
}

input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
  border-radius: 20px;
}

/* Стилизация для всех input элементов */
input[type="text"],
input[type="number"],
input[type="email"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="url"] {
  border-radius: 20px !important;
}

/* Стилизация для textarea */
textarea {
  border-radius: 20px !important;
}

/* Стилизация для всех кнопок */
button {
  border-radius: 20px !important;
}

/* Стилизация для всех элементов с border-radius, которые могут быть квадратными */
[class*="card"],
[class*="modal"],
[class*="popup"],
[class*="dropdown"],
[class*="menu"] {
  border-radius: 24px !important;
}

/* Специальные стили для выпадающих меню браузера */
select:focus {
  border-radius: 20px 20px 0 0 !important;
}

/* Стилизация для календаря в разных браузерах */
input[type="date"]::-webkit-datetime-edit {
  border-radius: 20px;
}

input[type="date"]::-webkit-datetime-edit-fields-wrapper {
  border-radius: 20px;
}

input[type="date"]::-webkit-datetime-edit-text {
  border-radius: 20px;
}

input[type="date"]::-webkit-datetime-edit-month-field,
input[type="date"]::-webkit-datetime-edit-day-field,
input[type="date"]::-webkit-datetime-edit-year-field {
  border-radius: 20px;
}
</style>
