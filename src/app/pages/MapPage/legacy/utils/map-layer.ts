import { getScopes } from '../../../../../shared/services/auth/auth'
import type AuthScope from '../../../../../shared/services/api/authScope'

// eslint-disable-next-line import/prefer-default-export
export function isAuthorised(layerAuthScope?: AuthScope | null) {
  return !layerAuthScope || getScopes().includes(layerAuthScope)
}
