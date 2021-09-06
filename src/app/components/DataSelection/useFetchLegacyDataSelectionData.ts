import { useMemo } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import AuthScope from '../../utils/api/authScope'
import { AuthError } from '../../utils/api/customError'
import { getScopes, isAuthenticated } from '../../utils/auth/auth'
import getFromQuery from '../../utils/dataSelection/getFromQuery'
import PAGES from '../../pages'
import { ViewMode, viewParam } from '../../../pages/MapPage/query-params'
import { pageParam } from '../../../pages/SearchPage/query-params'
import { routing } from '../../routes'
import formatCount from '../../utils/formatCount'
import useParam from '../../hooks/useParam'
import { useDataSelection } from '../../contexts/DataSelection/DataSelectionContext'
import { DatasetType, LegacyDataSelectionViewTypes } from './types'
import useLegacyDataselectionConfig from './useLegacyDataselectionConfig'

const DEFAULT_ERROR_MESSAGE = 'Er is een fout opgetreden, probeer het later nog eens.'

const VIEWS_TO_PARAMS = {
  [ViewMode.Split]: LegacyDataSelectionViewTypes.List,
  [ViewMode.Map]: LegacyDataSelectionViewTypes.List,
  [ViewMode.Full]: LegacyDataSelectionViewTypes.Table,
}

/**
 * Note: a lot of this logic has been refactored from several sagas and put into this one
 * hook. There is legacy code mixed with modern stuff, so we do need to get rid of this
 * hook ASAP.
 */
const useFetchLegacyDataSelectionData = () => {
  const [view] = useParam(viewParam)
  const location = useLocation()
  const currentPage = useMemo(
    () =>
      Object.values(routing).find((value) =>
        matchPath(location.pathname, { path: value.path, exact: true }),
      )?.page,
    [location, routing],
  )
  const userHasAccessToPage =
    currentPage === PAGES.ADDRESSES ||
    (currentPage === PAGES.ESTABLISHMENTS && isAuthenticated()) ||
    (currentPage === PAGES.CADASTRAL_OBJECTS && getScopes().includes(AuthScope.BrkRsn))

  const [page] = useParam(pageParam)
  const { setTotalResults, setAvailableFilters, activeFilters } = useDataSelection()
  const { currentDatasetConfig, currentDatasetType } = useLegacyDataselectionConfig()

  const fetchData = async (signal: AbortSignal) => {
    // Side effect to reset the number of results and remove the markers from the map
    setTotalResults(0)

    if (!currentDatasetConfig) {
      throw new Error(DEFAULT_ERROR_MESSAGE)
    }
    const datasetScope = currentDatasetConfig.AUTH_SCOPE
    const authScopeError = datasetScope ? !getScopes().includes(datasetScope as AuthScope) : false
    if (!userHasAccessToPage || authScopeError) {
      throw new AuthError(
        401,
        datasetScope === AuthScope.BrkRsn
          ? `Medewerkers met speciale bevoegdheden kunnen inloggen om kadastrale objecten met
            zakelijk rechthebbenden te bekijken.`
          : `Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om maatschappelijke activiteiten en vestigingen te bekijken. `,
      )
    }

    try {
      const result = await getFromQuery(
        signal,
        currentDatasetConfig,
        VIEWS_TO_PARAMS[view],
        activeFilters,
        page,
      )

      setAvailableFilters(result.availableFilters)
      setTotalResults(result.numberOfRecords)

      const { MAX_AVAILABLE_PAGES, MAX_NUMBER_OF_CLUSTERED_MARKERS } = currentDatasetConfig

      const messageMaxPages =
        MAX_AVAILABLE_PAGES && page > MAX_AVAILABLE_PAGES
          ? `Alleen de eerste ${MAX_AVAILABLE_PAGES ?? ''} pagina's kunnen worden weergegeven
                        (om technische redenen). Bij downloaden worden wel alle resultaten
                        opgenomen.`
          : null
      const messageClusteredMarkers =
        view === ViewMode.Split &&
        MAX_NUMBER_OF_CLUSTERED_MARKERS &&
        result.numberOfRecords > MAX_NUMBER_OF_CLUSTERED_MARKERS
          ? `Deze resultaten worden niet getoond op de kaart, omdat deze niet meer dan ${formatCount(
              MAX_NUMBER_OF_CLUSTERED_MARKERS ?? 0,
            )} resultaten tegelijk kan weergeven (om technische redenen).`
          : null

      const showSbiFilers = currentDatasetType === DatasetType.Hr

      return { ...result, messageMaxPages, messageClusteredMarkers, showSbiFilers }
    } catch (e) {
      throw new Error(DEFAULT_ERROR_MESSAGE)
    }
  }

  return {
    fetchData,
  }
}

export default useFetchLegacyDataSelectionData
