import styled from 'styled-components'
import type { FunctionComponent } from 'react'
import { themeSpacing } from '@amsterdam/asc-ui'
import Control from '../Control'
import BaseLayerToggle from '../BaseLayerToggle'
import MapContextMenu from '../MapContextMenu/MapContextMenu'
import { useIsEmbedded } from '../../../../contexts/ui'
import { useMapContext } from '../../../../contexts/map/MapContext'
import PanoramaMapMinimizeButton from '../PanoramaMapMinimizeButton'

const StyledControl = styled(Control)`
  margin-left: ${themeSpacing(2)};
`

const PanoramaMapMinimizeControl = styled(Control)`
  margin-right: ${themeSpacing(6)};
`

const Wrapper = styled.div`
  order: 3;
  display: inline-flex;
  align-self: flex-start;
  @media print {
    display: none;
  }
`

const MapMenuControl: FunctionComponent = () => {
  const isEmbedded = useIsEmbedded()
  const { panoActive } = useMapContext()
  return (
    <Wrapper style={isEmbedded ? { display: 'none' } : undefined} data-testid="mapMenuControls">
      {panoActive && (
        <PanoramaMapMinimizeControl>
          <PanoramaMapMinimizeButton />
        </PanoramaMapMinimizeControl>
      )}
      <Control>
        <BaseLayerToggle />
      </Control>
      <StyledControl>
        <MapContextMenu />
      </StyledControl>
    </Wrapper>
  )
}

export default MapMenuControl
