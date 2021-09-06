import { themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'
import type { FunctionComponent } from 'react'
import type { GraphQLFormattedError } from 'graphql'
import ErrorMessage from '../../app/components/ErrorMessage/ErrorMessage'
import SearchLink from '../../app/components/Links/SearchLink/SearchLink'
import NoSearchResults from '../../app/components/NoSearchResults'
import SearchHeading from '../../app/components/SearchHeading/SearchHeading'
import formatCount from '../../app/utils/formatCount'
import getErrorsForPath from '../../app/utils/getErrorsForPath'
import getLoadingErrors from '../../app/utils/getLoadingErrors'
import type { SearchConfig } from './config'
import SEARCH_PAGE_CONFIG from './config'

const ResultsComponent = styled.div`
  margin-bottom: ${themeSpacing(8)};
`

const ResultItem = styled.div`
  margin-bottom: ${themeSpacing(18)};
`

function getSearchConfigByResolver(key: string): SearchConfig | undefined {
  return Object.values(SEARCH_PAGE_CONFIG).find(({ resolver }) => resolver === key)
}

interface SearchResultsOverviewProps {
  query: string
  totalCount: number
  results: any[]
  errors: GraphQLFormattedError<any>[]
  loading: boolean
}

const SearchResultsOverview: FunctionComponent<SearchResultsOverviewProps> = ({
  query,
  totalCount,
  results,
  errors,
  loading,
}) => {
  return results.length > 0 && totalCount ? (
    <>
      {results.map(({ key, results: resultItemResults, totalCount: resultItemTotalCount }) => {
        const resultItem = getSearchConfigByResolver(key)

        if (resultItem) {
          const {
            label,
            component: ResultComponent,
            type,
            resolver,
            hideOverviewHeading,
          } = resultItem

          // Get the loading errors only, as we do not want to show unauthorized messages on the overview page.
          const matchingErrors = getLoadingErrors(
            getErrorsForPath(errors, typeof resolver === 'string' ? [resolver] : resolver),
          )
          // TODO: This statement should match the error code instead, needs to be implemented in the API.
          const hasNoMatchingFilters = errors.some(
            (err) => err.message === 'The entered type(s) does not exist',
          )
          const hasErrors = matchingErrors.length > 0
          const hasResults = resultItemTotalCount > 0

          return hasResults || (hasErrors && !hasNoMatchingFilters) ? (
            <ResultItem key={type} data-testid="searchResultItem">
              {!hideOverviewHeading && (
                <SearchHeading
                  label={`${label}${
                    resultItemTotalCount > 0 ? ` (${formatCount(resultItemTotalCount)})` : ''
                  }`}
                />
              )}
              <ResultsComponent>
                {hasResults ? (
                  <ResultComponent
                    data-test={type}
                    {...{
                      type,
                      results: resultItemResults,
                      loading,
                      errors: matchingErrors,
                      compact: true, // Results in the search overview page are compact
                      isOverviewPage: true,
                      query,
                    }}
                  />
                ) : (
                  <ErrorMessage
                    message="Er is een fout opgetreden bij het laden van dit blok."
                    buttonLabel="Probeer opnieuw"
                    buttonOnClick={() => window.location.reload()}
                  />
                )}
              </ResultsComponent>
              {hasResults && (
                <SearchLink
                  to={{
                    ...resultItem.to,
                    search: window.location.search,
                  }}
                  label={`Resultaten tonen binnen de categorie '${label}'`}
                />
              )}
            </ResultItem>
          ) : null
        }
        return null
      })}
    </>
  ) : (
    <NoSearchResults data-test="NoSearchResults" query={query} />
  )
}

export default SearchResultsOverview
