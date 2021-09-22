import usePromise, { isFulfilled, isPending, isRejected } from '@amsterdam/use-promise'
import { Table } from '@amsterdam/asc-assets'
import {
  Alert,
  Button,
  CompactPager,
  Link,
  Paragraph,
  themeSpacing,
  useMatchMedia,
} from '@amsterdam/asc-ui'
import { Link as RouterLink } from 'react-router-dom'
import type { FunctionComponent } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import type { DataSelectionType } from '../../config'
import config from '../../config'
import useBuildQueryString from '../../../../shared/hooks/useBuildQueryString'
import { polygonParam, ViewMode, viewParam } from '../../query-params'
import useParam from '../../../../shared/hooks/useParam'
import useLegacyDataselectionConfig from '../../../../shared/components/DataSelection/useLegacyDataselectionConfig'
import { fetchWithToken } from '../../../../shared/utils/api/api'
import { normalizeData } from './normalize'
import DataSelectionSelectBox from './DataSelectionSelectBox'
import GeneralErrorAlert from '../../../../shared/components/Alerts/GeneralErrorAlert'
import { useDataSelection } from '../../../../shared/contexts/DataSelection/DataSelectionContext'
import DataSelectionActiveFilters from '../../../../shared/components/DataSelection/DataSelectionActiveFilters'
import { createFiltersObject } from '../../../../shared/utils/dataSelection/normalizations'
import useAsyncMapPanelHeader from '../../utils/useAsyncMapPanelHeader'
import { AuthError, ForbiddenError } from '../../../../shared/utils/api/customError'
import LoginLink from '../../../../shared/components/Links/LoginLink/LoginLink'
import formatCount from '../../../../shared/utils/formatCount'
import AuthScope from '../../../../shared/utils/api/authScope'
import { useMapContext } from '../../../../shared/contexts/map/MapContext'
import { DATASELECTION_TABLE_BUTTON } from '../../matomo-events'
import MapPanelContent from '../MapPanel/MapPanelContent'
import { DrawerPanelHeader } from '../DrawerPanel'
import { LinkListSkeleton } from '../../../../shared/components/Skeleton/Skeleton'

const ResultLink = styled(RouterLink)`
  width: 100%;
  margin-bottom: ${themeSpacing(2)};
`

const StyledCompactPager = styled(CompactPager)`
  margin-top: ${themeSpacing(5)};
  width: 100%;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${themeSpacing(4)};
`

const TableRouterLink = styled(RouterLink)`
  flex-shrink: 0;
`

const StyledAlert = styled(Alert)`
  margin: ${themeSpacing(2, 0)};
`

const Results: FunctionComponent = () => {
  const [paginationPage, setPaginationPage] = useState(1)
  const [polygon] = useParam(polygonParam)
  const { activeFilters, distanceText } = useDataSelection()
  const { currentDatasetType, currentDatasetConfig } = useLegacyDataselectionConfig()
  const { setShowMapDrawVisualization } = useMapContext()
  const { buildQueryString } = useBuildQueryString()

  const result = usePromise(async () => {
    const searchParams = new URLSearchParams({
      shape: JSON.stringify(polygon?.polygon.map(({ lat, lng }) => [lng, lat])),
      size: '20',
      page: paginationPage.toString(),
      ...config[currentDatasetType.toUpperCase()]?.extraParams,
      ...createFiltersObject(activeFilters),
    })

    const data = await fetchWithToken(
      `${
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        config[currentDatasetType.toUpperCase()]?.endpointData ?? ''
      }?${searchParams.toString()}`,
    )
    return normalizeData(currentDatasetType.toUpperCase() as DataSelectionType, data)
  }, [polygon, currentDatasetConfig, currentDatasetType, paginationPage, activeFilters])

  useAsyncMapPanelHeader(
    result,
    isFulfilled(result) ? `${result.value.totalCount} Resultaten` : undefined,
    distanceText && `Locatie: ingetekend (${distanceText})`,
  )

  if (isPending(result)) {
    return <LinkListSkeleton />
  }

  if (isRejected(result)) {
    if (result.reason instanceof AuthError || result.reason instanceof ForbiddenError) {
      return (
        <Alert level="info" dismissible>
          <Paragraph>
            {currentDatasetConfig?.AUTH_SCOPE === AuthScope.BrkRsn
              ? `Medewerkers met speciale bevoegdheden kunnen inloggen om kadastrale objecten met
            zakelijk rechthebbenden te bekijken.`
              : `Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om maatschappelijke activiteiten en vestigingen te bekijken. `}
          </Paragraph>
          <LoginLink />
        </Alert>
      )
    }
    return <GeneralErrorAlert />
  }

  const showMarkers =
    // @ts-ignore
    result.value.totalCount <= currentDatasetConfig?.MAX_NUMBER_OF_CLUSTERED_MARKERS

  setShowMapDrawVisualization(showMarkers)

  return (
    <>
      {!showMarkers && (
        <StyledAlert level="info">
          <Paragraph>{`Deze resultaten worden niet getoond op de kaart, omdat deze niet meer dan ${formatCount(
            currentDatasetConfig?.MAX_NUMBER_OF_CLUSTERED_MARKERS ?? 0,
          )} resultaten tegelijk kan weergeven (om technische redenen).`}</Paragraph>
          <Paragraph>
            Tip: Bekijk de lijst resultaten in kleinere delen. Dit kan door een voor een
            filtercriteria toe te voegen (bijv. de verschillende wijken uit de selectie).
          </Paragraph>
        </StyledAlert>
      )}
      {result.value.results.map(({ id: locationId, name: locationName }) => (
        <Link
          to={{
            pathname: config[currentDatasetType.toUpperCase()].getDetailPath(locationId),
            search: buildQueryString(undefined, [polygonParam]),
          }}
          as={ResultLink}
          inList
          key={locationId}
        >
          {locationName}
        </Link>
      ))}
      {result.value.totalCount > 20 && (
        <StyledCompactPager
          page={paginationPage}
          pageSize={20}
          collectionSize={result.value.totalCount}
          onPageChange={setPaginationPage}
        />
      )}
      {result.value.totalCount === 0 && (
        <StyledAlert level="info">Er zijn geen resultaten</StyledAlert>
      )}
    </>
  )
}

const DrawResults: FunctionComponent = () => {
  const [showDesktopVariant] = useMatchMedia({ minBreakpoint: 'tabletM' })

  const { currentDatasetType } = useLegacyDataselectionConfig()

  const { buildQueryString } = useBuildQueryString()
  const { trackEvent } = useMatomo()

  return (
    <MapPanelContent>
      <DrawerPanelHeader />
      <Wrapper>
        <DataSelectionSelectBox />

        <Button
          as={TableRouterLink}
          variant="primaryInverted"
          type="button"
          onClick={() => {
            trackEvent(DATASELECTION_TABLE_BUTTON)
          }}
          title="Resultaten in tabel weergeven"
          /* @ts-ignore */
          to={{
            pathname: config[currentDatasetType.toUpperCase()].path,
            search: buildQueryString([[viewParam, ViewMode.Full]]),
          }}
          {...(showDesktopVariant
            ? { iconLeft: <Table /> }
            : { icon: <Table />, iconSize: 25, size: 40 })}
        >
          {showDesktopVariant && 'Tabel weergeven'}
        </Button>
      </Wrapper>

      <DataSelectionActiveFilters />
      <Results />
    </MapPanelContent>
  )
}

export default DrawResults
