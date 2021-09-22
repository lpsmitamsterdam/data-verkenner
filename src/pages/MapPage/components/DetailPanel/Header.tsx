import type { FunctionComponent } from 'react'
import styled from 'styled-components'
import type { InfoBoxProps } from '../../legacy/types/details'
import DetailInfoBox from './DetailInfoBox'
import MapPanelContentHeading from '../MapPanel/MapPanelContentHeading'

const HeadingWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`

interface HeaderProps {
  subItem?: boolean
  title: string
  infoBox?: InfoBoxProps
}

const Header: FunctionComponent<HeaderProps> = ({ title, subItem, infoBox }) => (
  <HeadingWrapper>
    <MapPanelContentHeading
      data-testid="data-detail-subheading"
      forwardedAs={subItem ? 'h6' : 'h3'}
    >
      {title}
    </MapPanelContentHeading>
    {infoBox && <DetailInfoBox {...infoBox} />}
  </HeadingWrapper>
)

export default Header
