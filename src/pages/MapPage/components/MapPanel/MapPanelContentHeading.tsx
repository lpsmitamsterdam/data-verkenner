import styled from 'styled-components'
import { Heading, themeColor, themeSpacing } from '@amsterdam/asc-ui'

const MapPanelContentHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(1)};
  margin-top: ${themeSpacing(3)};
  color: ${themeColor('secondary')};
  max-width: calc(100% - 50px); // In case there's a infobox button
`

export default MapPanelContentHeading
