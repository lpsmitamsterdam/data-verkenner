import type { FunctionComponent } from 'react'
import { useState } from 'react'
import type { DetailResultItemSplitListData } from '../../legacy/types/details'
import PromiseResult from '../../../../shared/components/PromiseResult/PromiseResult'
import SplitListResult from './SplitListResult'

interface SplitListDataProps {
  item: DetailResultItemSplitListData
}

const SplitListData: FunctionComponent<SplitListDataProps> = ({ item }) => {
  const [pageSize, setPaginatedUrl] = useState(item.pageSize)

  return (
    <PromiseResult factory={() => item.getData(undefined, pageSize)} deps={[pageSize]}>
      {(result) => {
        if (!result.value) {
          return null
        }

        return (
          <SplitListResult
            result={result.value}
            pageSize={pageSize}
            item={item}
            setPaginatedUrl={setPaginatedUrl}
          />
        )
      }}
    </PromiseResult>
  )
}

export default SplitListData
