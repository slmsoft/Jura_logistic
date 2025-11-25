<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Редактирование заказа #{{ order?.id }}</h2>
        <button class="modal-close" @click="close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="#232323" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <form class="modal-form" @submit.prevent="handleSubmit">
        <Select
          v-model="formData.status"
          :options="statusOptions"
          label="Статус"
          class="form-field"
        />

        <Input
          v-model="formData.date"
          type="date"
          label="Дата"
          class="form-field"
        />

        <Input
          v-model.number="formData.weight"
          type="number"
          label="Вес (кг)"
          placeholder="Введите вес"
          class="form-field"
        />

        <div class="modal-actions">
          <Button variant="outline" @click="close">Отмена</Button>
          <Button type="submit" variant="primary">Сохранить</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useOrdersStore } from '@entities/order/store'
import Select from '@shared/ui/Select/Select.vue'
import Input from '@shared/ui/Input/Input.vue'
import Button from '@shared/ui/Button/Button.vue'
import type { Order } from '@entities/order/types'

const props = defineProps<{
  isOpen: boolean
  order: Order | null
}>()

const emit = defineEmits<{
  close: []
  saved: []
}>()

const store = useOrdersStore()

const formData = ref({
  status: '' as Order['status'],
  date: '',
  weight: 0
})

const statusOptions = [
  { value: 'Новый', label: 'Новый' },
  { value: 'В пути', label: 'В пути' },
  { value: 'Доставлен', label: 'Доставлен' }
]

watch(() => props.order, (newOrder) => {
  if (newOrder) {
    formData.value = {
      status: newOrder.status,
      date: newOrder.date,
      weight: newOrder.weight
    }
  }
}, { immediate: true })

function close() {
  emit('close')
}

function handleSubmit() {
  if (!props.order) return

  // Валидация
  if (!formData.value.status || !formData.value.date || formData.value.weight <= 0) {
    alert('Пожалуйста, заполните все поля корректно')
    return
  }

  // Обновляем заказ в store
  store.updateOrder(props.order.id, {
    status: formData.value.status,
    date: formData.value.date,
    weight: formData.value.weight
  })
  
  emit('saved')
  close()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 30px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #eceef6;
}

.modal-title {
  font-family: 'Product Sans', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #232323;
}

.modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  transition: background 0.2s;
}

.modal-close:hover {
  background: #f5f5f5;
}

.modal-form {
  padding: 24px;
}

.form-field {
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #eceef6;
}
</style>

