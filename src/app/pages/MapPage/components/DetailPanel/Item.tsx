import { List, ListItem, Paragraph } from '@amsterdam/asc-ui'
import type { FunctionComponent } from 'react'
import styled from 'styled-components'
import type { DetailResultItem } from '../../legacy/types/details'
import { DetailResultItemType } from '../../legacy/types/details'
import AuthenticationWrapper from '../AuthenticationWrapper'
import DetailDefinitionList from './DetailDefinitionList'
import DetailLinkList from './DetailLinkList'
import DetailTable from './DetailTable'
import PaginatedData from './PaginatedData'
import GroupedItems from './GroupedItems'
import Header from './Header'

const StyledImage = styled.img`
  width: 100%;
`

export interface ItemProps {
  item: DetailResultItem
  /**
   * Indicate if the Item to render is inside of an other component and thus the header should be lower in hierarchy
   */
  subItem?: boolean
  /**
   * In case of rendering an Item from PaginatedData component, we want to hide the header otherwise
   * it will render 2 times
   */
  hideHeader?: boolean
}

const Item: FunctionComponent<ItemProps> = ({ item, subItem, hideHeader }) => {
  const component = (() => {
    switch (item?.type) {
      case DetailResultItemType.DefinitionList:
        return <DetailDefinitionList entries={item.entries} />
      case DetailResultItemType.Table:
        return <DetailTable item={item} />
      case DetailResultItemType.LinkList:
        return <DetailLinkList item={item} />
      case DetailResultItemType.PaginatedData:
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return <PaginatedData item={item} />
      case DetailResultItemType.GroupedItems:
        return <GroupedItems item={item} />
      case DetailResultItemType.Image:
        return item.src ? (
          <StyledImage alt={item.title} src={item.src} />
        ) : (
          <Paragraph>Geen rollaag beschikbaar</Paragraph>
        )
      case DetailResultItemType.BulletList:
        return item?.entries?.length ? (
          <List variant="bullet">
            {item.entries.map((entry) => (
              <ListItem key={entry}>{entry}</ListItem>
            ))}
          </List>
        ) : (
          <Paragraph>Geen resultaat gevonden</Paragraph>
        )
      default:
        throw new Error('Unable to render map detail pane, encountered unknown item type.')
    }
  })()

  return (
    <>
      {item.title && !hideHeader && (
        <Header title={item.title} infoBox={item.infoBox} subItem={subItem} />
      )}
      <AuthenticationWrapper
        authScopes={item?.authScopes}
        excludedResults={item?.authExcludedInfo || item.title}
        authScopeRequired={item.authScopeRequired}
        specialAuthLevel={item.specialAuthLevel}
      >
        {() => component}
      </AuthenticationWrapper>
    </>
  )
}

export default Item
