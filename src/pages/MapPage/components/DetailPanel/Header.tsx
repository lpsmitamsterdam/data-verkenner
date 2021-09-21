import type { FunctionComponent } from 'react'
import { themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'
import type { InfoBoxProps } from '../../legacy/types/details'
import DetailHeading from './DetailHeading'
import DetailInfoBox from './DetailInfoBox'

const HeadingWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${themeSpacing(2)};
`

interface HeaderProps {
  subItem?: boolean
  title: string
  infoBox?: InfoBoxProps
}

const Header: FunctionComponent<HeaderProps> = ({ title, subItem, infoBox }) => (
  <HeadingWrapper>
    <DetailHeading styleAs={subItem ? 'h6' : 'h4'}>{title}</DetailHeading>
    {infoBox && <DetailInfoBox {...infoBox} />}
  </HeadingWrapper>
)

export default Header
