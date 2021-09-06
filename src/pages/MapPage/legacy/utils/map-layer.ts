import { getScopes } from '../../../../app/utils/auth/auth'
import type AuthScope from '../../../../app/utils/api/authScope'

// eslint-disable-next-line import/prefer-default-export
export function isAuthorised(layerAuthScope?: AuthScope | null) {
  return !layerAuthScope || getScopes().includes(layerAuthScope)
}
