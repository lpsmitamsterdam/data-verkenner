import type { FunctionComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import useParam from '../../hooks/useParam'
import MapPage from './MapPage'
import { ViewMode, viewParam } from './query-params'
import DataSelection from '../../components/DataSelection/DataSelection'
import { routing } from '../../routes'
import MapProvider from './MapProvider'

const MapContainer: FunctionComponent = ({ children }) => {
  const [view] = useParam(viewParam)

  return (
    <MapProvider>
      <Switch>
        <Route
          path={[
            routing.addresses.path,
            routing.establishments.path,
            routing.cadastralObjects.path,
          ]}
          exact
        >
          {view === ViewMode.Full ? <DataSelection /> : <MapPage>{children}</MapPage>}
        </Route>
        <Route path="*" component={MapPage} />
      </Switch>
    </MapProvider>
  )
}

export default MapContainer
