import { breakpoint, themeColor, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'
import type { FunctionComponent } from 'react'

const DefinitionListItemWrapper = styled.div`
  display: flex;
  padding: ${themeSpacing(2)} 0;
  &:not(:last-of-type) {
    border-bottom: 1px solid ${themeColor('tint', 'level4')};
  }

  @media screen and ${breakpoint('max-width', 'laptopM')} {
    flex-direction: column;
  }
`

const DefinitionListTerm = styled.dt`
  margin-right: ${themeSpacing(2)};
  color: ${themeColor('tint', 'level5')};
  font-weight: 500;
  white-space: normal;
  word-break: break-word;

  @media screen and ${breakpoint('min-width', 'laptopM')} {
    width: 30%;
  }
`

const DefinitionListDescription = styled.dd`
  white-space: normal;
  width: 70%;
`

export interface DefinitionListItemProps {
  term: string
}

const DefinitionListItem: FunctionComponent<DefinitionListItemProps> = ({
  term,
  children,
  ...otherProps
}) => (
  <DefinitionListItemWrapper {...otherProps}>
    <DefinitionListTerm>{term}</DefinitionListTerm>
    <DefinitionListDescription>{children}</DefinitionListDescription>
  </DefinitionListItemWrapper>
)

export default DefinitionListItem
