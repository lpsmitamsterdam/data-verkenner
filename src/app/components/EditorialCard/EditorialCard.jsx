import React from 'react'
import styled from '@datapunt/asc-core'
import {
  Card,
  CardContent,
  CardMedia,
  Link,
  Heading,
  Paragraph,
  Image,
  breakpoint,
  color,
} from '@datapunt/asc-ui'

const CardHeading = styled(Heading)`
  border-bottom: 2px solid transparent;
  line-height: 22px;
  margin-bottom: 12px;
  width: fit-content;
`

const StyledLink = styled(Link)`
  margin-bottom: 16px;
  width: 100%;

  &:hover {
    ${CardHeading} {
      color: ${color('secondary')};
      border-color: ${color('secondary')};
    }
  }
`

const StyledCard = styled(Card)`
  align-items: stretch;
`

const StyledCardHeading = styled(CardHeading)`
  display: inline-block;
`

const StyledCardMedia = styled(CardMedia)`
  width: 20%;
  max-width: 20% !important;

  flex: 1 0 auto;

  @media screen and ${breakpoint('max-width', 'mobileM')} {
    width: 56px;
    height: 56px;
    max-width: 56px;
  }

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    width: 72px;
    height: 72px;
    max-width: 72px;
  }
`

const StyledCardContent = styled(CardContent)`
  padding: 0;
  margin: 0 16px;
  border-bottom: 1px solid ${color('tint', 'level3')};
  position: relative;
`

const IntroText = styled(Paragraph)`
  padding-bottom: 16px;
`

const MetaText = styled(Paragraph)`
  color: grey;
  padding-bottom: 16px;
  font-size: 14px;
  line-height: 1.25;
`

const EditorialCard = ({ dataItem, href }) => (
  <StyledLink key={dataItem.id} href={href} linkType="blank">
    <StyledCard horizontal>
      <StyledCardMedia>
        <Image
          src={
            dataItem.coverImageUrl
              ? dataItem.coverImageUrl
              : '../assets/images/not_found_thumbnail.jpg'
          }
          alt={dataItem.title}
          square
        />
      </StyledCardMedia>
      <StyledCardContent>
        <StyledCardHeading $as="h4">{dataItem.title}</StyledCardHeading>
        <IntroText>{dataItem.field_intro}</IntroText>
        <MetaText>{dataItem.localeDate}</MetaText>
      </StyledCardContent>
    </StyledCard>
  </StyledLink>
)

export default EditorialCard
