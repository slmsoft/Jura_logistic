<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="input"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  type?: string
  label?: string
  placeholder?: string
  disabled?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  font-family: 'Cabin', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #b0b0b0;
}

.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #eceef6;
  border-radius: 20px;
  font-family: 'Product Sans', sans-serif;
  font-size: 14px;
  color: #232323;
  background: white;
  outline: none;
  transition: border-color 0.3s;
}

/* Стилизация для date picker */
.input[type="date"] {
  position: relative;
}

.input[type="date"]::-webkit-calendar-picker-indicator {
  border-radius: 20px;
  cursor: pointer;
  padding: 4px;
  margin-left: 8px;
}

.input[type="date"]::-webkit-datetime-edit {
  border-radius: 20px;
}

.input[type="date"]::-webkit-datetime-edit-fields-wrapper {
  border-radius: 20px;
}

.input:focus {
  border-color: #5932ea;
}

.input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}
</style>

