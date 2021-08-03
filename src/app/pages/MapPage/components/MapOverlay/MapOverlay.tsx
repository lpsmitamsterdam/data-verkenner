import styled from 'styled-components'

const MapOverlay = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 400;
  pointer-events: none;

  @media print {
    position: relative;
  }
`

export default MapOverlay
