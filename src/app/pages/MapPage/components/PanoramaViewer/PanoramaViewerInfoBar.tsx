import styled, { css } from 'styled-components'
import type { FunctionComponent } from 'react'
import { themeSpacing } from '@amsterdam/asc-ui'
import ViewerInfoBar from '../../../../components/ViewerInfoBar/ViewerInfoBar'
import useParam from '../../../../hooks/useParam'
import { locationParam } from '../../query-params'
import Control from '../Control'
import { useMapContext } from '../../../../contexts/map/MapContext'

const StyledControl = styled(Control)<{ panoFullScreen?: boolean }>`
  order: 2;
  align-self: flex-end;
  ${({ panoFullScreen }) =>
    !panoFullScreen &&
    css`
      transform: translateY(-${themeSpacing(3)});
    `}
`

const PanoramaViewerInfoBar: FunctionComponent = () => {
  const [location] = useParam(locationParam)
  const { panoFullScreen, panoImageDate, drawerState } = useMapContext()
  return location && panoImageDate ? (
    <StyledControl panoFullScreen={panoFullScreen}>
      <ViewerInfoBar
        date={panoImageDate}
        location={location}
        panoFullScreen={panoFullScreen}
        panelActive={drawerState === 'OPEN'}
      />
    </StyledControl>
  ) : null
}

export default PanoramaViewerInfoBar
