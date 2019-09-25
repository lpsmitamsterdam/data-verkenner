import styled from '@datapunt/asc-core'
import {
  breakpoint,
  CardContainer,
  Column,
  Heading,
  Row,
  themeColor,
  themeSpacing,
  styles,
} from '@datapunt/asc-ui'
import React from 'react'
import ErrorMessage, { ErrorBackgroundCSS } from './ErrorMessage'
import OrganizationCard from './OrganizationCard'
import organizationLinks from './services/organization-links'

const StyledCardContainer = styled(CardContainer)`
  background-color: ${themeColor('tint', 'level2')};
  padding: ${themeSpacing(8, 4)};
`

const StyledRow = styled(Row)`
  ${({ showError }) => showError && ErrorBackgroundCSS}

  @media screen and ${breakpoint('max-width', 'laptop')} {
    ${/* sc-selector */ styles.ColumnStyle}:nth-child(-n+2) {
      margin-bottom: ${themeSpacing(8)};
    }
  }
`

const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(4)};

  @media screen and ${breakpoint('min-width', 'tabletM')} {
    margin-bottom: ${themeSpacing(6)};
  }
`

const OrganizationBlock = ({ loading, showError, ...otherProps }) => (
  <StyledCardContainer {...otherProps}>
    <Row hasMargin={false}>
      <StyledHeading $as="h2" styleAs="h1">
        Onderzoek, Informatie en Statistiek
      </StyledHeading>
    </Row>
    <StyledRow hasMargin={false} showError={showError}>
      {showError && <ErrorMessage onClick={() => {}} />}
      {organizationLinks.map(linkProps => (
        <Column wrap span={{ small: 1, medium: 1, big: 3, large: 3, xLarge: 3 }}>
          <OrganizationCard loading={loading} showError={showError} {...linkProps} />
        </Column>
      ))}
    </StyledRow>
  </StyledCardContainer>
)

export default OrganizationBlock
