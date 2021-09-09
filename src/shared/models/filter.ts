export enum FilterType {
  Checkbox = 'CHECKBOX',
  Radio = 'RADIO',
  Select = 'SELECT',
}

export interface Filter {
  type: string
  label: string
  filterType: FilterType
  options: FilterOption[]
}

export interface FilterOption {
  id: string
  label: string
  count: number
}
