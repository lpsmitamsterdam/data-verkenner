import type { FunctionComponent } from 'react'
import { Fragment } from 'react'
import type { DetailResultItemGroupedItems } from '../../legacy/types/details'
import Spacer from '../../../../shared/components/Spacer/Spacer'
import DetailItem from './DetailItem'

interface GroupedItemsProps {
  item: DetailResultItemGroupedItems
}

const GroupedItems: FunctionComponent<GroupedItemsProps> = ({ item }) => (
  <>
    {item.entries.map((groupedItem) => (
      <Fragment key={groupedItem?.title}>
        <DetailItem item={groupedItem} subItem />
        <Spacer />
      </Fragment>
    ))}
  </>
)

export default GroupedItems
