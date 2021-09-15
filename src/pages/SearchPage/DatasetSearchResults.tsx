import { Enlarge } from '@amsterdam/asc-assets'
import { themeSpacing } from '@amsterdam/asc-ui'
import type { GraphQLFormattedError } from 'graphql'
import type { FunctionComponent } from 'react'
import styled from 'styled-components'
import { dcatdScopes, getScopes } from '../../shared/utils/auth/auth'
import ActionButton from '../../shared/components/ActionButton'
import AuthAlert from '../../shared/components/Alerts/AuthAlert'
import DatasetCard from '../../shared/components/DatasetCard'
import ErrorMessage from '../../shared/components/ErrorMessage/ErrorMessage'
import { modificationDateFilter } from '../../shared/components/Filters/Filters'
import NoSearchResults from '../../shared/components/NoSearchResults'
import { toDatasetDetail, toDatasetSearch } from '../../links'
import type { ErrorExtensions } from '../../shared/models/graphql'
import getErrorsForPath from '../../shared/utils/getErrorsForPath'
import getLoadingErrors from '../../shared/utils/getLoadingErrors'
import getUnauthorizedLabels from '../../shared/utils/getUnauthorizedLabels'
import redirectToDcatd from '../../shared/utils/redirectToDcatd'
import toSlug from '../../shared/utils/toSlug'

const DatasetCardContainer = styled.div`
  margin-bottom: ${themeSpacing(8)};
`

const StyledDatasetCard = styled(DatasetCard)`
  margin: ${themeSpacing(2, 0)};
`

const StyledActionButton = styled(ActionButton)`
  margin-bottom: ${themeSpacing(8)};
`

export interface Result {
  header: string
  teaser: string
  modified: string
  id: string
  tags: string[]
  distributionTypes: string[]
  __typename: string
}

export interface DatasetSearchResultsProps {
  query?: string
  label?: string
  results?: Result[]
  errors?: GraphQLFormattedError<ErrorExtensions>[]
  isOverviewPage?: boolean
}

const DatasetSearchResults: FunctionComponent<DatasetSearchResultsProps> = ({
  query = '',
  label,
  results,
  errors = [],
  isOverviewPage,
}) => {
  // Check if user has the correct scopes to add or edit datasets
  const canEdit = isOverviewPage ? getScopes().some((scope) => dcatdScopes.includes(scope)) : false
  const matchingErrors = getErrorsForPath(errors, ['datasetSearch'])
  const hasLoadingError = getLoadingErrors(matchingErrors).length > 0
  // Get all the labels of the type that the user has no access to
  const unauthorizedLabels = getUnauthorizedLabels(matchingErrors)

  if (results && results.length > 0) {
    return (
      <DatasetCardContainer>
        {canEdit && (
          <StyledActionButton
            data-testid="actionButton"
            fetching={false}
            onClick={() => redirectToDcatd('_')}
            label="Toevoegen"
            iconLeft={<Enlarge />}
          />
        )}

        {results.map(({ header, id, teaser, modified, distributionTypes }) => (
          <StyledDatasetCard
            data-testid="datasetCardResults"
            key={id}
            to={toDatasetDetail({ id, slug: toSlug(header) || 'dataset' })}
            shortTitle={header}
            teaser={teaser}
            lastModified={modificationDateFilter(modified)}
            modified={modified}
            distributionTypes={distributionTypes}
          />
        ))}

        {unauthorizedLabels.length > 0 && (
          <AuthAlert excludedResults={unauthorizedLabels.join(', ')} />
        )}
      </DatasetCardContainer>
    )
  }

  return hasLoadingError ? (
    <ErrorMessage
      data-testid="errorMessage"
      message="Er is een fout opgetreden bij het laden van dit blok."
      buttonLabel="Probeer opnieuw"
      buttonOnClick={() => window.location.reload()}
    />
  ) : (
    <NoSearchResults query={query} label={label} to={toDatasetSearch()} />
  )
}

export default DatasetSearchResults
