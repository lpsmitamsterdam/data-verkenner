import { Button, breakpoint, Paragraph, themeSpacing, themeColor } from '@amsterdam/asc-ui'
import { forwardRef, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import { toSearch } from '../../../../links'
import { SearchType } from '../../../../pages/SearchPage/constants'
import { queryParam } from '../../../../pages/SearchPage/query-params'
import toSearchParams from '../../../utils/toSearchParams'
import type { CmsType } from '../../../config/cms.config'
import type { AutoSuggestSearchResult } from '../services/auto-suggest/auto-suggest'
import { LABELS } from '../services/auto-suggest/auto-suggest'
import AutoSuggestCategory from './AutoSuggestCategory'

export type SearchCategory = CmsType | SearchType

const NoResults = styled(Paragraph)`
  padding: 0 ${themeSpacing(2)};
  margin: ${themeSpacing(1)} 0;
`

const ResetFilterButton = styled(Button)`
  margin: ${themeSpacing(2)};
`
// @todo match with right variables
const AutosuggestDropDown = styled.div`
  background-color: ${themeColor('tint', 'level1')};
  border: 1px solid ${themeColor('tint', 'level7')};
  border-top-width: 0;
  display: block;
  left: 0;
  padding-bottom: 10px * 0.5;
  position: absolute;
  right: 45px; + 10px * 0.5;
  max-height: calc(100vh - 160px); // 160 is max height of the header
  overflow: auto;
  top: 40px;

  @media screen and ${breakpoint('min-width', 'tabletM')} {
    width: 100%;
    border-left-width: 0;
    border-right-width: 0;
  }

  @media screen and (min-width: 769px) {
    max-width: calc(100% - 45px);
  }
`

const AutoSuggestTip = styled.h3`
  font-size: 14px; // was font-size($xs-font) (scaled)
  color: ${themeColor('tint', 'level5')}; //was $secondary-gray60 !note not the same but closest;
  font-weight: 400; // $normal-weight;
  margin-top: calc(${10 / 2}px); //math.div($base-whitespace, 2);
  text-align: center;
`

export interface AutoSuggestProps {
  suggestions: AutoSuggestSearchResult[]
  loading: boolean
  highlightValue: string
  setSearchBarFilterValue: (value: string) => void
  searchBarFilterValue: string
  inputValue: string
}

const AutoSuggest = forwardRef<HTMLDivElement, AutoSuggestProps>(
  (
    {
      suggestions = [],
      loading,
      highlightValue,
      setSearchBarFilterValue,
      searchBarFilterValue,
      inputValue,
    },
    ref,
  ) => {
    const history = useHistory()
    const searchCategoryLabel = useMemo(() => {
      switch (searchBarFilterValue) {
        case 'data':
          return 'Data'

        case 'map':
          return 'Kaarten'

        default:
          return LABELS[searchBarFilterValue]
      }
    }, [searchBarFilterValue])

    return (
      <AutosuggestDropDown ref={ref}>
        {loading && <LoadingSpinner />}
        {!!suggestions?.length && <AutoSuggestTip>Enkele suggesties</AutoSuggestTip>}
        {!loading &&
          suggestions.map((category) => (
            <AutoSuggestCategory
              key={category.label}
              highlightValue={highlightValue}
              category={category}
              inputValue={inputValue}
            />
          ))}
        {!loading && !suggestions.length && (
          <NoResults>
            Er zijn geen resultaten gevonden{' '}
            {searchCategoryLabel && `in categorie "${searchCategoryLabel as string}"`}
          </NoResults>
        )}
        {!loading && searchBarFilterValue !== SearchType.Search && (
          <ResetFilterButton
            variant="textButton"
            onClick={() => {
              // Side effect: clear the searchbar filter and navigate to main search page
              setSearchBarFilterValue(SearchType.Search)
              history.push({
                ...toSearch(),
                search: toSearchParams([[queryParam, inputValue]]).toString(),
              })
            }}
          >
            Alle zoekresultaten weergeven
          </ResetFilterButton>
        )}
      </AutosuggestDropDown>
    )
  },
)

export default AutoSuggest
