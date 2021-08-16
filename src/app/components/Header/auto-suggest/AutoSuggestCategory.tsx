import type { LocationDescriptorObject } from 'history'
import type { FunctionComponent } from 'react'
import styled from 'styled-components'
import SEARCH_PAGE_CONFIG from '../../../pages/SearchPage/config'
import { activeFiltersParam, pageParam, queryParam } from '../../../pages/SearchPage/query-params'
import toSearchParams from '../../../utils/toSearchParams'
import type { AutoSuggestSearchResult } from '../services/auto-suggest/auto-suggest'
import AutoSuggestItem, { StyledLink } from './AutoSuggestItem'

export interface AutoSuggestCategoryProps {
  category: AutoSuggestSearchResult
  highlightValue: string
  inputValue: string
}

const AutoSuggestDropDownCategory = styled.div`
  &:not(:first-of-type) {
    border-top: 1px solid #ccc; // was $secondary-gray
    margin-top: 7px;
    padding-top: 12px;
  }
`
const AutoSuggestDropdownCategoryHeading = styled.h4`
  color: #666; // was $secondary-gray60
  font-weight: 500; // was $medium-weight
  margin: 0 10px calc(${10 / 2}px); // 10px was $base-whitespace
`

const AutoSuggestMoreResults = styled(StyledLink)`
  padding-left: 8px;
  font-size: 14px;
  text-decoration: underline;
  color: #666; // was $secondary-gray60;
`

const AutoSuggestCategory: FunctionComponent<AutoSuggestCategoryProps> = ({
  category,
  highlightValue,
  inputValue,
}) => {
  const { type, label, content, totalResults } = category
  // Todo: Make sure we get a type back from typeahead instead of transforming the label
  // These types should also match the types in cms_search
  const subType = (type === 'data' && label.replace(' ', '_').toLowerCase()) || undefined
  const moreResultsLink =
    totalResults > content.length ? getMoreResultsLink(type, inputValue, subType) : null

  return (
    <AutoSuggestDropDownCategory>
      <AutoSuggestDropdownCategoryHeading data-testid="qa-auto-suggest-header">
        {label}
      </AutoSuggestDropdownCategoryHeading>
      <ul>
        {content.map((suggestion) => (
          <AutoSuggestItem
            key={`${suggestion.label}${suggestion.index}`}
            suggestion={suggestion}
            content={suggestion.label}
            highlightValue={highlightValue}
            inputValue={inputValue}
            label={label}
          />
        ))}
        {moreResultsLink && (
          <li>
            <AutoSuggestMoreResults to={moreResultsLink}>
              Meer resultaten in &apos;{label}&apos;
            </AutoSuggestMoreResults>
          </li>
        )}
      </ul>
    </AutoSuggestDropDownCategory>
  )
}

function getMoreResultsLink(
  type: string,
  inputValue: string,
  subType?: string,
): LocationDescriptorObject | null {
  const config = Object.values(SEARCH_PAGE_CONFIG).find(
    ({ type: configType }) => type === configType,
  )

  if (!config) {
    return null
  }

  return {
    ...config.to,
    search: toSearchParams([
      [queryParam, inputValue],
      [pageParam, pageParam.defaultValue],
      [activeFiltersParam, subType ? [{ type: 'dataTypes', values: [subType] }] : []],
    ]).toString(),
  }
}

export default AutoSuggestCategory
