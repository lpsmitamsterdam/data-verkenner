import {
  Card,
  CardContent,
  Heading,
  Link,
  Paragraph,
  Tag,
  themeColor,
  themeSpacing,
} from '@amsterdam/asc-ui'
import type { LocationDescriptorObject } from 'history'
import type { FunctionComponent } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledHeading = styled(Heading)`
  border-bottom: 2px solid transparent;
  line-height: 22px;
  margin-bottom: ${themeSpacing(3)};
  width: fit-content;
  display: inline-block;
`

const StyledLink = styled(Link)`
  border-bottom: ${themeColor('tint', 'level3')} 1px solid;
  width: 100%;
  min-height: 66px;

  &:hover {
    border-bottom: ${themeColor('secondary')} 1px solid;

    ${StyledHeading} {
      color: ${themeColor('secondary')};
      border-color: ${themeColor('secondary')};
    }
  }

  &:focus {
    background: none;
    position: relative;
  }
`

const StyledCard = styled(Card)`
  align-items: stretch;
  padding: 0;
`

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  padding: 0;
  position: relative;
`

const StyledParagraph = styled(Paragraph)`
  display: flex;
  padding-bottom: ${themeSpacing(4)};
`

const MetaText = styled(StyledParagraph)`
  color: ${themeColor('tint', 'level6')};
  font-size: 14px;
  line-height: 1.25;
`

const StyledTag = styled(Tag)`
  margin-right: ${themeSpacing(1)};
`

interface DatasetCardProps {
  id?: string
  shortTitle: string
  teaser: string
  lastModified: string | Date
  modified: string
  distributionTypes: string[]
  to: LocationDescriptorObject
}

const DatasetCard: FunctionComponent<DatasetCardProps & Partial<HTMLAnchorElement>> = ({
  id,
  shortTitle,
  teaser,
  lastModified,
  modified,
  distributionTypes,
  to,
  ...otherProps
}) => (
  <StyledLink
    {...{
      forwardedAs: RouterLink,
      key: id,
      to,
      title: shortTitle,
      variant: 'blank',
      ...otherProps,
    }}
  >
    <StyledCard horizontal>
      <StyledCardContent>
        <div>
          <StyledHeading styleAs="h4" forwardedAs="h3">
            {shortTitle}
          </StyledHeading>
        </div>

        <div>
          <MetaText as="time" dateTime={modified}>
            {lastModified}
          </MetaText>
        </div>

        <div>
          <StyledParagraph dangerouslySetInnerHTML={{ __html: teaser }} />
        </div>

        <div>
          <MetaText data-testid="distributionTypes">
            {distributionTypes &&
              distributionTypes.length > 0 &&
              distributionTypes.map((distributionType) => (
                <StyledTag key={distributionType} colorType="tint" colorSubtype="level3">
                  {distributionType}
                </StyledTag>
              ))}
          </MetaText>
        </div>
      </StyledCardContent>
    </StyledCard>
  </StyledLink>
)

export default DatasetCard
