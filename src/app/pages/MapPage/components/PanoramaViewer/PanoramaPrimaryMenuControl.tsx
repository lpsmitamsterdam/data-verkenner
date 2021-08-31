import { Hidden } from '@amsterdam/asc-ui'
import type { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useMapContext } from '../../../../contexts/map/MapContext'
import PanoramaCloseButton from './PanoramaCloseButton'
import PanoramaMenuControl from './PanoramaMenuControl'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
`

const PanoramaPrimaryMenuControl: FunctionComponent = () => {
  const { panoActive } = useMapContext()

  if (panoActive) {
    return (
      <Wrapper>
        <Hidden maxBreakpoint="laptop">
          <PanoramaMenuControl />
        </Hidden>
        <PanoramaCloseButton />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <PanoramaMenuControl />
      <PanoramaCloseButton />
    </Wrapper>
  )
}

export default PanoramaPrimaryMenuControl
