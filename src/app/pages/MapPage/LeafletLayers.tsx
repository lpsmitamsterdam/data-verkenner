import { NonTiledLayer } from '@amsterdam/arm-nontiled'
import { GeoJSON, TileLayer } from '@amsterdam/react-maps'
import type { GeoJSON as GeoJSONType, GeoJSONOptions } from 'leaflet'
import { Icon, Marker } from 'leaflet'
import type { FunctionComponent } from 'react'
import { useCallback, useMemo, useState } from 'react'
import useMapCenterToMarker from '../../hooks/useMapCenterToMarker'
import DrawMapVisualization from './components/DrawTool/DrawMapVisualization'
import { DETAIL_ICON } from './config'
import MAP_CONFIG from './legacy/services/map.config'
import type { TmsOverlay, WmsOverlay } from '../../contexts/map/MapContext'
import { useMapContext } from '../../contexts/map/MapContext'
import useCustomEvent from '../../hooks/useCustomEvent'
import useParam from '../../hooks/useParam'
import { customMapLayer, mapLayersParam } from './query-params'

const detailGeometryStyle = {
  color: 'red',
  fillColor: 'red',
  weight: 2,
  opacity: 1.6,
  fillOpacity: 0.2,
}

const detailGeometryOptions: GeoJSONOptions = {
  style: detailGeometryStyle,
  pointToLayer(feature, latLng) {
    const icon = new Icon(DETAIL_ICON)

    return new Marker(latLng, {
      icon,
      alt: 'Locatie van detailweergave',
    })
  },
}

const LeafletLayers: FunctionComponent = () => {
  const [geoJSONLayer, setGeoJSONLayer] = useState<GeoJSONType<any>>()
  const [customMapLayers] = useParam(customMapLayer)
  const { legendLeafletLayers, detailFeature } = useMapContext()
  const [activeLayers] = useParam(mapLayersParam)
  const activeCustomMapLayer = customMapLayers?.filter(({ id }) => activeLayers.includes(id))
  const { panToWithPanelOffset, panToFitPrintMode } = useMapCenterToMarker()
  const tmsLayers = useMemo(
    () => legendLeafletLayers.filter((overlay): overlay is TmsOverlay => overlay.type === 'tms'),
    [legendLeafletLayers],
  )

  const wmsLayers = useMemo(
    () => legendLeafletLayers.filter((overlay): overlay is WmsOverlay => overlay.type === 'wms'),
    [legendLeafletLayers],
  )

  const onHandleBeforePrint = useCallback(() => {
    if (geoJSONLayer) {
      panToFitPrintMode(geoJSONLayer.getBounds())
    }
  }, [geoJSONLayer])

  const onHandleAfterPrint = useCallback(() => {
    if (geoJSONLayer) {
      panToWithPanelOffset(geoJSONLayer.getBounds())
    }
  }, [geoJSONLayer])

  useCustomEvent(window, 'beforeprint', onHandleBeforePrint)
  useCustomEvent(window, 'afterprint', onHandleAfterPrint)

  /**
   * Center the map and zoom in to the detail object
   * @param layer
   */
  const handleDetailFeatureOnLoad = (layer: GeoJSONType<any>) => {
    setGeoJSONLayer(layer)
    panToWithPanelOffset(layer.getBounds())
    layer.bringToBack()
  }

  return (
    <>
      <DrawMapVisualization />
      {activeCustomMapLayer?.map(({ options, url, id }) => (
        <NonTiledLayer key={id} url={`https://map.data.amsterdam.nl${url}`} options={options} />
      ))}
      {detailFeature && (
        <GeoJSON
          key={detailFeature.id}
          args={[detailFeature]}
          options={detailGeometryOptions}
          setInstance={handleDetailFeatureOnLoad}
        />
      )}
      {tmsLayers.map(({ id, url, options }) => (
        <TileLayer
          key={id}
          args={[url]}
          // @ts-ignore
          options={{
            ...MAP_CONFIG.BASE_LAYER_OPTIONS,
            ...options,
          }}
        />
      ))}
      {wmsLayers.map(({ url, options, id, params }) => (
        <NonTiledLayer key={id} url={url} options={options} params={params} />
      ))}
    </>
  )
}

export default LeafletLayers
