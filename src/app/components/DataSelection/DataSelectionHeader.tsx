import { Map, Table } from '@amsterdam/asc-assets'
import { Button, Heading, Tab, Tabs, themeSpacing } from '@amsterdam/asc-ui'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import type { FunctionComponent } from 'react'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { getScopes } from '../../utils/auth/auth'
import { DATASELECTION_MAP_BUTTON } from '../../pages/MapPage/matomo-events'
import { ViewMode, viewParam } from '../../pages/MapPage/query-params'
import useBuildQueryString from '../../hooks/useBuildQueryString'
import useParam from '../../hooks/useParam'
import { useDataSelection } from '../../contexts/DataSelection/DataSelectionContext'
import DataSelectionDownloadButton from './DataSelectionDownloadButton'
import { DatasetType } from './types'
import useLegacyDataselectionConfig from './useLegacyDataselectionConfig'
import type AuthScope from '../../utils/api/authScope'

const StyledTabs = styled(Tabs)`
  margin-bottom: ${themeSpacing(2)};
`

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const DATASETS = {
  BAG: DatasetType.Bag,
  BRK: DatasetType.Brk,
  HR: DatasetType.Hr,
}

const DataSelectionHeader: FunctionComponent = () => {
  const [view] = useParam(viewParam)
  const location = useLocation()
  const history = useHistory()
  const { buildQueryString } = useBuildQueryString()
  const { trackEvent } = useMatomo()
  const { activeFilters, totalResults } = useDataSelection()
  const { currentDatasetConfig, currentDatasetType, config } = useLegacyDataselectionConfig()
  if (!currentDatasetConfig) {
    return null
  }

  const isTableView = view === ViewMode.Full
  const datasetTitle = currentDatasetConfig.TITLE
  const showDownloadButton =
    view !== ViewMode.Split &&
    totalResults > 0 &&
    (!currentDatasetConfig.AUTH_SCOPE ||
      getScopes().includes(currentDatasetConfig.AUTH_SCOPE as AuthScope))

  const showTabs = view === ViewMode.Split
  const tabs = [DATASETS.BAG, DATASETS.HR, DATASETS.BRK].map((ds) => ({
    dataset: ds,
    title: config[ds].TITLE_TAB,
    path: config[ds].PATH,
    isActive: currentDatasetType === ds,
  }))

  const showNumberOfRecords = totalResults > 0 && currentDatasetConfig.SHOW_NUMBER_OF_RECORDS
  return (
    <>
      <Header>
        {view === ViewMode.Full && (
          <Heading data-test="data-selection-heading">
            {datasetTitle} {totalResults > 0 && <> ({totalResults.toLocaleString('NL-nl')})</>}
          </Heading>
        )}
        {view === ViewMode.Split && (
          <Heading data-test="data-selection-heading">Resultaten</Heading>
        )}

        <div>
          <Button
            variant="primaryInverted"
            as={RouterLink}
            title={`Resultaten in ${isTableView ? 'kaart' : 'tabel'} weergeven`}
            onClick={() => {
              trackEvent(DATASELECTION_MAP_BUTTON)
            }}
            iconSize={21}
            iconLeft={isTableView ? <Map /> : <Table />}
            // @ts-ignore
            to={{
              pathname: location.pathname,
              search: buildQueryString([[viewParam, isTableView ? ViewMode.Split : ViewMode.Full]]),
            }}
          >
            {`${isTableView ? 'Kaart' : 'Tabel'} weergeven`}
          </Button>
          {showDownloadButton && (
            <DataSelectionDownloadButton {...{ activeFilters, dataset: currentDatasetType }} />
          )}
        </div>
      </Header>
      {showTabs && (
        <StyledTabs label="An example of tabs" activeTab={currentDatasetType}>
          {tabs.map((tab) => (
            <Tab
              key={tab.dataset}
              id={tab.dataset}
              label={`${tab.title} ${
                currentDatasetType === tab.dataset && showNumberOfRecords
                  ? `(${totalResults?.toLocaleString('NL-nl')})`
                  : ''
              }`}
              onClick={() => {
                history.push({
                  ...location,
                  pathname: tab.path,
                })
              }}
            />
          ))}
        </StyledTabs>
      )}
    </>
  )
}

export default DataSelectionHeader
