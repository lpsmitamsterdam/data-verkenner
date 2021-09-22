import styled from 'styled-components'
import { themeSpacing } from '@amsterdam/asc-ui'

const MapPanelContent = styled.div`
  padding: ${themeSpacing(0, 6, 10, 5)};

  @media print {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: ${themeSpacing(1)};
    grid-row-gap: ${themeSpacing(1)};
  }
`

export default MapPanelContent
