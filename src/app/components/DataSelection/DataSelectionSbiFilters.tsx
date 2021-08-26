import { Enlarge, Minimise } from '@amsterdam/asc-assets'
import { Button, Link, themeSpacing, TextField, Heading } from '@amsterdam/asc-ui'
import { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import type { FunctionComponent } from 'react'
import { DEFAULT_LOCALE } from '../../../shared/config/locale.config'
import { useDataSelection } from './DataSelectionContext'
import {
  DataSelectionFiltersContainer,
  DataSelectionFiltersCategory,
  DataSelectionFiltersItem,
  DataSelectionFiltersShowMore,
  DataSelectionFiltersHiddenOptions,
  DataSelectionFiltersItemLabel,
  DataSelectionFiltersItemLabelEmpty,
} from './DataSelectionFilterStyles'

const StyledLink = styled(Link)`
  background-color: transparent;
  text-align: left;
`

const ShowMoreButton = styled(Button)`
  margin-top: ${themeSpacing(2)};
`

const SubmitButton = styled(Button)`
  margin-left: ${themeSpacing(1)};
`
const DataSelectionFilterForm = styled.form`
  display: flex;
  margin-bottom: ${themeSpacing(2)};
`

// Note, this component has been migrated from legacy angularJS code
// Todo: this can be removed when we implement the new interactive table
const DataSelectionSbiFilters: FunctionComponent = () => {
  const { removeFilter, addFilter, availableFilters } = useDataSelection()
  const [isExpanded, setIsExpanded] = useState(false)
  const [sbiCodeInput, setSbiCodeInput] = useState('')
  const sbiLevelFilters = availableFilters.filter((filter) => filter.slug.startsWith('sbi_l'))
  const numberOfOptions = sbiLevelFilters.reduce(
    (total, amount) => total + amount.numberOfOptions,
    0,
  )
  const options = sbiLevelFilters
    .map((filter) => {
      return filter.options.map((option) => ({
        ...option,
        slug: filter.slug,
      }))
    })
    .reduce((a, b) => a.concat(b), [])
    .slice(0, 100)

  const showMoreThreshold = 10
  const filterSlug = 'sbi_code'

  const currentFilter = useMemo(
    () => ({
      ...availableFilters.find((filter) => filter.slug === 'sbi_code'),
      options,
      numberOfOptions,
    }),
    [availableFilters, options, numberOfOptions],
  )

  const addOrRemoveFilter = useCallback(
    (value?: string) => {
      if (!value) {
        return
      }
      const formattedValue = value
        .split(',')
        .map((data) => `'${data.trim()}'`)
        .join(', ')

      if (value === '') {
        removeFilter(filterSlug)
      } else {
        addFilter({
          [filterSlug]: `[${formattedValue}]`,
        })
      }
    },
    [addFilter, sbiCodeInput],
  )

  const clickFilter = (string: string) => {
    addOrRemoveFilter(string.replace(/: .*$/g, ''))
  }

  const nrHiddenOptions = currentFilter.numberOfOptions - currentFilter.options.length

  const expandFilter = () => {
    setIsExpanded(true)
  }

  const implodeFilter = () => {
    setIsExpanded(false)
  }

  const canExpandImplode = () => {
    return currentFilter.options.length > showMoreThreshold
  }

  const showExpandButton = () => {
    return !isExpanded && canExpandImplode()
  }
  return (
    <DataSelectionFiltersContainer>
      <DataSelectionFiltersCategory>
        <Heading forwardedAs="h2">SBI-code</Heading>
        <DataSelectionFilterForm
          onSubmit={(e) => {
            e.preventDefault()
            addFilter({
              sbi_code: sbiCodeInput,
            })
          }}
        >
          <TextField
            value={sbiCodeInput}
            onChange={(e) => {
              setSbiCodeInput(e.target.value)
            }}
            placeholder="Codes bijv.: 221, 01, 38211"
          />
          <SubmitButton variant="tertiary" type="submit">
            Selecteer
          </SubmitButton>
        </DataSelectionFilterForm>

        <div>
          <ul>
            {[...currentFilter.options]
              .slice(0, isExpanded ? currentFilter.options.length : showMoreThreshold)
              .map((option) => (
                <DataSelectionFiltersItem>
                  <StyledLink
                    inList
                    type="button"
                    forwardedAs="button"
                    onClick={() => clickFilter(option.id)}
                  >
                    {option.label ? (
                      <DataSelectionFiltersItemLabel>{option.label}</DataSelectionFiltersItemLabel>
                    ) : (
                      <DataSelectionFiltersItemLabelEmpty>
                        (geen)
                      </DataSelectionFiltersItemLabelEmpty>
                    )}
                  </StyledLink>
                </DataSelectionFiltersItem>
              ))}
          </ul>
          {showExpandButton() && (
            <DataSelectionFiltersShowMore>
              <ShowMoreButton
                type="button"
                onClick={expandFilter}
                variant="textButton"
                className="qa-show-more-button"
                iconSize={14}
                iconLeft={<Enlarge />}
              >
                Toon meer
              </ShowMoreButton>
            </DataSelectionFiltersShowMore>
          )}

          {isExpanded && (
            <DataSelectionFiltersShowMore>
              {nrHiddenOptions > 0 && (
                <DataSelectionFiltersHiddenOptions>
                  ...nog {nrHiddenOptions.toLocaleString(DEFAULT_LOCALE)} waarden
                </DataSelectionFiltersHiddenOptions>
              )}
              <ShowMoreButton
                type="button"
                className="qa-show-more-button"
                onClick={implodeFilter}
                variant="textButton"
                iconSize={14}
                iconLeft={<Minimise />}
              >
                Toon minder
              </ShowMoreButton>
            </DataSelectionFiltersShowMore>
          )}
        </div>
      </DataSelectionFiltersCategory>
    </DataSelectionFiltersContainer>
  )
}

export default DataSelectionSbiFilters
