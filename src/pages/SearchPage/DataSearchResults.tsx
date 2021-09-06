import { themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'
import type { GraphQLFormattedError } from 'graphql'
import type { FunctionComponent } from 'react'
import AuthAlert from '../../shared/components/Alerts/AuthAlert'
import DataCard, { DataList } from '../../shared/components/DataCard'
import { NoDataSearchResults } from '../../shared/components/NoSearchResults'
import type { ErrorExtensions } from '../../shared/models/graphql'
import getErrorsForPath from '../../shared/utils/getErrorsForPath'
import getLoadingErrors from '../../shared/utils/getLoadingErrors'
import getUnauthorizedLabels from '../../shared/utils/getUnauthorizedLabels'
import type { DataIconType } from '../../shared/components/DataCard/DataIcon'
import type { DataResult } from './types'

const CardWrapper = styled.div<{ compact: boolean }>`
  width: 100%;
  margin-bottom: ${({ compact }) => (compact ? themeSpacing(2) : themeSpacing(8))};
`

export interface CombinedDataResult {
  count: number
  label: string
  results: DataResult[]
  type: DataIconType
  __typename: 'CombinedDataResult'
}

export interface DataSearchResultsProps {
  page: string
  query: string
  results: CombinedDataResult[]
  errors: GraphQLFormattedError<ErrorExtensions>[]
  compact: boolean
  withPagination: boolean
}

const DataSearchResults: FunctionComponent<DataSearchResultsProps> = ({
  query,
  results,
  errors,
  compact,
  withPagination,
}) => {
  const Card = compact ? DataCard : DataList

  // Get the total count for all data types
  const totalCount = results.reduce((acc, { count }) => acc + count, 0)

  // Get the errors and labels for this page.
  const matchingErrors = getErrorsForPath(errors, ['dataSearch'])
  const loadingErrors = getLoadingErrors(matchingErrors)

  // Get all the labels of the type that the user has no access to
  const unauthorizedLabels = getUnauthorizedLabels(matchingErrors)

  return totalCount > 0 ? (
    <>
      {results.map((result) => {
        const hasLoadingError = loadingErrors.some(
          ({ extensions }) => extensions?.type === result.type,
        )

        return (result.results && result.results.length > 0) || hasLoadingError ? (
          <CardWrapper key={result.type} compact={compact}>
            <Card {...{ ...result, withPagination, hasLoadingError, query }} />
          </CardWrapper>
        ) : null
      })}
      <>
        {unauthorizedLabels.length > 0 && (
          <AuthAlert data-testid="authAlert" excludedResults={unauthorizedLabels.join(', ')} />
        )}
      </>
    </>
  ) : (
    <NoDataSearchResults data-testid="noResults" query={query} unauthorized={unauthorizedLabels} />
  )
}
export default DataSearchResults
