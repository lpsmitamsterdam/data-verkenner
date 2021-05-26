import {
  Ellipsis,
  Email,
  Embed,
  FacebookPadded,
  Linkedin,
  Print,
  Twitter,
} from '@amsterdam/asc-assets'
import { ContextMenu as ContextMenuComponent, ContextMenuItem, Icon } from '@amsterdam/asc-ui'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import type { FunctionComponent, ReactNode } from 'react'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import getShareUrl, { ShareTarget } from '../../../../../shared/services/share-url/share-url'
import { CONTEXT_MENU_EMBED, CONTEXT_MENU_PRINT, CONTEXT_MENU_SHARE } from '../../matomo-events'

const socialItemsArray: Array<{
  id: number
  title: string
  link: ShareTarget
  icon: ReactNode
}> = [
  {
    id: 1,
    title: 'Facebook',
    link: ShareTarget.Facebook,
    icon: <FacebookPadded />,
  },
  {
    id: 2,
    title: 'Twitter',
    link: ShareTarget.Twitter,
    icon: <Twitter />,
  },
  {
    id: 3,
    title: 'Linkedin',
    link: ShareTarget.LinkedIn,
    icon: <Linkedin />,
  },
  {
    id: 4,
    title: 'E-mail',
    link: ShareTarget.Email,
    icon: <Email />,
  },
]

const StyledContextMenuComponent = styled(ContextMenuComponent)`
  height: 100%;
  button {
    height: inherit;
    border: none;
  }
`

const MapContextMenu: FunctionComponent = () => {
  const { trackEvent } = useMatomo()
  const [open, setOpen] = useState(false)

  const handlePageShare = (target: ShareTarget) => {
    trackEvent({
      ...CONTEXT_MENU_SHARE,
      name: target,
    })

    const link = getShareUrl(target)
    if (link) {
      window.open(link.url, link.target)
    }
  }

  const handlePrint = useCallback(() => {
    trackEvent(CONTEXT_MENU_PRINT)
    setOpen(false)
    window.print()
  }, [trackEvent, setOpen])

  const handleEmbed = useCallback(async () => {
    setOpen(false)
    trackEvent(CONTEXT_MENU_EMBED)
    const params = new URLSearchParams(window.location.search)
    params.set('embed', 'true')
    await navigator.clipboard.writeText(
      `${window.location.origin}${window.location.pathname}?${params.toString()}`,
    )
    // eslint-disable-next-line no-alert
    alert('Embed URL is gekopieerd naar klembord')
  }, [trackEvent, setOpen])

  return (
    <StyledContextMenuComponent
      data-test="context-menu"
      title="Actiemenu"
      arrowIcon={<Ellipsis />}
      position="bottom"
      open={open}
      onClick={() => setOpen((currentValue) => !currentValue)}
    >
      <ContextMenuItem
        role="button"
        data-test="print"
        divider
        onClick={handlePrint}
        icon={
          <Icon padding={4} inline size={24}>
            <Print />
          </Icon>
        }
      >
        Printen
      </ContextMenuItem>

      <ContextMenuItem
        role="button"
        data-test="context-menu-embed"
        divider
        onClick={handleEmbed}
        icon={
          <Icon padding={4} inline size={24}>
            <Embed />
          </Icon>
        }
      >
        Kopiëer embed link
      </ContextMenuItem>
      {socialItemsArray.map(({ link, title, icon, id }) => (
        <ContextMenuItem
          key={id}
          role="button"
          onClick={() => {
            setOpen(false)
            handlePageShare(link)
          }}
          icon={
            <Icon inline size={24} padding={4}>
              {icon}
            </Icon>
          }
        >
          Deel via {title}
        </ContextMenuItem>
      ))}
    </StyledContextMenuComponent>
  )
}

export default MapContextMenu
