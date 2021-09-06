import {
  Alert,
  breakpoint,
  Button,
  Column,
  CompactPager,
  Divider,
  Heading,
  Hidden,
  Pagination,
  Paragraph,
  themeColor,
  themeSpacing,
} from '@amsterdam/asc-ui'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import type { FunctionComponent } from 'react'
import type { EditorialResultsProps } from '../../app/components/EditorialResults/EditorialResults'
import PAGES from '../../app/pages'
import formatCount from '../../app/utils/formatCount'
import toSearchParams from '../../app/utils/toSearchParams'
import SEARCH_PAGE_CONFIG, { EDITORIAL_SEARCH_PAGES, SearchConfig } from './config'
import { pageParam, Sort } from './query-params'
import type { SearchPageFiltersProps } from './SearchPageFilters'
import SearchResultsOverview from './SearchResultsOverview'
import { SearchResultsOverviewSkeleton, SearchResultsSkeleton } from './SearchResultsSkeleton'
import SearchSort from './SearchSort'

const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(4)};
  @media screen and ${breakpoint('min-width', 'tabletM')} {
    margin-bottom: ${themeSpacing(12)};
  }
`

const ResultWrapper = styled.div`
  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: ${themeSpacing(4)};
  }
  width: inherit;
`

const FilterButton = styled(Button)`
  align-self: flex-start;
  margin-bottom: ${themeSpacing(4)};
  display: block;
  flex-grow: 1;

  @media screen and ${breakpoint('max-width', 'mobileL')} {
    width: 100%;
    text-align: center;
  }
  @media screen and ${breakpoint('min-width', 'tabletS')} {
    max-width: 160px;
  }
  @media screen and ${breakpoint('min-width', 'laptop')} {
    display: none;
  }
`

const ResultColumn = styled(Column)`
  flex-direction: column;
  justify-content: flex-start;
`

const StyledDivider = styled(Divider)`
  height: 2px;
  width: 100%;
  background-color: ${themeColor('tint', 'level3')};
  margin-bottom: ${themeSpacing(5)};
`

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const SearchResultsWrapper = styled.div`
  @media screen and ${breakpoint('min-width', 'laptop')} {
    margin-bottom: ${themeSpacing(14)};
  }

  margin-bottom: ${themeSpacing(10)};
`

const StyledAlert = styled(Alert)`
  margin-bottom: ${themeSpacing(10)};
`

const StyledCompactPager = styled(CompactPager)`
  width: 100%;
`

interface SearchPageResultsProps
  extends Pick<EditorialResultsProps, 'query' | 'errors' | 'loading' | 'results'>,
    Pick<SearchPageFiltersProps, 'setShowFilter' | 'totalCount' | 'currentPage'> {
  sort: Sort | null
  page: number
  pageInfo: {
    hasLimitedResults: string
    hasNextPage: string
    totalPages: number
  }
  hasQuery: boolean
  isOverviewPage: boolean
}

const SearchPageResults: FunctionComponent<SearchPageResultsProps> = ({
  query,
  errors,
  loading,
  totalCount,
  results,
  currentPage,
  isOverviewPage,
  setShowFilter,
  sort,
  page,
  pageInfo,
  hasQuery,
}) => {
  const history = useHistory()
  const allResultsPageActive = currentPage === PAGES.SEARCH
  const pageConfig = SEARCH_PAGE_CONFIG[currentPage] as SearchConfig

  if (!pageConfig) {
    return null
  }

  const formatTitle = (label: string, count: number | null = null) => {
    // Handle an empty result.
    if (count === 0) {
      return hasQuery ? `Geen resultaten met '${query}'` : 'Geen resultaten'
    }

    // Handle pages without a count (usually the loading state).
    if (count === null) {
      return hasQuery ? `${label} met '${query}'` : label
    }

    return `${label} ${hasQuery ? `met '${query}'` : ''} (${formatCount(count)} ${
      count === 1 ? 'resultaat' : 'resultaten'
    })`
  }

  const ResultsComponent = pageConfig.component ?? null

  return (
    <ResultColumn
      wrap
      span={{ small: 12, medium: 12, big: 12, large: 7, xLarge: 8 }}
      push={{ small: 0, medium: 0, big: 0, large: 1, xLarge: 1 }}
    >
      <StyledHeading role="status">
        {formatTitle(pageConfig.label, !loading ? totalCount : null)}
      </StyledHeading>
      <FilterWrapper>
        <FilterButton variant="primary" onClick={() => setShowFilter(true)} disabled={loading}>
          Filteren
        </FilterButton>
        {EDITORIAL_SEARCH_PAGES.includes(currentPage) && (
          <>
            <SearchSort isOverviewPage={isOverviewPage} sort={sort} disabled={loading} />
            <StyledDivider />
          </>
        )}
      </FilterWrapper>
      {loading && (
        <ResultWrapper>
          {allResultsPageActive ? <SearchResultsOverviewSkeleton /> : <SearchResultsSkeleton />}
        </ResultWrapper>
      )}
      {!loading && (
        <ResultWrapper>
          {allResultsPageActive ? (
            <SearchResultsOverview {...{ query, totalCount, results, errors, loading }} />
          ) : (
            <SearchResultsWrapper>
              <ResultsComponent
                {...{
                  page: currentPage,
                  query,
                  results,
                  errors,
                  withPagination: pageInfo,
                  loading,
                  isOverviewPage,
                  label: pageConfig.label,
                  type: pageConfig.type,
                }}
              />
            </SearchResultsWrapper>
          )}
          {pageInfo && pageInfo.hasLimitedResults && !pageInfo.hasNextPage && (
            <>
              <StyledAlert level="info" dismissible>
                <Paragraph>
                  Er zijn meer resultaten, om technische redenen kunnen alleen de eerste 10 pagina’s
                  worden getoond.
                </Paragraph>
                <Paragraph>
                  Tip: Verfijn de zoekopdracht om het het aantal resultaten te verkleinen.
                </Paragraph>
              </StyledAlert>
            </>
          )}
          {pageInfo && results?.length > 0 && (
            <>
              <Hidden minBreakpoint="tabletM">
                <StyledCompactPager
                  page={page}
                  pageSize={Math.ceil(totalCount / pageInfo.totalPages)}
                  collectionSize={totalCount}
                  onPageChange={(pageNumber) => {
                    history.push({
                      ...pageConfig.to,
                      search: toSearchParams([[pageParam, pageNumber]], {
                        initialValue: window.location.search,
                      }).toString(),
                    })
                  }}
                />
              </Hidden>
              <Hidden maxBreakpoint="tabletM">
                <Pagination
                  page={page}
                  pageSize={Math.ceil(totalCount / pageInfo.totalPages)}
                  collectionSize={totalCount}
                  onPageChange={(pageNumber) => {
                    history.push({
                      ...pageConfig.to,
                      search: toSearchParams([[pageParam, pageNumber]], {
                        initialValue: window.location.search,
                      }).toString(),
                    })
                  }}
                />
              </Hidden>
            </>
          )}
        </ResultWrapper>
      )}
    </ResultColumn>
  )
}

export default SearchPageResults
