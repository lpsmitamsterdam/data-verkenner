import type { FunctionComponent } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { Button, TextField, themeSpacing } from '@amsterdam/asc-ui'
import useParam from '../../../../hooks/useParam'
import { useMapContext } from '../../../../contexts/map/MapContext'
import { customMapLayer, mapLayersParam } from '../../query-params'
import useFuse from '../../../../hooks/useFuse'
import LayerCollection from './LayerCollection'
import type { ExtendedMapGroup } from '../../legacy/services'
import CustomMapLayerModal from '../CustomMapLayer/CustomMapLayerModal'
import CustomLayerCollection from './CustomLayerCollection'
import { CUSTOM_MAP_LAYERS, isFeatureEnabled } from '../../../../features'

const MapPanelContent = styled.div`
  margin: ${themeSpacing(3, 0)};
  padding: ${themeSpacing(0, 3)};
`

const MapPanelWrapper = styled.div`
  margin-top: ${themeSpacing(4)};
`

const MapLayersPanel: FunctionComponent = () => {
  const { panelLayers } = useMapContext()
  const [customLayerOpen, setCustomLayerOpen] = useState(false)
  const [editId, setEditId] = useState<string>()
  const [customMapLayers] = useParam(customMapLayer)
  const [activeLayers, setActiveMapLayers] = useParam(mapLayersParam)
  const { query, updateQuery, results } = useFuse(panelLayers, {
    keys: ['title', 'mapLayers.title', 'mapLayers.legendItems.title'],
    threshold: 0.2,
    findAllMatches: true,
    includeMatches: true,
    minMatchCharLength: 2,
  })

  const onAddLayers = (layers: string[]) => {
    if (layers) {
      setActiveMapLayers([...activeLayers, ...layers])
    }
  }

  const onRemoveLayers = (layers: string[]) => {
    setActiveMapLayers(activeLayers.filter((layer) => !layers.includes(layer)))
  }

  const onEdit = (id: string) => {
    setCustomLayerOpen(true)
    setEditId(id)
  }

  return (
    <MapPanelContent data-testid="legendPanel">
      <TextField
        type="text"
        id="mapLegendSearchBar"
        onChange={(e) => updateQuery(e.target.value)}
        onClear={() => updateQuery('')}
        value={query}
        placeholder="Zoek op kaartlaag"
      />
      {isFeatureEnabled(CUSTOM_MAP_LAYERS) && (
        <>
          <Button
            variant="primary"
            onClick={() => {
              setEditId(undefined)
              setCustomLayerOpen(true)
            }}
          >
            Tijdelijke kaartlaag toevoegen
          </Button>
          <CustomMapLayerModal
            onClose={() => setCustomLayerOpen(false)}
            open={customLayerOpen}
            editId={editId}
          />
        </>
      )}

      <MapPanelWrapper data-testid="mapPanel" aria-label="Kaartlagen legenda">
        {!!customMapLayers?.length && (
          <CustomLayerCollection
            customMapLayers={customMapLayers}
            onAddLayers={onAddLayers}
            onRemoveLayers={onRemoveLayers}
            onEdit={onEdit}
          />
        )}

        {results.map(({ item: { id, mapLayers, title }, matches }) => (
          <LayerCollection
            matches={matches}
            onAddLayers={onAddLayers}
            onRemoveLayers={onRemoveLayers}
            key={id}
            activeMapLayers={mapLayers as ExtendedMapGroup[]}
            title={title}
          />
        ))}
      </MapPanelWrapper>
    </MapPanelContent>
  )
}

export default MapLayersPanel
