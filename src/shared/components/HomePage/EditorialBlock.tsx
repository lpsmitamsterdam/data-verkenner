import { breakpoint, CardContainer, Column, Row, styles, themeColor } from '@amsterdam/asc-ui'
import type { FunctionComponent } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import usePromise, { isFulfilled, isPending, isRejected } from '@amsterdam/use-promise'
import ErrorMessage, { ErrorBackgroundCSS } from '../ErrorMessage/ErrorMessage'
import BlockHeading from './BlockHeading'
import EditorialBlockCard from './EditorialBlockCard'
import OverviewLink from './OverviewLink'
import { fetchListFromCms } from '../../utils/fetchFromCms'

const CardRow = styled.div<{ showError: boolean }>`
  ${({ showError }) => showError && ErrorBackgroundCSS}

  /* Add border-top to first row of cards when three Cards are shown */
  ${/* sc-selector */ styles.ColumnStyle}:nth-child(-n+3) > ${styles.LinkStyle} {
    border-top: ${themeColor('tint', 'level3')} 1px solid;
  }

  /* Add border-top to first row of cards when two Cards are shown */
  @media screen and ${breakpoint('max-width', 'laptop')} {
    ${/* sc-selector */ styles.ColumnStyle}:nth-child(3) > ${styles.LinkStyle} {
      border-top: none;
    }
  }

  /* Add border-top to first row of cards when one Card is shown */
  @media screen and ${breakpoint('max-width', 'tabletM')} {
    ${/* sc-selector */ styles.ColumnStyle}:nth-child(n+2) > ${styles.LinkStyle} {
      border-top: none;
    }
  }
`

interface CMSConfig {
  endpoint(id?: string): string
  endpoint(id: string): string
  fields: Array<string>
}

interface EditorialBlockProps {
  title: string
  list: CMSConfig
  showContentType?: boolean
  showMoreProps?: any
}

const EditorialBlock: FunctionComponent<EditorialBlockProps> = ({
  title,
  list,
  showMoreProps = {},
  showContentType = false,
}) => {
  const [retryCount, setRetryCount] = useState(0)

  const result = usePromise(() => fetchListFromCms(list.endpoint(), list.fields), [retryCount])

  const specials = isFulfilled(result)
    ? result.value
    : Array(6)
        .fill(null)
        .map((x, i) => i)

  const error = isRejected(result)
  const loading = isPending(result)

  return (
    <CardContainer data-test="special-block">
      <Row hasMargin={false}>
        <Column wrap span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <BlockHeading styleAs="h1" forwardedAs="h2">
            {title}
          </BlockHeading>
        </Column>
      </Row>
      <CardRow showError={error}>
        {error && (
          <ErrorMessage
            absolute
            message="Er is een fout opgetreden bij het laden van dit blok."
            buttonLabel="Probeer opnieuw"
            buttonOnClick={() => setRetryCount(retryCount + 1)}
          />
        )}
        <Row hasMargin={false}>
          {specials.length
            ? specials.map(
                (
                  {
                    key,
                    shortTitle,
                    title: specialTitle,
                    specialType,
                    teaser,
                    intro,
                    teaserImage,
                    linkProps,
                    type,
                  }: any,
                  index: number,
                ) => (
                  <Column
                    key={key || index}
                    wrap
                    span={{ small: 1, medium: 2, big: 3, large: 4, xLarge: 4 }}
                  >
                    <EditorialBlockCard
                      loading={loading}
                      showError={error}
                      shortTitle={shortTitle}
                      title={specialTitle}
                      specialType={specialType}
                      teaser={teaser}
                      intro={intro}
                      teaserImage={teaserImage}
                      linkProps={linkProps}
                      type={type}
                      showContentType={showContentType}
                    />
                  </Column>
                ),
              )
            : null}
          {/* Todo: temporary fix for 2 or 5 items. hasMargin messes up the grid so columns don't have gutters, so we need to use justify-content="space-between" (default) in the row */}
          {(specials.length === 2 || specials.length === 5) && (
            // @ts-ignore
            <Column key="filler" wrap span={{ small: 1, medium: 2, big: 3, large: 4, xLarge: 4 }} />
          )}
        </Row>
      </CardRow>
      {showMoreProps.to && showMoreProps.label && (
        <Row hasMargin={false}>
          <Column wrap span={{ small: 1, medium: 2, big: 3, large: 4, xLarge: 4 }}>
            <OverviewLink
              linkProps={{
                to: showMoreProps.to,
                forwardedAs: RouterLink,
              }}
              label={showMoreProps.label}
              title={showMoreProps.label}
            />
          </Column>
        </Row>
      )}
    </CardContainer>
  )
}

export default EditorialBlock
