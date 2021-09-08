import { Enlarge, Minimise } from '@amsterdam/asc-assets'
import { Button, themeSpacing } from '@amsterdam/asc-ui'
import type { FunctionComponent } from 'react'
import styled from 'styled-components'
import type { DetailResultItemSplitListData, SplitListData } from '../../legacy/types/details'
import DetailItem from './DetailItem'

const ShowMoreButton = styled(Button)`
  margin-top: ${themeSpacing(1)};
`

interface SplitListResultProps {
  result: SplitListData<any>
  pageSize: number
  setPaginatedUrl: (number: number) => void
  item: DetailResultItemSplitListData
}

// Unfortunately we cannot use "-1", as apparently wont work for some API's
const INFINITE_PAGE_SIZE = 999

const SplitListResult: FunctionComponent<SplitListResultProps> = ({
  result,
  pageSize,
  setPaginatedUrl,
  item,
}) => {
  const resultItem = item.toView(result.data)
  const showMoreButton = result.count > result.data?.length ?? pageSize === INFINITE_PAGE_SIZE
  const showMoreText = `Toon alle ${result.count} ${
    resultItem?.title ? resultItem.title.toLocaleLowerCase() : 'resultaten'
  }`
  const showLessText = 'Toon minder'
  const showMore = pageSize !== INFINITE_PAGE_SIZE

  return (
    <>
      <DetailItem item={resultItem} hideHeader />
      {showMoreButton && (
        <ShowMoreButton
          variant="textButton"
          iconSize={12}
          iconLeft={showMore ? <Enlarge /> : <Minimise />}
          onClick={() => {
            setPaginatedUrl(showMore ? INFINITE_PAGE_SIZE : item.pageSize)
          }}
        >
          {showMore ? showMoreText : showLessText}
        </ShowMoreButton>
      )}
    </>
  )
}

export default SplitListResult
