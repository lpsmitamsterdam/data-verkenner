import { Enlarge } from '@amsterdam/asc-assets'
import { Button, CompactPager, themeSpacing } from '@amsterdam/asc-ui'
import usePromise, { isFulfilled, isPending, isRejected } from '@amsterdam/use-promise'
import type { FunctionComponent } from 'react'
import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import type { DetailResultItemPaginatedData } from '../../legacy/types/details'
import useParam from '../../../../shared/hooks/useParam'
import { AuthError } from '../../../../shared/utils/api/customError'
import toSearchParams from '../../../../shared/utils/toSearchParams'
import { pageParam } from '../../../SearchPage/query-params'
import AuthAlert from '../../../../shared/components/Alerts/AuthAlert'
import ErrorMessage from '../../../../shared/components/ErrorMessage/ErrorMessage'
import LoadingSpinner from '../../../../shared/components/LoadingSpinner/LoadingSpinner'
import DetailItem from './DetailItem'

interface PaginatedDataProps {
  item: DetailResultItemPaginatedData
}

const StyledContainer = styled.div`
  position: relative;
`

const StyledLoadingSpinner = styled(LoadingSpinner)`
  position: relative;
`

const StyledCompactPager = styled(CompactPager)`
  margin-top: ${themeSpacing(5)};
  width: 100%;
`

const ShowMoreButton = styled(Button)`
  margin-top: ${themeSpacing(1)};
`

const PaginatedData: FunctionComponent<PaginatedDataProps> = ({ item }) => {
  const [retryCount, setRetryCount] = useState(0)
  const [pageSize] = useState(item.pageSize)
  const [page] = useParam(pageParam)
  const [displayPagination] = useState<boolean>(true)
  const [displayShowMoreButton, setDisplayShowMoreButton] = useState<boolean>(page === 1)

  const history = useHistory()
  const location = useLocation()

  const result = usePromise(
    () => item.getData(undefined, displayShowMoreButton ? 10 : pageSize, page),
    [page, displayShowMoreButton],
  )

  if (isPending(result)) {
    return <StyledLoadingSpinner />
  }

  if (isFulfilled(result)) {
    const paginationLength = result.value?.count ? Math.ceil(result.value?.count / 20) : 0
    const resultCount = result.value?.count ? result.value?.count : 0
    const resultItem = result.value?.data ? item.toView(result.value.data) : null

    // If there's no more than 20 items then no need for pagination
    if (resultCount <= 20) {
      return <DetailItem item={resultItem} />
    }

    if (page === 1 && displayShowMoreButton) {
      return (
        <StyledContainer>
          <DetailItem item={resultItem} />
          {displayShowMoreButton && (
            <ShowMoreButton
              variant="textButton"
              iconSize={12}
              iconLeft={<Enlarge />}
              onClick={() => {
                setDisplayShowMoreButton(false)
              }}
            >
              Toon alle {resultCount} resultaten
            </ShowMoreButton>
          )}
        </StyledContainer>
      )
    }

    return (
      <StyledContainer>
        <DetailItem item={resultItem} />
        {displayPagination && (
          <StyledCompactPager
            page={page}
            pageSize={20}
            collectionSize={paginationLength}
            onPageChange={(pageNumber) => {
              history.push({
                ...location,
                search: toSearchParams([[pageParam, pageNumber]], {
                  initialValue: window.location.search,
                }).toString(),
              })
            }}
          />
        )}
      </StyledContainer>
    )
  }

  if (isRejected(result)) {
    if (result.reason instanceof AuthError) {
      return <AuthAlert data-testid="auth-alert" excludedResults={result.reason.message} />
    }
  }

  return (
    <ErrorMessage
      data-testid="error-message"
      message="Er is een fout opgetreden bij het laden van dit blok"
      buttonLabel="Probeer opnieuw"
      buttonOnClick={() => setRetryCount(retryCount + 1)}
    />
  )
}

export default PaginatedData
