/* eslint-disable camelcase */
import React, { useEffect } from 'react'
import styled from '@datapunt/asc-core'
import { Row, themeSpacing } from '@datapunt/asc-ui'
import { useSelector } from 'react-redux'
import CardListBlock, { CMSCollectionList } from '../../components/CardList/CardListBlock'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import useFromCMS, { CMSResultItem } from '../../utils/useFromCMS'
import { cmsConfig } from '../../../shared/config/config'
import { getLocationPayload } from '../../../store/redux-first-router/selectors'
import CollectionTileGrid from './CollectionTileGrid'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

const StyledRow = styled(Row)`
  // To center the ErrorMessage
  justify-content: center;
`
const StyledCardListBlock = styled(CardListBlock)`
  margin-top: ${themeSpacing(12)};
`

type CollectionResult = {
  title?: string
  field_intro?: string
  field_blocks: CMSCollectionList[]
  field_items: CMSResultItem[]
}

const CollectionDetailPage: React.FC = () => {
  const { id } = useSelector(getLocationPayload)
  const { results, fetchData, loading, error } = useFromCMS<CollectionResult>(
    cmsConfig.CMS_COLLECTION_DETAIL,
    id,
  )

  useEffect(() => {
    fetchData()
  }, [])

  const listResults = results?.field_blocks ?? []
  const tileResults = results?.field_items ?? []

  return (
    <ContentContainer>
      <StyledRow>
        {error ? (
          <ErrorMessage onClick={() => fetchData()} />
        ) : (
          <>
            <CollectionTileGrid
              {...{
                results: tileResults,
                loading,
                title: results?.title,
                description: results?.field_intro,
              }}
            />
            <StyledCardListBlock {...{ results: listResults, loading }} />
          </>
        )}
      </StyledRow>
    </ContentContainer>
  )
}

export default CollectionDetailPage
