import { Card, CardContent, Heading, themeColor, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'
import type { FunctionComponent } from 'react'
import EditorialCard from '../../../../app/components/EditorialCard'
import type { NormalizedFieldItems } from '../../../../normalizations/cms/types'

const StyledCard = styled(Card)`
  border-top: 2px solid;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  background-color: ${themeColor('tint', 'level2')};
  // Override the margin-bottom of the Card component when used in a CardContainer
  & {
    margin-bottom: 0;
  }
`

const StyledCardContent = styled(CardContent)`
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const StyledHeading = styled(Heading)`
  margin: ${themeSpacing(3, 0, 6)};
`

export interface CardListProps {
  title: string
  results: NormalizedFieldItems[]
  loading: boolean
}

const CardList: FunctionComponent<CardListProps> = ({ title, loading, results }) => (
  <StyledCard isLoading={loading}>
    <StyledCardContent>
      {/* @ts-ignore */}
      <StyledHeading forwardedAs="h4" styleAs="h3">
        {title}
      </StyledHeading>
      <div>
        {results.map(
          ({
            id,
            type,
            specialType,
            shortTitle,
            title: cardTitle,
            linkProps,
            teaserImage,
            coverImage,
          }) => (
            <EditorialCard
              {...linkProps}
              key={id}
              type={type}
              specialType={specialType}
              title={shortTitle || cardTitle}
              image={teaserImage || coverImage}
              imageDimensions={[44, 44]}
              compact
              showContentType
            />
          ),
        )}
      </div>
    </StyledCardContent>
  </StyledCard>
)

export default CardList
