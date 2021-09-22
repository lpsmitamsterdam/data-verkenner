import { Alert, Paragraph, themeColor, themeSpacing } from '@amsterdam/asc-ui'
import usePromise, { isPending, isRejected } from '@amsterdam/use-promise'
import type { FunctionComponent } from 'react'
import { Fragment, useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'
import { getScopes } from '../../../../shared/utils/auth/auth'
import getDetailPageData from '../../../../shared/utils/getDetailPageData'
import AuthAlert from '../../../../shared/components/Alerts/AuthAlert'
import ShowMore from '../../../../shared/components/ShowMore'
import { toDataDetail } from '../../../../links'
import useParam from '../../../../shared/hooks/useParam'
import type {
  MapSearchCategory,
  MapSearchResult,
} from '../../legacy/services/map-search/map-search'
import mapSearch from '../../legacy/services/map-search/map-search'
import { locationParam } from '../../query-params'
import useAsyncMapPanelHeader from '../../utils/useAsyncMapPanelHeader'
import PanoramaPreview from '../PanoramaPreview/PanoramaPreview'
import { wgs84ToRd } from '../../../../shared/utils/coordinateReferenceSystem'
import AuthScope from '../../../../shared/utils/api/authScope'
import MapPanelContent from '../MapPanel/MapPanelContent'
import { DrawerPanelHeader } from '../DrawerPanel'
import MapPanelContentHeading from '../MapPanel/MapPanelContentHeading'
import ListLink from '../../../../shared/components/ListLink/ListLink'
import { MultipleComponentsSkeleton } from '../../../../shared/components/Skeleton/Skeleton'

const RESULT_LIMIT = 10
const EXCLUDED_RESULTS = 'vestigingen'

const SubCategoryBlock = styled.div`
  padding-left: ${themeSpacing(4)};
`

const Message = styled(Paragraph)`
  margin: ${themeSpacing(4)} 0;
`

const StatusLabel = styled.span`
  font-weight: normal;
`

const CoordinatesLabel = styled.span`
  color: ${themeColor('tint', 'level5')};
`

const Coordinates = styled.p`
  margin: ${themeSpacing(1, 0, 0)};
`

const StyledAuthAlert = styled(AuthAlert)`
  margin-top: ${themeSpacing(4)};
`

const LinkList: FunctionComponent<{ results: MapSearchResult[] }> = ({ results }) => (
  <ul>
    <ShowMore limit={RESULT_LIMIT}>
      {results.map((result) => (
        <li>
          <ListLink
            key={result.type + result.label}
            forwardedAs={RouterLink}
            to={toDataDetail(getDetailPageData(result.uri as string))}
            inList
          >
            {result.label}
            {result.statusLabel && (
              <>
                &nbsp;<StatusLabel>({result.statusLabel})</StatusLabel>
              </>
            )}
          </ListLink>
        </li>
      ))}
    </ShowMore>
  </ul>
)

const MapSearchResults: FunctionComponent = () => {
  const [location] = useParam(locationParam)
  const result = usePromise(() => mapSearch(location), [location])
  const { x: rdX, y: rdY } = useMemo(
    () => (location ? wgs84ToRd(location) : { x: 0, y: 0 }),
    [location],
  )

  const coordinates = useMemo(
    () =>
      `${rdX.toFixed(2)}, ${rdY.toFixed(2)} (${location?.lat.toFixed(7) ?? ''}, ${
        location?.lng.toFixed(7) ?? ''
      })`,
    [rdX, rdY, location],
  )

  useAsyncMapPanelHeader(
    result,
    'Zoekresultaten voor locatie',
    null,
    <Coordinates>
      <CoordinatesLabel>Coördinaten: </CoordinatesLabel>
      {coordinates}
    </Coordinates>,
  )

  if (isRejected(result)) {
    return (
      <Alert level="error" data-testid="errorMessage">
        <Paragraph>
          Er is een fout opgetreden bij het laden van dit blok. Zorg dat er een locatie is opgegeven
          door op de kaart te klikken
        </Paragraph>
      </Alert>
    )
  }

  if (isPending(result)) {
    return (
      <MapPanelContent>
        <DrawerPanelHeader />
        <MultipleComponentsSkeleton />
      </MapPanelContent>
    )
  }

  return (
    <>
      <PanoramaPreview location={result.value.location} radius={180} aspect={3} />
      <MapPanelContent>
        <DrawerPanelHeader />
        {result.value.results.length === 0 ? (
          <Message>Geen resultaten gevonden.</Message>
        ) : (
          result.value.results.map((category) => (
            <Fragment key={category.type}>
              <MapPanelContentHeading forwardedAs="h3">
                {formatCategoryTitle(category)}
              </MapPanelContentHeading>
              <LinkList results={category.results} />
              {category.subCategories.map((subCategory) => (
                <SubCategoryBlock key={category.type + subCategory.type}>
                  <MapPanelContentHeading forwardedAs="h4">
                    {formatCategoryTitle(subCategory)}
                  </MapPanelContentHeading>
                  <LinkList results={subCategory.results} />
                </SubCategoryBlock>
              ))}
            </Fragment>
          ))
        )}
        {(!getScopes().includes(AuthScope.HrR) || !getScopes().includes(AuthScope.BrkRs)) && (
          <StyledAuthAlert excludedResults={EXCLUDED_RESULTS} />
        )}
      </MapPanelContent>
    </>
  )
}

function formatCategoryTitle(category: MapSearchCategory) {
  return category.results.length > 1
    ? `${category.categoryLabelPlural} (${category.results.length.toLocaleString('nl-NL')})`
    : category.categoryLabel
}

export default MapSearchResults
