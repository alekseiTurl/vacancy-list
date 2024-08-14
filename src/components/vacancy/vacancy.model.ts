export interface IVacancy {
  id: number
  title: string
  salary: {
    value: number
    currencies: {
      label: string
      coefficient: number
    }[]
  }
}

export enum Currencies {
  USD = 'USD',
  RUB = 'RUB'
}

export interface ISortValue {
  value: string | null
  label: string
}

export interface Range {
  from: number | null | string
  to: number | null | string
}
