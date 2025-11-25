<template>
  <button
    :class="['button', `button--${variant}`, { 'button--disabled': disabled }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'outline'
  disabled?: boolean
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped>
.button {
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  font-family: 'Product Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.button--primary {
  background: #5932ea;
  color: white;
}

.button--primary:hover:not(.button--disabled) {
  background: #4a28c7;
}

.button--secondary {
  background: #f7f5ff;
  color: #5932ea;
}

.button--secondary:hover:not(.button--disabled) {
  background: #ede9ff;
}

.button--outline {
  background: transparent;
  color: #5932ea;
  border: 1px solid #5932ea;
}

.button--outline:hover:not(.button--disabled) {
  background: #f7f5ff;
}

.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

