<script setup lang="ts">
import { Currencies, type IVacancy } from '@/components/vacancy/vacancy.model'
import { computed } from 'vue'
import CommonIcon from '@/components/common/CommonIcon.vue'

const props = defineProps<{
  vacancy: IVacancy
  currentCurrency?: Currencies
}>()

const currentCurrency = computed(() => {
  return props.vacancy.salary.currencies.find((currency) => {
    return currency.label === props.currentCurrency
  })
})

const currentPrice = computed(() =>
  currentCurrency.value?.coefficient
    ? (props.vacancy.salary.value * currentCurrency.value.coefficient).toFixed(2)
    : 'error'
)

defineEmits<{
  (e: 'hideVacancy', id: number): void
}>()
</script>

<template>
  <div class="vacancy-item">
    <div>
      <h3 class="vacancy-item__name">{{ props.vacancy.title }}</h3>
      <div class="vacancy-item__salary">
        <span class="vacancy-item__salary-value">{{ currentPrice }}</span>
        <span class="vacancy-item__salary-currency">{{ currentCurrency?.label }}</span>
      </div>
    </div>
    <button class="vacancy-item__hide-btn" @click="$emit('hideVacancy', props.vacancy.id)">
      <common-icon icon-name="close" />
    </button>
  </div>
</template>
<style scoped lang="scss">
.vacancy-item {
  display: flex;
  padding: 10px 10px 10px 20px;
  border: 2px solid var(--vt-c-white-mute);
  color: var(--vt-c-white);
  border-radius: 8px;
  &__salary {
    display: flex;
    align-items: center;
    &-value {
      font-size: 20px;
      font-weight: 500;
    }
    &-currency {
      font-size: 16px;
      margin-left: 8px;
    }
  }
  &__hide-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 24px;
    height: 24px;
    margin-left: auto;
    border: 2px solid transparent;
    border-radius: 8px;
    background: transparent;
    transition: border-color 0.15s ease;
    cursor: pointer;
    &:hover {
      border-color: var(--vt-c-white-mute);
    }
  }
}
</style>
