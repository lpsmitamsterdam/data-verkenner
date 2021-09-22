import { Paragraph } from '@amsterdam/asc-ui'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'
import type { FunctionComponent, HTMLAttributes } from 'react'
import type { DetailResultItemLinkList, Link } from '../../legacy/types/details'
import ListLink from '../../../../shared/components/ListLink/ListLink'

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
`

export interface DetailLinkListProps extends HTMLAttributes<HTMLDivElement> {
  item: DetailResultItemLinkList
}

const DetailLinkList: FunctionComponent<DetailLinkListProps> = ({ item, ...otherProps }) => {
  const { trackEvent } = useMatomo()

  function trackClick(link: Link) {
    trackEvent({
      category: 'detail-page',
      action: 'navigate',
      name: link.title || 'unknown',
    })
  }

  return item.links?.length ? (
    <LinkList {...otherProps} data-testid="detail-linklist">
      {item.links.map((link) => {
        if ('url' in link) {
          return (
            <ListLink
              key={link.id ?? link.url}
              inList
              onClick={() => trackClick(link)}
              target="_blank"
              href={link.url}
            >
              {link.title}
            </ListLink>
          )
        }

        return (
          <ListLink
            inList
            onClick={() => {
              trackClick(link)
            }}
            forwardedAs={RouterLink}
            to={link.to}
            key={link.id ?? link.title}
          >
            {link.title}
          </ListLink>
        )
      })}
    </LinkList>
  ) : (
    <Paragraph data-testid="detail-linklist">Geen resultaten gevonden</Paragraph>
  )
}

export default DetailLinkList
