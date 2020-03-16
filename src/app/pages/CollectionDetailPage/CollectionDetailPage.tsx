/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import styled from '@datapunt/asc-core'
import { Row, themeSpacing } from '@datapunt/asc-ui'
import { useSelector } from 'react-redux'
import CardListBlock, { CMSCollectionList } from '../../components/CardList/CardListBlock'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import useFromCMS from '../../utils/useFromCMS'
import { cmsConfig } from '../../../shared/config/config'
import { getLocationPayload } from '../../../store/redux-first-router/selectors'
import CollectionTileGrid, { CollectionTile } from './CollectionTileGrid'

const StyledCardListBlock = styled(CardListBlock)`
  margin-top: ${themeSpacing(12)};
`

type CollectionResultType = {
  title?: string
  field_intro?: string
  field_blocks: CMSCollectionList[]
  field_items: CollectionTile[]
}

const CollectionDetailPage: React.FC = () => {
  const { id } = useSelector(getLocationPayload)
  const { results, fetchData, loading, error } = useFromCMS<CollectionResultType>(
    cmsConfig.CMS_COLLECTION_DETAIL,
    id,
  )

  const [listResults, setListResults] = useState<CMSCollectionList[]>([])
  const [tileResults, setTileResults] = useState<CollectionTile[]>([])
  React.useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (results) {
      setListResults(results.field_blocks)
      setTileResults(results.field_items)
    }
  }, [results])

  return (
    <ContentContainer>
      <Row>
        <CollectionTileGrid
          {...{
            results: tileResults,
            loading,
            title: results && results.title,
            description: results && results.field_intro,
          }}
        />
        <StyledCardListBlock {...{ results: listResults, fetchData, loading, error }} />
      </Row>
    </ContentContainer>
  )
}

export default CollectionDetailPage
