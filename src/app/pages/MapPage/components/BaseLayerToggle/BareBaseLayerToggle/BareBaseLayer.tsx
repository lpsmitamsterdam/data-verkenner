import { TileLayer } from '@amsterdam/react-maps'
import type { TileLayer as TileLayerType, TileLayerOptions } from 'leaflet'
import { useEffect, useState } from 'react'
import { constants } from '@amsterdam/arm-core'

interface Props {
  baseLayer?: string
  options?: TileLayerOptions
}

const BareBaseLayer: React.FC<Props> = ({
  baseLayer = constants.DEFAULT_AMSTERDAM_LAYERS[0].urlTemplate,
  options = {
    subdomains: ['t1', 't2', 't3', 't4'],
    tms: true,
  },
}) => {
  const [baseLayerInstance, setBaseLayerInstance] = useState<TileLayerType>()

  useEffect(() => {
    if (baseLayer && baseLayerInstance) {
      baseLayerInstance.setUrl(baseLayer)
    }
  }, [baseLayer, baseLayerInstance])

  return <TileLayer setInstance={setBaseLayerInstance} args={[baseLayer]} options={options} />
}

export default BareBaseLayer
