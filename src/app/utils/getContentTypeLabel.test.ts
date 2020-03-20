import { CmsType, SpecialType } from '../../shared/config/cms.config'
import getContentTypeLabel from './getContentTypeLabel'

describe('getContentTypeLabel', () => {
  it('should always return specialType if provided', () => {
    expect(getContentTypeLabel(CmsType.Article, SpecialType.Animation)).toEqual(
      SpecialType.Animation,
    )
  })

  it('should return the actual value for type', () => {
    expect(getContentTypeLabel(CmsType.Special)).toEqual(CmsType.Special)
  })

  it('should not return the actual value for some types', () => {
    const types = [CmsType.Article, CmsType.Collection, CmsType.Publication]

    types.forEach(type => expect(getContentTypeLabel(type)).not.toEqual(type))
  })
})
