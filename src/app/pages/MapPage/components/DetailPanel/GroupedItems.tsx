import type { FunctionComponent } from 'react'
import { Fragment } from 'react'
import type { DetailResultItemGroupedItems } from '../../legacy/types/details'
import Spacer from '../../../../components/Spacer/Spacer'
import Item from './Item'

interface GroupedItemsProps {
  item: DetailResultItemGroupedItems
}

const GroupedItems: FunctionComponent<GroupedItemsProps> = ({ item }) => (
  <>
    {item.entries.map((groupedItem) => (
      <Fragment key={groupedItem?.title}>
        {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
        <Item item={groupedItem} subItem />
        <Spacer />
      </Fragment>
    ))}
  </>
)

export default GroupedItems
