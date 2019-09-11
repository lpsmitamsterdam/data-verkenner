import React from 'react'
import styled, { css } from '@datapunt/asc-core'
import {
  breakpoint,
  Card,
  CardContainer,
  CardContent,
  themeColor,
  Column,
  Heading,
  Link,
  Paragraph,
  Row,
  styles,
} from '@datapunt/asc-ui'
import ErrorMessage, { ErrorBackgroundCSS } from './ErrorMessage'
import { fullGridWidthContainer, blockTopMargin } from './services/styles'

const StyledCardContainer = styled(CardContainer)`
  border-top: 2px solid;
`

const OrganizationBlockStyle = styled.div`
  padding: 40px 20px 0;
  background-color: ${themeColor('tint', 'level2')};
  ${blockTopMargin(8)}
  ${({ hasMargin }) => fullGridWidthContainer(hasMargin)}
`

const StyledCard = styled(Card)`
  align-items: flex-start;
  height: 100%;
  ${({ loading }) =>
    !loading &&
    css`
      background-color: inherit;
    `}
`

const StyledLink = styled(Link)`
  margin-top: 24px;
`

const StyledCardContent = styled(CardContent)`
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 40px;

  ${styles.HeadingStyle} {
    margin: 12px 0 24px;
  }
`

const StyledRow = styled(Row)`
  ${({ showError }) => showError && ErrorBackgroundCSS}
  @media screen and ${breakpoint('min-width', 'tabletM')} {
    margin-top: 12px;
  }
`

const OrganizationBlock = ({ loading, showError, ...otherProps }) => (
  <OrganizationBlockStyle {...otherProps}>
    <Row hasMargin={false}>
      <Heading $as="h2" styleAs="h1" gutterBottom={20}>
        Onderzoek, Informatie en Statistiek
      </Heading>
    </Row>
    <StyledRow hasMargin={false} showError={showError}>
      {showError && <ErrorMessage onClick={() => {}} />}
      <Column span={{ small: 1, medium: 2, big: 3, large: 3, xLarge: 3 }}>
        <StyledCardContainer>
          <StyledCard animateLoading={!showError} loading={loading}>
            <StyledCardContent>
              <div>
                <Heading $as="h4" styleAs="h3">
                  Over OIS
                </Heading>
                <Paragraph>
                  De afdeling Onderzoek, Informatie en Statistiek (OIS) doet onderzoek, verzamelt en
                  bewerkt data over de stad en maakt de resultaten daarvan bekend op deze website.
                </Paragraph>
              </div>
              <StyledLink linkType="with-chevron" href="/">
                Lees meer
              </StyledLink>
            </StyledCardContent>
          </StyledCard>
        </StyledCardContainer>
      </Column>
      <Column span={{ small: 1, medium: 2, big: 3, large: 3, xLarge: 3 }}>
        <StyledCardContainer>
          <StyledCard animateLoading={!showError} loading={loading}>
            <StyledCardContent>
              <div>
                <Heading $as="h4" styleAs="h3">
                  Onderzoek
                </Heading>
                <Paragraph>
                  We doen jaarlijks honderden onderzoeken, van kleine enquêtes tot uitgebreide
                  monitors.
                </Paragraph>
              </div>
              <StyledLink linkType="with-chevron" href="/">
                Lees meer
              </StyledLink>
            </StyledCardContent>
          </StyledCard>
        </StyledCardContainer>
      </Column>
      <Column span={{ small: 1, medium: 2, big: 3, large: 3, xLarge: 3 }}>
        <StyledCardContainer>
          <StyledCard animateLoading={!showError} loading={loading}>
            <StyledCardContent>
              <div>
                <Heading $as="h4" styleAs="h3">
                  Panels en enquêtes
                </Heading>
                <Paragraph>
                  We doen jaarlijks honderden onderzoeken, van kleine enquêtes tot uitgebreide
                  monitors.
                </Paragraph>
              </div>
              <StyledLink linkType="with-chevron" href="/">
                Lees meer
              </StyledLink>
            </StyledCardContent>
          </StyledCard>
        </StyledCardContainer>
      </Column>
      <Column span={{ small: 1, medium: 2, big: 3, large: 3, xLarge: 3 }}>
        <StyledCardContainer>
          <StyledCard animateLoading={!showError} loading={loading}>
            <StyledCardContent>
              <div>
                <Heading $as="h4" styleAs="h3">
                  Publicaties
                </Heading>
                <Paragraph>
                  Download onderzoeksrapporten, fasctsheets of het ons jaarboek. Het oudste dateert
                  uit 1895!
                </Paragraph>
              </div>
              <StyledLink linkType="with-chevron" href="/">
                Bekijk overzicht
              </StyledLink>
            </StyledCardContent>
          </StyledCard>
        </StyledCardContainer>
      </Column>
    </StyledRow>
  </OrganizationBlockStyle>
)

export default OrganizationBlock
