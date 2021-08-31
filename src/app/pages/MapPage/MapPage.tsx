import {
  constants,
  ControlButton,
  Map as MapComponent,
  Scale,
  useStateRef,
} from '@amsterdam/arm-core'
import type { FunctionComponent } from 'react'
import { useCallback, useEffect } from 'react'
import type { Theme } from '@amsterdam/asc-ui'
import { breakpoint, themeSpacing } from '@amsterdam/asc-ui'
import styled, { createGlobalStyle, css } from 'styled-components'
import type L from 'leaflet'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import useParam from '../../hooks/useParam'
import { centerParam, panoPitchParam, zoomParam } from './query-params'
import { useIsEmbedded } from '../../contexts/ui'
import { useMapContext } from '../../contexts/map/MapContext'
import { useDataSelection } from '../../contexts/DataSelection/DataSelectionContext'
import BareBaseLayer from './components/BaseLayerToggle/BareBaseLayerToggle/BareBaseLayer'
import LeafletLayers from './LeafletLayers'
import MapMarker from './components/MapMarker'
import MapPanel from './components/MapPanel'
import PanoramaViewer from './components/PanoramaViewer/PanoramaViewer'
import { AFTER_PRINT, BEFORE_PRINT, PANORAMA_FULLSCREEN_TOGGLE } from './matomo-events'
import useCustomEvent from '../../hooks/useCustomEvent'
import Enlarge from './components/PanoramaViewer/enlarge.svg'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

const MapView = styled.div`
  height: 100%;
  position: relative;
  z-index: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const GlobalStyle = createGlobalStyle<{
  panoActive?: boolean
  panoFullScreen: boolean
  theme: Theme.ThemeInterface
  loading: boolean
  panelActive?: boolean
}>`
  body {
    touch-action: none;
    overflow: hidden; // This will prevent the scrollBar on iOS due to navigation bar
    @media print {
      overflow: auto;
    }
  }

  // Need to set the styled globally and not as a Styled Component as this will cause problems with leaflet calculating the map canvas / dimensions
  .leaflet-container {
    cursor: default;
    height: 100%;
    width: 100%;

    @media print {
      min-height: 100vh;
      page-break-after: always;
    }

    ${({ loading }) =>
      loading &&
      css`
        cursor: progress;
      `}

    ${({ panoFullScreen, panoActive }) =>
      panoFullScreen &&
      panoActive &&
      css`
        position: absolute !important; // !important to stop leaflet overriding with position: relative
        bottom: ${themeSpacing(5)};
        left: auto;
        width: 310px;
        height: 178px;
        min-height: 178px;
        transition: left 0.25s ease-in-out;
        z-index: 901;
        border: 1px solid #ccc;
        @media screen and ${breakpoint('min-width', 'laptopL')} {
          width: 465px;
          height: 267px;
          min-height: 267px;
        }
      `}

    // MapPanel is inactive and panorama full screen
    ${({ panoFullScreen, panelActive, panoActive }) =>
      panoFullScreen &&
      panoActive &&
      !panelActive &&
      css`
        left: ${themeSpacing(10)};
      `}

    // MapPanel is active (width + spacing) and panorama is full screen
    ${({ panoFullScreen, panelActive, panoActive }) =>
      panoFullScreen &&
      panoActive &&
      panelActive &&
      css`
        left: 405px;
        @media screen and ${breakpoint('min-width', 'laptopM')} {
          left: 645px;
        }
      `}

    // Map and Panorama are 50%-50% height
    ${({ panoFullScreen, panoActive }) =>
      !panoFullScreen &&
      panoActive &&
      css`
        height: 50%;
      `}

    ${({ panoFullScreen, panoActive }) =>
      !panoFullScreen &&
      panoActive &&
      css`
        position: sticky !important;
      `}
  }

  // Todo: figure out why leaflet css is overriding this
  .arm__icon--clustergroup-default {
    display: flex !important;
  }

  .leaflet-control-container .leaflet-control-scale {
    margin: ${themeSpacing(0, 16, 4, 0)} !important;
  }

  // Hide scale if panorama is full screen (map is mini)
  ${({ panoFullScreen, panoActive }) =>
    panoFullScreen &&
    panoActive &&
    css`
      .leaflet-control-scale {
        display: none;
      }
    `}
`

const ResizeButton = styled(ControlButton)<{ panelActive?: boolean }>`
  position: absolute;
  bottom: ${themeSpacing(9)};
  left: ${themeSpacing(15)};
  z-index: 902;
  transition: left 0.25s ease-in-out;

  ${(props) =>
    props.panelActive &&
    css`
      left: 425px;
      @media screen and ${breakpoint('min-width', 'laptopM')} {
        left: 665px;
      }
    `}
`

const { DEFAULT_AMSTERDAM_MAPS_OPTIONS } = constants

const MapPage: FunctionComponent = () => {
  const { panoFullScreen, setPanoFullScreen, loading, panoActive, drawerState } = useMapContext()
  const { drawToolLocked } = useDataSelection()
  const [, setMapInstance, mapInstanceRef] = useStateRef<L.Map | null>(null)
  const [center, setCenter] = useParam(centerParam)
  const [zoom, setZoom] = useParam(zoomParam)
  const [panoPitch] = useParam(panoPitchParam)
  const isEmbedded = useIsEmbedded()
  const { trackEvent } = useMatomo()

  const onHandleBeforePrint = () => {
    trackEvent(BEFORE_PRINT)
  }

  const onHandleAfterPrint = () => {
    trackEvent(AFTER_PRINT)
  }

  // This is necessary to call, because we resize the map dynamically
  // https://leafletjs.com/reference-1.7.1.html#map-invalidatesize
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize()
    }
  }, [panoActive, panoPitch, mapInstanceRef])

  useEffect(() => {
    mapInstanceRef.current?.setZoom(zoom)
  }, [zoom])

  useCustomEvent(window, 'beforeprint', onHandleBeforePrint)
  useCustomEvent(window, 'afterprint', onHandleAfterPrint)

  return (
    <MapView>
      <GlobalStyle
        loading={loading}
        panoActive={panoActive}
        panoFullScreen={panoFullScreen}
        panelActive={drawerState === 'OPEN'}
      />
      <MapComponent
        setInstance={setMapInstance}
        options={{
          ...DEFAULT_AMSTERDAM_MAPS_OPTIONS,
          zoom: zoom ?? DEFAULT_AMSTERDAM_MAPS_OPTIONS.zoom,
          center: center ?? DEFAULT_AMSTERDAM_MAPS_OPTIONS.center,
          attributionControl: false,
          minZoom: 7,
          scrollWheelZoom: !isEmbedded,
        }}
        events={{
          zoomend: useCallback(() => {
            if (mapInstanceRef?.current) {
              setZoom(mapInstanceRef.current.getZoom(), 'replace')
            }
          }, [mapInstanceRef, setZoom]),
          moveend: useCallback(() => {
            if (mapInstanceRef?.current) {
              setCenter(mapInstanceRef.current.getCenter(), 'replace')
            }
          }, [mapInstanceRef, setCenter]),
        }}
      >
        <BareBaseLayer />

        <LeafletLayers />
        {panoActive && <PanoramaViewer />}
        {!drawToolLocked && <MapMarker panoActive={panoActive} />}
        <MapPanel />

        <Scale
          options={{
            position: 'bottomright',
            metric: true,
            imperial: false,
          }}
        />

        {panoActive && panoFullScreen && (
          <ResizeButton
            type="button"
            variant="blank"
            title="Kaart vergroten"
            size={44}
            iconSize={40}
            data-testid="panoramaMapEnlarge"
            onClick={() => {
              trackEvent({
                ...PANORAMA_FULLSCREEN_TOGGLE,
                name: 'volledig',
              })
              setPanoFullScreen(false)
            }}
            icon={<Enlarge />}
            panelActive={drawerState === 'OPEN'}
          />
        )}
      </MapComponent>
    </MapView>
  )
}

export default MapPage
