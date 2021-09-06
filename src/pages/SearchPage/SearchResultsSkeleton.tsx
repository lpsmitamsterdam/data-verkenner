import { Card, CardContainer, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'
import type { FunctionComponent } from 'react'
import SearchHeading from '../../shared/components/SearchHeading/SearchHeading'
import SEARCH_PAGE_CONFIG from './config'

const MAX_ITEMS = 5

const PLACEHOLDER_RESULTS = [
  { type: 'SPECIALS_SEARCH' },
  { type: 'DATA_SEARCH' },
  { type: 'PUBLICATION_SEARCH' },
  { type: 'DATASET_SEARCH' },
  { type: 'ARTICLE_SEARCH' },
]

const SkeletonCard = styled(Card)`
  min-height: 160px;
`

const SkeletonResultsComponent = styled.div`
  margin-bottom: ${themeSpacing(8)};
`

const SkeletonResultItem = styled.div`
  margin-bottom: ${themeSpacing(18)};
`

export const SearchResultsSkeleton: FunctionComponent<{ page?: string }> = ({ page }) => (
  <CardContainer>
    {[...Array(MAX_ITEMS).keys()].map((index) => (
      <SkeletonCard key={`${page ?? ''}-${index}`} isLoading />
    ))}
  </CardContainer>
)

export const SearchResultsOverviewSkeleton: FunctionComponent = () => (
  <>
    {PLACEHOLDER_RESULTS.map(({ type: resultItemType }) => {
      const { label } = SEARCH_PAGE_CONFIG[resultItemType] && SEARCH_PAGE_CONFIG[resultItemType]

      return (
        <SkeletonResultItem key={resultItemType}>
          <SearchHeading label={label} />
          <SkeletonResultsComponent>
            <SearchResultsSkeleton />
          </SkeletonResultsComponent>
        </SkeletonResultItem>
      )
    })}
  </>
)
