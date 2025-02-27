import { Checkmark } from '@amsterdam/asc-assets'
import {
  Button,
  ContextMenu,
  ContextMenuItem,
  ContextMenuSelect,
  Icon,
  themeColor,
  themeSpacing,
} from '@amsterdam/asc-ui'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { TileLayerOptions } from 'leaflet'
import styled from 'styled-components'
import { constants } from '@amsterdam/arm-core'
import BareBaseLayer from './BareBaseLayer'

// @ts-ignore
import AerialBackground from './images/aerial-background.png'
// @ts-ignore
import AerialBackgroundRetina from './images/aerial-background@2.png'
// @ts-ignore
import TopoBackground from './images/topo-background.png'
// @ts-ignore
import TopoBackgroundRetina from './images/topo-background@2.png'

export enum BaseLayerType {
  Aerial = 'luchtfoto',
  Topo = 'topografie',
}

const { AERIAL_AMSTERDAM_LAYERS, DEFAULT_AMSTERDAM_LAYERS } = constants
const BASE_LAYER_STYLE = {
  [BaseLayerType.Aerial]: {
    background: [AerialBackground, AerialBackgroundRetina],
    color: 'white',
  },
  [BaseLayerType.Topo]: {
    background: [TopoBackground, TopoBackgroundRetina],
    color: 'black',
  },
}

interface ToggleButtonProps {
  layerType: BaseLayerType
}

const Wrapper = styled.div`
  background-color: rgb(0, 0, 0, 0.1);
  padding: 0;
  display: flex;
`

const ToggleButton = styled(Button)<ToggleButtonProps>`
  padding: ${themeSpacing(3, 4)};
  align-self: self-start;
  text-align: left;
  background: ${({ layerType }) => `url(${BASE_LAYER_STYLE[layerType].background[0] as string})`};
  text-transform: capitalize;
  width: 44px;
  margin-right: 2px;

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    background: ${({ layerType }) => `url(${
      BASE_LAYER_STYLE[layerType].background[1] as string
    }) no-repeat top left /
      120px 44px`};
  }

  &:focus {
    z-index: 2;
  }
`
const Menu = styled(ContextMenu)`
  & > button {
    border: none;
    height: 44px;
    min-width: 44px;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: ${themeColor('tint', 'level3')};
    }
  }
  div[role='menu'] {
    max-height: 270px;
    overflow: auto;
    justify-content: flex-start;
    white-space: nowrap;
  }
`

const CheckmarkIcon = styled(Icon)`
  padding-left: ${themeSpacing(3)};
`

const StyledContextMenuItem = styled(ContextMenuItem)`
  justify-content: flex-start;
  padding-left: ${themeSpacing(6)};
  & > span:first-of-type {
    padding-left: 0;
    margin: ${themeSpacing(1, 1, 1, -4)};
  }
`

interface Props {
  onChangeLayer?: (id: string, type: BaseLayerType) => void
  aerialLayers?: constants.MapLayer[]
  topoLayers?: constants.MapLayer[]
  aerialDefaultIndex?: number
  topoDefaultIndex?: number
  activeLayer?: BaseLayerType
  options?: TileLayerOptions
}

const BareBaseLayerToggle: React.FC<Props> = ({
  onChangeLayer,
  aerialLayers = AERIAL_AMSTERDAM_LAYERS,
  topoLayers = DEFAULT_AMSTERDAM_LAYERS,
  aerialDefaultIndex = 0,
  topoDefaultIndex = 0,
  activeLayer = BaseLayerType.Topo,
  options,
}) => {
  const didMount = useRef(false)
  const [toggleBaseLayerType, setToggleBaseLayerType] = useState(activeLayer)
  const baseLayers = useMemo(() => {
    return {
      [BaseLayerType.Aerial]: aerialLayers,
      [BaseLayerType.Topo]: topoLayers,
    }
  }, [aerialLayers, topoLayers])

  const [selectedLayer, setSelectedLayer] = useState({
    [BaseLayerType.Aerial]: aerialLayers[aerialDefaultIndex].urlTemplate,
    [BaseLayerType.Topo]: topoLayers[topoDefaultIndex].urlTemplate,
  })

  const currentAmsterdamLayers =
    toggleBaseLayerType === BaseLayerType.Topo ? topoLayers : aerialLayers

  const handleToggle = useCallback(() => {
    setToggleBaseLayerType(
      toggleBaseLayerType === BaseLayerType.Aerial ? BaseLayerType.Topo : BaseLayerType.Aerial,
    )
  }, [toggleBaseLayerType])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLSelectElement>, layers: constants.MapLayer[]) => {
      const { value } = e.currentTarget

      const layer = layers.find(({ id }) => id === value)

      if (layer) {
        setSelectedLayer({
          ...selectedLayer,
          [toggleBaseLayerType]: layer.urlTemplate,
        })
      }
    },
    [toggleBaseLayerType],
  )

  const layerTypeForButton = useMemo(
    () => (toggleBaseLayerType === BaseLayerType.Topo ? BaseLayerType.Aerial : BaseLayerType.Topo),
    [toggleBaseLayerType],
  )

  useEffect(() => {
    const id = currentAmsterdamLayers.find(
      ({ urlTemplate }) => urlTemplate === selectedLayer[toggleBaseLayerType],
    )?.id
    if (didMount.current && onChangeLayer && id) {
      onChangeLayer(id, toggleBaseLayerType)
    }
    didMount.current = true
  }, [toggleBaseLayerType, selectedLayer])
  return (
    <Wrapper>
      <ToggleButton
        variant="blank"
        title="Wissel tussen luchtfoto's of een topografische kaarten"
        onClick={handleToggle}
        layerType={layerTypeForButton}
        data-testid="baseLayerToggle"
      />
      {baseLayers[toggleBaseLayerType].length > 1 && (
        <Menu
          data-test="context-menu"
          title="Actiemenu"
          selectElementForTouchScreen={
            <>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label style={{ display: 'none' }} htmlFor="arm-baselayer-toggle-select">
                Open menu
              </label>
              <ContextMenuSelect
                name="context-menu"
                id="arm-baselayer-toggle-select"
                onChange={(e) => handleChange(e, currentAmsterdamLayers)}
              >
                {baseLayers[toggleBaseLayerType].map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </ContextMenuSelect>
            </>
          }
          position="bottom"
        >
          {baseLayers[toggleBaseLayerType].map(({ id, label, urlTemplate }) => (
            <StyledContextMenuItem
              key={id}
              onClick={(e) => {
                setSelectedLayer({
                  ...selectedLayer,
                  [toggleBaseLayerType]: urlTemplate,
                })
                e.currentTarget.blur()
              }}
              icon={
                urlTemplate === selectedLayer[toggleBaseLayerType] ? (
                  <CheckmarkIcon inline size={12}>
                    <Checkmark />
                  </CheckmarkIcon>
                ) : null
              }
            >
              {label}
            </StyledContextMenuItem>
          ))}
        </Menu>
      )}
      <BareBaseLayer options={options} baseLayer={selectedLayer[toggleBaseLayerType]} />
    </Wrapper>
  )
}

export default BareBaseLayerToggle
