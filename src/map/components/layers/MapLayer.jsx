import React, { useState } from 'react'
import styled, { css } from '@datapunt/asc-core'
import { Icon, styles } from '@datapunt/asc-ui'
import { ChevronDown } from '@datapunt/asc-assets'
import PropTypes from 'prop-types'
import { useMatomo } from '@datapunt/matomo-tracker-react'

const LayerButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  background-color: transparent;

  ${styles.IconStyle} {
    margin-right: 3px;
    ${({ open }) =>
      open &&
      css`
        transform: rotate(180deg);
      `}
  }
`

const MapLayer = ({ id, activeMapLayers, onLayerToggle, title, mapLayers }) => {
  const { trackEvent } = useMatomo()
  const [open, setOpen] = useState(false)

  const handleLayerToggle = (collectionTitle, layer) => {
    // Sanitize the collection title to use it as action
    const action = collectionTitle.toLowerCase().replace(/[: ][ ]*/g, '_')

    onLayerToggle(layer)
    trackEvent({
      category: 'kaartlaag',
      action,
      name: layer.title,
    })
  }

  return (
    <li className="map-layers__category" key={id}>
      <LayerButton type="button" onClick={() => setOpen(!open)} open={open}>
        <h4 className="map-layers__category-text">{title}</h4>
        <Icon size={20}>
          <ChevronDown />
        </Icon>
      </LayerButton>
      {open && (
        <ul>
          {mapLayers.map((layer) => (
            <li
              className={`
                      map-layers__title
                      map-layers__title--${
                        activeMapLayers.some((mapLayer) => layer.title === mapLayer.title)
                          ? 'active'
                          : 'inactive'
                      }
                    `}
              key={layer.title}
            >
              <button type="button" onClick={() => handleLayerToggle(title, layer)}>
                <span className="map-layers__toggle-title">{layer.title}</span>
                <span className="map-layers__toggle map-layers__toggle--remove" />
                <span className="map-layers__toggle map-layers__toggle--add" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

/* eslint-disable */
MapLayer.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  mapLayers: PropTypes.arrayOf(PropTypes.object),
  activeMapLayers: PropTypes.array,
  panelLayers: PropTypes.array,
  onLayerToggle: PropTypes.func.isRequired,
}
/* eslint-enable */

export default MapLayer
