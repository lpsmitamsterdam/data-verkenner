import { useMatomo } from '@datapunt/matomo-tracker-react'
import type { FunctionComponent } from 'react'
import { useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import type { Filter } from '../../models/filter'
import { FilterType } from '../../models/filter'
import { activeFiltersParam, pageParam, queryParam } from '../../pages/SearchPage/query-params'
import toSearchParams from '../../utils/toSearchParams'
import useParam from '../../utils/useParam'
import FilterBox from '../FilterBox'
import CheckboxFilter from './filters/CheckboxFilter'
import RadioFilter from './filters/RadioFilter'
import SelectFilter from './filters/SelectFilter'

export interface SearchFilterProps {
  filter: Filter
  query: string
  totalCount: number
  hideCount: boolean
}

export function getFilterComponent(filterType: FilterType) {
  switch (filterType) {
    case FilterType.Checkbox:
      return CheckboxFilter
    case FilterType.Radio:
      return RadioFilter
    case FilterType.Select:
      return SelectFilter
    default:
      throw Error(
        `Unable to get filter component, no component for filter of type '${
          filterType as string
        }' could be found.`,
      )
  }
}

const SearchFilter: FunctionComponent<SearchFilterProps> = ({
  filter,
  query,
  totalCount,
  hideCount,
}) => {
  const { type, filterType, label, options } = filter
  const { trackEvent } = useMatomo()
  const history = useHistory()
  const location = useLocation()
  const [filterValues] = useParam(activeFiltersParam)
  const selection = filterValues.find(({ type: filterTypes }) => filterTypes === type)?.values ?? []
  const FilterContent = getFilterComponent(filterType)

  const onSelectionChange = useCallback(
    (values: string[]) => {
      const disabledFilters = selection?.filter((value) => !values.includes(value))
      const enabledFilters = values.filter((value) => !selection?.includes(value))

      disabledFilters?.forEach((value) =>
        trackEvent({ category: 'search', action: 'disable-filter', name: `${type}-${value}` }),
      )

      enabledFilters.forEach((value) =>
        trackEvent({ category: 'search', action: 'enable-filter', name: `${type}-${value}` }),
      )

      history.replace({
        pathname: location.pathname,
        search: toSearchParams([
          [queryParam, query],
          [activeFiltersParam, values.length ? [{ type, values }] : []],
          [pageParam, 1],
        ]).toString(),
      })
    },
    [location, selection, type],
  )

  return (
    <FilterBox label={label}>
      <FilterContent
        type={type}
        label={label}
        options={options}
        totalCount={totalCount}
        hideCount={hideCount}
        selection={selection}
        onSelectionChange={(values) => onSelectionChange(values)}
      />
    </FilterBox>
  )
}

export default SearchFilter
