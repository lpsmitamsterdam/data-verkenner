import { Heading, Icon, themeColor, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'
import type { FunctionComponent } from 'react'

const Divider = styled.div`
  width: 200px;
  height: 3px;
  background-color: ${themeColor('support', 'valid')};
  margin-bottom: ${themeSpacing(4)};
`
const StyledHeading = styled(Heading)`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${themeSpacing(6)};
`

const StyledIcon = styled(Icon)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${themeSpacing(1)};

  & svg {
    width: 40px;
    height: 40px;
  }
`

interface SearchHeadingProps {
  label: string
  icon?: JSX.Element
}

const SearchHeading: FunctionComponent<SearchHeadingProps> = ({ label, icon }) => (
  <>
    <Divider />
    <StyledHeading forwardedAs="h2" data-testid="searchHeading">
      {icon && <StyledIcon>{icon}</StyledIcon>}
      {label}
    </StyledHeading>
  </>
)

export default SearchHeading
