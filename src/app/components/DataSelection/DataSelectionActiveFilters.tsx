import { FilterTag } from '@amsterdam/asc-ui'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import { useDataSelection } from '../../contexts/DataSelection/DataSelectionContext'
import { DATASELECTION_REMOVE_FILTER } from '../../../pages/MapPage/matomo-events'

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
`

const StyledFilterTag = styled(FilterTag)`
  text-decoration: none;
`

const DataSelectionActiveFilters = () => {
  const { activeFilters, buildFilterLocationDescriptor } = useDataSelection()
  const { trackEvent } = useMatomo()

  return activeFilters.length ? (
    <List data-testid="activeFilters">
      {activeFilters.map(({ key, label, value }) => (
        <li key={key}>
          <StyledFilterTag
            forwardedAs={RouterLink}
            to={buildFilterLocationDescriptor({
              filtersToRemove: [key],
            })}
            aria-label={`Filter verwijderen: ${label}: ${value}`}
            onClick={() => {
              trackEvent(DATASELECTION_REMOVE_FILTER)
            }}
            data-testid="activeFiltersItem"
          >
            {label}
          </StyledFilterTag>
        </li>
      ))}
    </List>
  ) : null
}

export default DataSelectionActiveFilters
