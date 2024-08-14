<script setup lang="ts">
import VacancyItem from '@/components/vacancy/VacancyItem.vue'
import { Currencies, type IVacancy } from '@/components/vacancy/vacancy.model'

const props = defineProps<{
  vacancyList: IVacancy[]
  currentCurrency?: Currencies
}>()
</script>

<template>
  <div class="vacancy-list">
    <vacancy-item
      v-for="vacancy in props.vacancyList"
      :key="vacancy.id"
      :vacancy="vacancy"
      :current-currency="props.currentCurrency"
    />
    <div v-if="!props.vacancyList.length" class="vacancy-list__empty">Не найдено</div>
  </div>
</template>
<style scoped lang="scss">
.vacancy-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  transition: background 0.3s ease;
  &__empty {
    display: flex;
    justify-content: center;
    padding: 10px 10px 10px 20px;
    border: 2px solid var(--vt-c-white-mute);
    color: var(--vt-c-white);
    border-radius: 8px;
    font-size: 16px;
  }
}
</style>
