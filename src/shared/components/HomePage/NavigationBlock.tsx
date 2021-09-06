import { breakpoint, themeColor, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'
import type { FunctionComponent } from 'react'
import NavigationCard from './NavigationCard'
import type { NavigationLink } from './services/navigationLinks'
import navigationLinks from './services/navigationLinks'

const StyledCardContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: ${themeColor('support', 'valid')};
  padding: ${themeSpacing(5)};

  @media screen and ${breakpoint('min-width', 'tabletM')} {
    padding: ${themeSpacing(6)};

    /* Generate the arrow / triangle in the left corner */
    &::before {
      content: '';
      position: absolute;
      height: 0;
      width: 0;
      left: 0;
      top: 0;
      border-style: solid;
      border-width: ${themeSpacing(6, 6)} 0 0;
      border-color: #fff transparent transparent transparent;
    }

    /* Separate content in two columns on tabletM only */
    @media screen and ${breakpoint('max-width', 'laptop')} {
      column-count: 2;
      column-gap: ${themeSpacing(2)};
    }
  }

  // Makes sure the background of this component fills the entire screen width
  @media screen and ${breakpoint('max-width', 'tabletM')} {
    margin-right: -${themeSpacing(5)};
    margin-left: -${themeSpacing(5)};
    width: calc(100% + ${themeSpacing(10)});
  }
`

const NavigationBlock: FunctionComponent = () => (
  <StyledCardContainer data-test="navigation-block">
    {navigationLinks
      .filter(
        (
          link,
        ): link is NavigationLink & Required<Pick<NavigationLink, 'CardIcon' | 'description'>> =>
          // Only the ones with a description and icon
          !!link.description && !!link.CardIcon,
      )
      .sort((a, b) => a.id - b.id) // sort on id
      .map((linkProps) => (
        <NavigationCard
          key={linkProps.id}
          to={linkProps.to}
          CardIcon={linkProps.CardIcon}
          title={linkProps.title}
          description={linkProps.description}
        />
      ))}
  </StyledCardContainer>
)

export default NavigationBlock
