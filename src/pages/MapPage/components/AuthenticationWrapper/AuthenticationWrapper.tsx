import type { FunctionComponent, ReactElement } from 'react'
import type AuthScope from '../../../../app/utils/api/authScope'
import useAuthScope from '../../../../app/hooks/useAuthScope'
import type { AuthAlertProps } from '../../../../app/components/Alerts/AuthAlert'
import AuthAlert from '../../../../app/components/Alerts/AuthAlert'

export interface AuthenticationWrapperProps extends AuthAlertProps {
  authScopes?: AuthScope[]
  authScopeRequired?: boolean
  /**
   * Whether the alert should rendered first. Default: false
   */
  alertFirst?: boolean
  children: () => ReactElement | null
}

const AuthenticationWrapper: FunctionComponent<AuthenticationWrapperProps> = ({
  authScopes,
  excludedResults,
  authScopeRequired,
  specialAuthLevel,
  children,
  alertFirst,
}) => {
  const { isUserAuthorized } = useAuthScope()
  const userIsAuthorized = isUserAuthorized(authScopes)
  const showAlert = !userIsAuthorized
  const result = (userIsAuthorized || !authScopeRequired) && children()
  const alert = showAlert && (
    <AuthAlert specialAuthLevel={specialAuthLevel} excludedResults={excludedResults} />
  )

  return (
    <>
      {alertFirst ? alert : result}
      {alertFirst ? result : alert}
    </>
  )
}

export default AuthenticationWrapper
