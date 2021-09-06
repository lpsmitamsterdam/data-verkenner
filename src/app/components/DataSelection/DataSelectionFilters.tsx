import type { FunctionComponent } from 'react'
import { useMemo, useState } from 'react'
import { Link } from '@amsterdam/asc-ui'
import { Enlarge, Minimise } from '@amsterdam/asc-assets'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import { Link as RouterLink } from 'react-router-dom'
import { DEFAULT_LOCALE } from '../../../shared/config/locale.config'
import Metadata from '../../../shared/assets/icons/metadata.svg'
import { useDataSelection } from '../../contexts/DataSelection/DataSelectionContext'
import type { AvailableFilter } from './types'
import useLegacyDataselectionConfig from './useLegacyDataselectionConfig'
import { DATASELECTION_ADD_FILTER } from '../../../pages/MapPage/matomo-events'
import {
  DataSelectionFiltersCategory,
  DataSelectionFiltersContainer,
  DataSelectionFiltersHiddenOptions,
  DataSelectionFiltersItem,
  InfoButton,
  ShowMoreButton,
  StyledHeading,
  StyledLink,
} from './DataSelectionFilterStyles'

// Note, this component has been migrated from legacy angularJS code
// Todo: this can be removed when we implement the new interactive table
const DataSelectionFilters: FunctionComponent = () => {
  const [expandedFilters, setExpandedFilters] = useState<string[]>([])
  const { buildFilterLocationDescriptor, activeFilters, availableFilters } = useDataSelection()
  const { currentDatasetConfig } = useLegacyDataselectionConfig()
  const { trackEvent } = useMatomo()

  const filteredAvailableFilters = useMemo(() => {
    if (!activeFilters.length) {
      return []
    }
    return availableFilters.filter(({ slug }) => activeFilters.find(({ key }) => key === slug))
  }, [activeFilters, availableFilters])

  const showMoreThreshold = 10

  const isFilterOptionActive = (filterSlug: string, id: string, label: string) => {
    return filteredAvailableFilters.find(({ slug }) => slug === label || slug === id)
  }

  const hasInactiveFilterOptions = (filter: AvailableFilter) => {
    return (
      !filter.options.some((option) =>
        isFilterOptionActive(filter.slug, option.id, option.label),
      ) ||
      (!filter.slug.startsWith('sbi') && filter.options.length)
    )
  }

  const isExpandedFilter = (filterSlug: string) => {
    return expandedFilters.indexOf(filterSlug) !== -1
  }

  const showExpandButton = (filterSlug: string) => {
    return (
      !isExpandedFilter(filterSlug) && getAvailableOptions(filterSlug).length > showMoreThreshold
    )
  }

  const nrHiddenOptions = (filter: AvailableFilter) => {
    return filter.numberOfOptions - filter.options.length
  }

  const expandFilter = (filterSlug: string) => {
    setExpandedFilters((currentExpandedFilters) => [...currentExpandedFilters, filterSlug])
  }

  const implodeFilter = (filterSlug: string) => {
    setExpandedFilters((currentExpandedFilters) => [
      ...currentExpandedFilters.filter((val) => val !== filterSlug),
    ])
  }

  const canExpandImplode = (filterSlug: string) => {
    return getAvailableOptions(filterSlug).length > showMoreThreshold
  }

  function getAvailableOptions(filterSlug: string) {
    return getAvailableFilters(filterSlug)[0].options
  }

  function getAvailableFilters(filterSlug: string) {
    return availableFilters.filter((filter) => filter.slug === filterSlug)
  }

  if (!currentDatasetConfig) {
    return null
  }

  const showOptionCounts = currentDatasetConfig.SHOW_FILTER_OPTION_COUNTS
  const activeFilterSlugs = filteredAvailableFilters.map(({ slug }) => slug)
  return (
    <DataSelectionFiltersContainer data-testid="dataSelectionAvailableFilters">
      <>
        {availableFilters.map(
          (filter) =>
            !activeFilterSlugs.includes(filter.slug) &&
            hasInactiveFilterOptions(filter) && (
              <DataSelectionFiltersCategory key={filter.slug}>
                <StyledHeading as="h3">
                  {filter.label}
                  {filter.info_url && (
                    <InfoButton
                      type="button"
                      variant="blank"
                      data-testid="detail-infobox"
                      forwardedAs={Link}
                      size={28}
                      iconSize={18}
                      icon={<Metadata />}
                      href={filter.info_url}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      Uitleg tonen
                    </InfoButton>
                  )}
                </StyledHeading>
                <ul>
                  {filter.options
                    .slice(
                      0,
                      isExpandedFilter(filter.slug) ? filter.options.length : showMoreThreshold,
                    )
                    .map((option) => (
                      <DataSelectionFiltersItem key={option.id}>
                        <StyledLink
                          inList
                          forwardedAs={RouterLink}
                          to={buildFilterLocationDescriptor({
                            filtersToAdd: { [filter.slug]: option.id },
                          })}
                          onClick={() => {
                            trackEvent(DATASELECTION_ADD_FILTER)
                          }}
                        >
                          {option.label ? (
                            <>
                              {option.label}
                              {showOptionCounts && <span>({option.count})</span>}
                            </>
                          ) : (
                            `(geen)`
                          )}
                        </StyledLink>
                      </DataSelectionFiltersItem>
                    ))}
                </ul>

                {canExpandImplode(filter.slug) && showExpandButton(filter.slug) && (
                  <ShowMoreButton
                    type="button"
                    onClick={() => expandFilter(filter.slug)}
                    className="qa-show-more-button"
                    variant="textButton"
                    iconSize={14}
                    iconLeft={<Enlarge />}
                  >
                    Toon meer
                  </ShowMoreButton>
                )}

                {canExpandImplode(filter.slug) && isExpandedFilter(filter.slug) && (
                  <>
                    {nrHiddenOptions(filter) > 0 && (
                      <DataSelectionFiltersHiddenOptions>
                        ...nog {nrHiddenOptions(filter).toLocaleString(DEFAULT_LOCALE)} waarden
                      </DataSelectionFiltersHiddenOptions>
                    )}
                    <ShowMoreButton
                      type="button"
                      className="qa-show-more-button"
                      onClick={() => implodeFilter(filter.slug)}
                      variant="textButton"
                      iconSize={14}
                      iconLeft={<Minimise />}
                    >
                      Toon minder
                    </ShowMoreButton>
                  </>
                )}
              </DataSelectionFiltersCategory>
            ),
        )}
      </>
    </DataSelectionFiltersContainer>
  )
}

export default DataSelectionFilters
