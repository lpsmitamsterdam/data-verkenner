import AuthScope from '../../../app/utils/api/authScope'

const hasUserRights = (
  restricted: boolean,
  scopes: Array<string>,
  token: string | null,
  isTokenExpired: boolean,
) => {
  if (restricted) {
    return scopes.includes(AuthScope.BdX)
  }

  return scopes.includes(AuthScope.BdR) || (token && !isTokenExpired)
}

export default hasUserRights
