import type { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Button, Icon, themeColor, themeSpacing } from '@amsterdam/asc-ui'
import SearchPlus from '../../../../shared/assets/icons/search-plus.svg'
import useParam from '../../../../shared/hooks/useParam'
import { zoomParam } from '../../query-params'

interface MapLayerZoomButtonProps {
  minZoom: number
}

const ZoomIcon = styled(Icon)`
  svg path {
    fill: ${themeColor('primary', 'main')};
  }
`

const ZoomButton = styled(Button)`
  margin: 0 ${themeSpacing(3)} 0 auto;
  order: 0;
`

const LayerLegendZoomButton: FunctionComponent<MapLayerZoomButtonProps> = ({ minZoom }) => {
  const [zoom, setZoom] = useParam(zoomParam)

  return zoom < minZoom ? (
    <ZoomButton
      title="Kaartlaag zichtbaar bij verder inzoomen"
      size={26}
      variant="blank"
      onClick={(event) => {
        event.stopPropagation()
        setZoom(minZoom)
      }}
    >
      <ZoomIcon size={16}>
        <SearchPlus />
      </ZoomIcon>
    </ZoomButton>
  ) : null
}

export default LayerLegendZoomButton
