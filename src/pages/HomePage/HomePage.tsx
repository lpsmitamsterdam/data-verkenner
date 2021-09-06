import {
  breakpoint,
  Column,
  CompactThemeProvider,
  Heading,
  Row,
  themeSpacing,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'
import cmsConfig from '../../shared/config/cms.config'
import ContentContainer from '../../shared/components/ContentContainer/ContentContainer'
import AboutBlock from '../../shared/components/HomePage/AboutBlock'
import EditorialBlock from '../../shared/components/HomePage/EditorialBlock'
import HighlightBlock from '../../shared/components/HomePage/HighlightBlock'
import NavigationBlock from '../../shared/components/HomePage/NavigationBlock'
import OrganizationBlock from '../../shared/components/HomePage/OrganizationBlock'
import ThemesBlock from '../../shared/components/HomePage/ThemesBlock'
import ShareBar from '../../shared/components/ShareBar/ShareBar'
import { toCollectionSearch } from '../../links'

const HighlightColumn = styled(Column)`
  // aligns the HighlightsBlock with the NavigationBlock
  margin-top: ${themeSpacing(6)};

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: ${themeSpacing(12)};
  }
`

const StyledRow = styled(Row)<{ fullWidth?: boolean }>`
  margin-bottom: ${themeSpacing(18)};

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    margin-bottom: ${themeSpacing(12)};

    ${({ fullWidth }) =>
      fullWidth &&
      `
      padding: 0;
    `}
  }
`

const HomePage = () => (
  <CompactThemeProvider>
    <ContentContainer>
      <StyledRow valign="flex-start">
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <Heading as="h2" styleAs="h1">
            Uitgelicht
          </Heading>
        </Column>
        <HighlightColumn wrap span={{ small: 1, medium: 2, big: 6, large: 8, xLarge: 8 }}>
          <HighlightBlock />
        </HighlightColumn>
        <Column span={{ small: 1, medium: 2, big: 6, large: 4, xLarge: 4 }}>
          <NavigationBlock />
        </Column>
      </StyledRow>
      <StyledRow>
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <EditorialBlock
            title="Dossiers"
            list={cmsConfig.HOME_COLLECTIONS}
            showMoreProps={{
              to: toCollectionSearch(),
              label: 'Overzicht alle dossiers',
            }}
          />
        </Column>
      </StyledRow>
      <StyledRow>
        <ThemesBlock />
      </StyledRow>
      <StyledRow>
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <EditorialBlock title="Meer data" list={cmsConfig.HOME_SPECIALS} showContentType />
        </Column>
      </StyledRow>
      <StyledRow fullWidth>
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <OrganizationBlock />
        </Column>
      </StyledRow>
      <StyledRow>
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <AboutBlock />
        </Column>
      </StyledRow>
      <StyledRow>
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <ShareBar />
        </Column>
      </StyledRow>
    </ContentContainer>
  </CompactThemeProvider>
)

export default HomePage
