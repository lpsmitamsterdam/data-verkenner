import type { FunctionComponent } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { Alert, Link, themeColor } from '@amsterdam/asc-ui'
import LayerCollectionButton from './LayerCollectionButton'
import LayerLegend from './LayerLegend'
import type { CustomMapLayer } from '../../query-params'
import { mapLayersParam } from '../../query-params'
import useParam from '../../../../utils/useParam'
import LayerGroup from './LayerGroup'

const StyledLayerCollectionButton = styled(LayerCollectionButton)`
  background-color: ${themeColor('support', 'focus')};
`

const CustomLayerCollection: FunctionComponent<{
  customMapLayers: CustomMapLayer[]
  onAddLayers: (layers: string[]) => void
  onRemoveLayers: (layers: string[]) => void
  onEdit?: (id: string) => void
}> = ({ customMapLayers, onAddLayers, onRemoveLayers, onEdit }) => {
  const [activeLayers] = useParam(mapLayersParam)
  const [open, setOpen] = useState(false)
  const activeCustomMapLayer = customMapLayers.filter(({ id }) => activeLayers.includes(id))
  return (
    <>
      <StyledLayerCollectionButton
        allVisible={activeCustomMapLayer.length === customMapLayers.length}
        onClick={() => setOpen((currentValue) => !currentValue)}
        collectionIndeterminate={!!activeCustomMapLayer.length}
        title="Tijdelijke kaartlagen"
        isOpen={open}
      />
      {open && (
        <>
          <Alert level="warning">
            Let op: dit zijn kaartlagen die tijdelijk zijn toegevoegd via deze URL om te testen. Als
            deze kaartlagen dienen te worden toegevoegd onder een collectie,{' '}
            <Link href="mailto:datapunt@amsterdam.nl" variant="inline">
              neem dan contact op
            </Link>
          </Alert>
          {customMapLayers.map((item) => {
            return !item.legendItems?.length ? (
              <LayerLegend
                key={item.id}
                onAddLayers={onAddLayers}
                onRemoveLayers={onRemoveLayers}
                onEdit={onEdit}
                legendItem={{
                  id: item.id,
                  title: item.title,
                  isVisible: activeLayers.includes(item.id),
                  notSelectable: false,
                  iconUrl: item.iconUrl,
                  minZoom: 0,
                  authScope: null,
                }}
              />
            ) : (
              <LayerGroup
                key={item.id}
                // @ts-ignore
                mapGroup={item}
                layerIsChecked
                layerIsIndeterminate={false}
                addOrRemoveLayer={onAddLayers}
                onEdit={onEdit}
                isEmbedView={false}
                onAddLayers={onAddLayers}
                onRemoveLayers={onRemoveLayers}
              />
            )
          })}
        </>
      )}
    </>
  )
}

export default CustomLayerCollection
