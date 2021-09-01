import type AuthScope from '../../utils/api/authScope'
import { getScopes } from '../../utils/auth/auth'

const useAuthScope = () => {
  const userScopes = getScopes()
  const isUserAuthorized = (authScopes?: AuthScope[]) => {
    if (!authScopes) {
      return true
    }

    return authScopes.every((scope) => userScopes.includes(scope))
  }

  return {
    isUserAuthorized,
  }
}

export default useAuthScope
