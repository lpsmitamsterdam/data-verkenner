import styled from 'styled-components'
import type { FunctionComponent } from 'react'
import { themeSpacing } from '@amsterdam/asc-ui'
import Control from '../Control'
import BaseLayerToggle from '../BaseLayerToggle'
import MapContextMenu from '../MapContextMenu/MapContextMenu'

const StyledControl = styled(Control)`
  margin-left: ${themeSpacing(2)};
`

const Wrapper = styled.div`
  order: 3;
  display: inline-flex;
  align-self: flex-start;
  @media print {
    display: none;
  }
`

const MapMenuControl: FunctionComponent = () => (
  <Wrapper data-testid="mapMenuControls">
    <Control>
      <BaseLayerToggle />
    </Control>
    <StyledControl>
      <MapContextMenu />
    </StyledControl>
  </Wrapper>
)

export default MapMenuControl
