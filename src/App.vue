<script setup lang="ts">
import VacancyList from '@/components/vacancy/VacancyList.vue'
import data from '@/assets/vacancy.json'
import VacancyControllers from '@/components/vacancy/VacancyControllers.vue'
import { Currencies, type Range } from '@/components/vacancy/vacancy.model'
import { ref } from 'vue'
import AppLoader from '@/components/loader/AppLoader.vue'

const currentCurrency = ref(Currencies.USD)
const loading = ref(false)
const sortValue = ref('none')
const searchValue = ref('')

const vacancyListData = ref(data)

const changeCurrency = (currency: Currencies) => {
  loading.value = true

  const timeout = setTimeout(() => {
    currentCurrency.value = currency
    loading.value = false
    clearTimeout(timeout)
  }, 200)
}

const searchVacancy = (value: string) => {
  searchValue.value = value
  if (!value || value === '') {
    vacancyListData.value = data
    sortVacancy(sortValue.value)
    return
  }
  loading.value = true
  const timeout = setTimeout(() => {
    vacancyListData.value = [...data].filter((vacancy) => {
      return vacancy.title.toLowerCase().includes(value)
    })
    loading.value = false
    clearTimeout(timeout)
  }, 200)
}

const sortVacancy = (value: string) => {
  sortValue.value = value
  loading.value = true
  const initList = [...vacancyListData.value]
  const timeout = setTimeout(() => {
    if (value !== 'none') {
      vacancyListData.value = [...vacancyListData.value].sort((a, b) => {
        if (value === 'ascending') {
          return a.salary.value - b.salary.value
        } else if (value === 'descending') {
          return b.salary.value - a.salary.value
        } else return 0
      })
    } else if (searchValue.value !== '') {
      vacancyListData.value = initList
    } else {
      vacancyListData.value = data
    }
    loading.value = false
    clearTimeout(timeout)
  }, 200)
}

const setRange = (value: Range) => {
  loading.value = true
  const timeout = setTimeout(() => {
    if (value.from === 0 && value.to === 0) {
      vacancyListData.value = data
    } else {
      vacancyListData.value = [...vacancyListData.value].filter((vacancy) => {
        if (value.from !== null && value.to !== null) {
          return (
            Number(vacancy.salary.value) >= Number(value.from) &&
            Number(vacancy.salary.value) <= Number(value.to)
          )
        }
      })
    }

    loading.value = false
    clearTimeout(timeout)
  }, 200)
}

const hiddenVacancies = ref(new Set<number>())

const hideVacancy = (id: number) => {
  hiddenVacancies.value.add(id)
  vacancyListData.value = data.filter((vacancy) => !hiddenVacancies.value.has(vacancy.id))
}
const showHiddenVacancies = () => {
  hiddenVacancies.value.clear()
  vacancyListData.value = data
}
</script>

<template>
  <main class="main">
    <vacancy-controllers
      @change-currency="changeCurrency($event)"
      @search-vacancy="searchVacancy($event)"
      @sort-vacancy="sortVacancy($event)"
      @set-range="setRange($event)"
    />
    <vacancy-list
      :vacancy-list="vacancyListData"
      :current-currency="currentCurrency"
      :class="{ pending: loading }"
      @hide-vacancy="hideVacancy($event)"
    />
    <button class="main__btn" @click="showHiddenVacancies">
      {{ `Show hidden vacancies(${hiddenVacancies.size})` }}
    </button>
    <app-loader v-if="loading" />
  </main>
</template>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 50px;
  &__btn {
    display: block;
    margin: 0 auto;
    cursor: pointer;
  }
}
.pending {
  pointer-events: none;
  background: rgba(255, 255, 255, 0.1);
}
</style>
