import { getScopes } from '../../../../../shared/services/auth/auth'

// eslint-disable-next-line import/prefer-default-export
export function isAuthorised(layerAuthScope?: string | null) {
  return !layerAuthScope || getScopes().includes(layerAuthScope)
}
