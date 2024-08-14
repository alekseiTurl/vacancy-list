<script setup lang="ts">
import { Currencies, type ISortValue, type Range } from '@/components/vacancy/vacancy.model'
import { computed, ref } from 'vue'

const currenciesList = Currencies

const range = ref<Range>({
  from: null,
  to: null
})

const onSelectCurrencies = (event: Event) => {
  if (event.target) {
    const target = event.target as HTMLSelectElement
    emit('changeCurrency', target.value as Currencies)
  }
}

const onSearchVacancy = (event: Event) => {
  if (event.target) {
    const target = event.target as HTMLInputElement
    const val = target.value.toLowerCase()
    emit('searchVacancy', val)
  }
}

const sortBy = (event: Event) => {
  if (event.target) {
    const target = event.target as HTMLInputElement
    const val = target.value.toLowerCase()
    emit('sortVacancy', val)
  }
}

const disableAccept = computed(() => {
  return (
    range.value.from !== null &&
    range.value.from != '' &&
    range.value.to !== null &&
    range.value.to != ''
  )
})

const onSetRange = () => {
  emit('set-range', range.value)
}

const onResetRange = () => {
  range.value = {
    from: 0,
    to: 0
  }
  emit('set-range', range.value)
}
const sortValues: ISortValue[] = [
  {
    value: 'ascending',
    label: 'Ascending'
  },
  {
    value: 'descending',
    label: 'Descending'
  },
  {
    value: null,
    label: 'None'
  }
]

const emit = defineEmits<{
  (e: 'changeCurrency', currency: Currencies): void
  (e: 'searchVacancy', value: string): void
  (e: 'sortVacancy', value: string): void
  (e: 'set-range', value: Range): void
}>()
</script>

<template>
  <div class="vacancy-controllers">
    <div class="vacancy-controllers__item vacancy-controller__range">
      <div>
        <label class="vacancy-controller__range-label">From :</label>

        <input v-model="range.from" class="vacancy-controller__range-input" type="number" min="0" />
      </div>

      <div>
        <label class="vacancy-controller__range-label">To :</label>

        <input v-model="range.to" class="vacancy-controller__range-input" type="number" min="0" />
      </div>
      <button :disabled="!disableAccept" class="vacancy-controller__range-btn" @click="onSetRange">
        Accept range
      </button>
      <button class="vacancy-controller__range-btn" @click="onResetRange">Reset range</button>
    </div>

    <div class="vacancy-controllers__item vacancy-controller__name">
      <label class="vacancy-controller__name-label">Search :</label>
      <input class="vacancy-controller__name-input" type="text" @input="onSearchVacancy($event)" />
    </div>

    <div class="vacancy-controllers__item vacancy-controller__currency">
      <label class="vacancy-controller__currency-label">Currency :</label>

      <select class="vacancy-controller__currency-select" @change="onSelectCurrencies($event)">
        <option
          v-for="(currency, index) in currenciesList"
          :key="index"
          :value="currency"
          :selected="currency === currenciesList.USD"
        >
          {{ currency }}
        </option>
      </select>
    </div>

    <div class="vacancy-controllers__item vacancy-controller__sort">
      <label class="vacancy-controller__sort-label">Sort by :</label>

      <select class="vacancy-controller__sort-select" @change="sortBy($event)">
        <option v-for="(sort, index) in sortValues" :key="index" :value="sort.value">
          {{ sort.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped lang="scss">
.vacancy-controllers {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 10px;
  justify-content: space-between;
  margin-bottom: 20px;
}
.vacancy-controller__currency {
  &-label {
    padding-right: 10px;
  }
}
.vacancy-controller__sort {
  &-label {
    padding-right: 10px;
  }
}
.vacancy-controller__range {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 45%;

  &-label {
    padding-right: 10px;
  }

  &-btn {
    width: 100px;
    cursor: pointer;
  }
}
.vacancy-controller__name {
  display: flex;
  align-items: center;
  width: 45%;

  @media (max-width: 768px) {
    width: 100%;
  }
  &-label {
    margin-left: auto;
    padding-right: 10px;

    @media (max-width: 768px) {
      margin-left: 0;
    }
  }
}
</style>
