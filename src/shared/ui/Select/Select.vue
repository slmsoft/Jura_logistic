<template>
  <div class="select-wrapper">
    <label v-if="label" class="select-label">{{ label }}</label>
    <select
      :value="modelValue"
      :disabled="disabled"
      class="select"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  options: Array<{ value: string; label: string }>
  label?: string
  placeholder?: string
  disabled?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.select-label {
  font-family: 'Cabin', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #b0b0b0;
}

.select-container {
  position: relative;
}

.select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #eceef6;
  border-radius: 20px;
  font-family: 'Product Sans', sans-serif;
  font-size: 14px;
  color: #232323;
  background: white;
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%239197b3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
}

/* Стилизация выпадающего списка через CSS (работает не во всех браузерах) */
.select option {
  border-radius: 20px;
  padding: 8px 12px;
}

.select:focus {
  border-color: #5932ea;
}

.select:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

/* Стилизация выпадающего списка через CSS */
.select option {
  border-radius: 20px;
  padding: 8px 12px;
  margin: 2px 0;
  background: white;
}

.select option:checked,
.select option:hover {
  background: #f7f5ff;
  color: #5932ea;
}
</style>

