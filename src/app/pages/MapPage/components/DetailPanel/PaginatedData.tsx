import type { FunctionComponent } from 'react'
import { useState } from 'react'
import type { DetailResultItemPaginatedData } from '../../legacy/types/details'
import PromiseResult from '../../../../components/PromiseResult/PromiseResult'
import PaginatedResult from './PaginatedResult'

interface PaginatedDataProps {
  item: DetailResultItemPaginatedData
}

const PaginatedData: FunctionComponent<PaginatedDataProps> = ({ item }) => {
  const [pageSize, setPaginatedUrl] = useState(item.pageSize)

  return (
    <PromiseResult factory={() => item.getData(undefined, pageSize)} deps={[pageSize]}>
      {(result) => {
        if (!result.value) {
          return null
        }

        return (
          <PaginatedResult
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

export default PaginatedData
