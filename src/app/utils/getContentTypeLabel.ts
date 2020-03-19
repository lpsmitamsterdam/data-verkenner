import { CmsType, SpecialType } from '../../shared/config/cms.config'

export default function getContentTypeLabel(type: CmsType, specialType?: SpecialType) {
  if (specialType) {
    switch (specialType) {
      case SpecialType.Animation:
        return 'Animatie'
      case SpecialType.Dashboard:
        return 'Dashboard'
      case SpecialType.Dataset:
        return 'Dataset'
      default:
        // eslint-disable-next-line no-console
        console.error(`Unable to get content type label, unknown special type '${specialType}'.`)
        return null
    }
  }

  switch (type) {
    case CmsType.Article:
      return 'Artikel'
    case CmsType.Collection:
      return 'Dossier'
    case CmsType.Publication:
      return 'Publicatie'
    case CmsType.Special:
      return 'In Beeld'
    case CmsType.Link:
      return 'Link'
    default:
      // eslint-disable-next-line no-console
      console.error(`Unable to get content type label, unknown type '${type}'.`)
      return null
  }
}
