import type { SpecialType } from '../config/cms.config'
import { CmsType } from '../config/cms.config'

export default function getContentTypeLabel(type: CmsType, specialType?: SpecialType | null) {
  // specialType is always a "translated" value that can be used as label directly
  if (specialType) {
    return specialType
  }

  // Some values for type need to be translated, others can be used as label directly
  switch (type) {
    case CmsType.Article:
      return 'Artikel'
    case CmsType.Collection:
      return 'Dossier'
    case CmsType.Publication:
      return 'Publicatie'
    default:
      return type
  }
}
