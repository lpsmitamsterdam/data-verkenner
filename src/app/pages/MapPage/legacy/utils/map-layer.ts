import { getScopes } from '../../../../utils/auth/auth'
import type AuthScope from '../../../../utils/api/authScope'

// eslint-disable-next-line import/prefer-default-export
export function isAuthorised(layerAuthScope?: AuthScope | null) {
  return !layerAuthScope || getScopes().includes(layerAuthScope)
}
