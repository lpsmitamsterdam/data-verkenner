import { ChevronRight } from '@amsterdam/asc-assets'
import {
  breakpoint,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Heading,
  Icon,
  Link,
  Paragraph,
  styles,
  svgFill,
  themeColor,
  themeSpacing,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import type { LocationDescriptorObject } from 'history'
import type { FunctionComponent } from 'react'

const StyledHeading = styled(Heading)`
  margin-bottom: 0;
`

const StyledIcon = styled(Icon)`
  @media screen and ${breakpoint('max-width', 'mobileL')} {
    max-width: 36px;
  }
`

const StyledCard = styled(Card)`
  width: 100%;
  margin-bottom: 0;
  pointer-events: none; /* FF 60 fix */
`

const StyledLink = styled(Link)`
  position: relative;
  width: 100%;
  break-inside: avoid;
  display: flex;
  margin-bottom: ${themeSpacing(2)};

  &:hover {
    ${StyledHeading} {
      color: ${themeColor('secondary')};
      text-decoration: underline;}

    ${styles.IconStyle} {
      ${svgFill(themeColor('secondary'))};
    }
  }

  &:focus {
    background: none;
  }

  &:last-child {
    margin-bottom: 0;
  }
}
`

const StyledCardMedia = styled(CardMedia)`
  flex-basis: ${themeSpacing(18)};
  min-width: ${themeSpacing(18)};
`

const StyledCardContent = styled(CardContent)`
  min-height: inherit;
  align-self: flex-start;
  padding: ${themeSpacing(2)};
`

const StyledCardActions = styled(CardActions)`
  width: auto;
  padding-left: 0 !important;
`

const StyledParagraph = styled(Paragraph)`
  // Hard overwrite specifically for this component
  font-size: 14px;
  line-height: 17px;
  width: 100%;
  overflow: hidden; // make sure the text doesn't falls outside this Paragraph
`

export interface NavigationCardProps {
  CardIcon: () => JSX.Element
  title: string
  description: string
  to: LocationDescriptorObject
}

const NavigationCard: FunctionComponent<NavigationCardProps> = ({
  CardIcon,
  to,
  title,
  description,
}) => (
  <StyledLink forwardedAs={RouterLink} variant="blank" to={to}>
    <StyledCard horizontal>
      <StyledCardMedia backgroundColor="level2">
        <CardIcon />
      </StyledCardMedia>
      <StyledCardContent>
        <StyledHeading styleAs="h4" forwardedAs="h3">
          {title}
        </StyledHeading>
        <StyledParagraph>{description}</StyledParagraph>
      </StyledCardContent>
      <StyledCardActions>
        <StyledIcon size={15}>
          <ChevronRight />
        </StyledIcon>
      </StyledCardActions>
    </StyledCard>
  </StyledLink>
)

export default NavigationCard
