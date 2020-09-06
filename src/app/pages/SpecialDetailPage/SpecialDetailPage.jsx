import { Column, Row } from '@datapunt/asc-ui'
import React from 'react'
import { connect } from 'react-redux'
import { getLocationPayload } from '../../../store/redux-first-router/selectors'
import useFromCMS from '../../utils/useFromCMS'
import EditorialPage from '../../components/EditorialPage/EditorialPage'
import { cmsConfig } from '../../../shared/config/config'
import { toSpecialDetail } from '../../../store/redux-first-router/actions'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import IFrame from '../../components/IFrame/IFrame'
import Animation from './specials/Animation'
import { SpecialType } from '../../../shared/config/cms.config'

const SpecialDetailPage = ({ id }) => {
  const { fetchData, results, loading, error } = useFromCMS(cmsConfig.SPECIAL, id)

  React.useEffect(() => {
    fetchData()
  }, [id])

  const { field_content_link: contentLink, slug, specialType, title, field_language: lang } =
    results || {}
  const documentTitle = title && `Special: ${title}`

  const linkAction = toSpecialDetail(id, specialType, slug)

  return (
    <EditorialPage {...{ documentTitle, linkAction, lang, error, loading }}>
      <Row>
        <ContentContainer>
          {specialType === SpecialType.Animation && (
            <Animation contentLink={contentLink} title={title} results={results} />
          )}
          {(specialType === SpecialType.Dashboard || specialType === SpecialType.Story) && (
            <Column wrap span={{ small: 12, medium: 12, big: 12, large: 12, xLarge: 12 }}>
              <IFrame contentLink={contentLink} title={title} />
            </Column>
          )}
        </ContentContainer>
      </Row>
    </EditorialPage>
  )
}

const mapStateToProps = (state) => {
  const { id } = getLocationPayload(state)
  return {
    id,
  }
}

export default connect(mapStateToProps, null)(SpecialDetailPage)
