import React, { useState } from 'react'
import styled from '@datapunt/asc-core'
import { Heading, themeSpacing } from '@datapunt/asc-ui'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ChevronUp } from '@datapunt/asc-assets'
import MapLegend from '../../components/legend/MapLegend'
import MapPanelHandle from '../../components/panel-handle/MapPanelHandle'
import MapType from '../../components/type/MapType'
import MapLayers from '../../components/layers/MapLayers'
import MapLayer from '../../components/layers/MapLayer'
import MapLegendVariantOne from '../../components/legend/MapLegendVariantOne'

const StyledHeading = styled(Heading)`
  padding: 0 ${themeSpacing(3)};
`

export const VARIANTS = {
  one: 'map-panel-1',
  two: 'map-panel-2',
}

const MapPanel = ({
  isMapPanelVisible,
  activeBaseLayer,
  mapBaseLayers,
  onBaseLayerToggle,
  panelLayers,
  onMapPanelHandleToggle,
  activeMapLayers,
  onMapPanelToggle,
  onLayerToggle,
  onLayerVisibilityToggle,
  overlays,
  user,
  printMode,
  zoomLevel,
  variant,
  isMapPanelHandleVisible: mapPanelHandleVisisble,
}) => {
  const scrollWrapperRef = React.useRef(null)
  const [updateFlash, setUpdateFlash] = useState()
  let timeoutId

  const handleOnLayerToggle = (...options) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setUpdateFlash(true)
    onLayerToggle(...options)
    timeoutId = setTimeout(() => {
      setUpdateFlash(false)
    }, 1)
  }

  const headingClasses = classNames({
    flash: updateFlash,
    'flash--hidden': !updateFlash,
  })

  const sordedActiveLayers = []
  panelLayers.forEach(({ mapLayers }) =>
    mapLayers.forEach(({ id }) => {
      const layer = activeMapLayers.find(({ id: activeId }) => activeId === id)
      if (layer) {
        sordedActiveLayers.push(layer)
      }
    }),
  )

  return (
    <section
      aria-label={
        isMapPanelVisible
          ? 'Kaartlagen legenda, Kaartlagen verbergen'
          : 'Kaartlagen legenda, Kaartlagen tonen'
      }
      aria-expanded={isMapPanelVisible}
      className={`
          map-panel
          map-panel--${isMapPanelVisible ? 'expanded' : 'collapsed'}
          map-panel--has${activeMapLayers.length > 0 ? '' : '-no'}-active-layers
        `}
    >
      <div className={`map-panel__heading ${typeof updateFlash !== 'undefined' && headingClasses}`}>
        <button
          type="button"
          className="map-panel__toggle"
          onClick={onMapPanelToggle}
          title={isMapPanelVisible ? 'Kaartlagen verbergen' : 'Kaartlagen tonen'}
        >
          <span className="map-panel__heading-icon" />
          <h2 className="map-panel__heading-title" aria-hidden="true">
            Kaartlagen
          </h2>
          <span
            className={`
              map-panel__toggle--icon
              map-panel__toggle--icon-${isMapPanelVisible ? 'collapse' : 'expand'}
            `}
          >
            <ChevronUp />
          </span>
        </button>
      </div>
      <div className="scroll-wrapper" ref={scrollWrapperRef}>
        {variant !== VARIANTS.one && activeMapLayers.length > 0 && (
          <MapLegend
            activeMapLayers={variant !== VARIANTS.two ? sordedActiveLayers : activeMapLayers}
            onLayerToggle={onLayerToggle}
            onLayerVisibilityToggle={onLayerVisibilityToggle}
            overlays={overlays}
            user={user}
            zoomLevel={zoomLevel}
            printMode={printMode}
          />
        )}
        <MapPanelHandle
          isMapPanelHandleVisible={mapPanelHandleVisisble}
          onMapPanelHandleToggle={onMapPanelHandleToggle}
        >
          <MapType
            activeBaseLayer={activeBaseLayer}
            baseLayers={mapBaseLayers}
            onBaseLayerToggle={onBaseLayerToggle}
          />
          {variant === VARIANTS.one &&
            panelLayers.map(({ id, mapLayers, title }) => (
              <React.Fragment key={id}>
                <StyledHeading forwardedAs="h4">{title}</StyledHeading>
                <MapLegendVariantOne
                  activeMapLayers={mapLayers}
                  onLayerToggle={onLayerToggle}
                  onLayerVisibilityToggle={onLayerVisibilityToggle}
                  overlays={overlays}
                  user={user}
                  zoomLevel={zoomLevel}
                  printMode={printMode}
                />
              </React.Fragment>
            ))}
          {variant !== VARIANTS.one && variant !== VARIANTS.two && (
            <MapLayers
              activeMapLayers={activeMapLayers}
              panelLayers={panelLayers}
              onLayerToggle={onLayerToggle}
            />
          )}
          {variant === VARIANTS.two && (
            <div className="map-layers">
              <h3 className="u-sr-only">Beschikbare kaartlagen</h3>
              <ul>
                {panelLayers.map(({ id, title, mapLayers }) => (
                  <MapLayer
                    key={id}
                    {...{ id, title, mapLayers, activeMapLayers, panelLayers }}
                    onLayerToggle={handleOnLayerToggle}
                  />
                ))}
              </ul>
            </div>
          )}
        </MapPanelHandle>
      </div>
    </section>
  )
}

MapPanel.defaultProps = {
  activeMapLayers: [],
  isMapPanelVisible: true,
  map: {},
  mapBaseLayers: {},
  panelLayers: [],
  user: {},
  zoomLevel: 0,
}

MapPanel.propTypes = {
  activeBaseLayer: PropTypes.string.isRequired,
  activeMapLayers: PropTypes.array, // eslint-disable-line
  isMapPanelHandleVisible: PropTypes.bool.isRequired,
  isMapPanelVisible: PropTypes.bool,
  printMode: PropTypes.bool.isRequired,
  map: PropTypes.object, // eslint-disable-line
  mapBaseLayers: PropTypes.object, // eslint-disable-line
  panelLayers: PropTypes.arrayOf(PropTypes.object),
  onBaseLayerToggle: PropTypes.func.isRequired,
  onLayerToggle: PropTypes.func.isRequired,
  onLayerVisibilityToggle: PropTypes.func.isRequired,
  onMapPanelHandleToggle: PropTypes.func.isRequired,
  onMapPanelToggle: PropTypes.func.isRequired,
  overlays: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({}),
  zoomLevel: PropTypes.number,
}

export default MapPanel
