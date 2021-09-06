import { useMatomo } from '@datapunt/matomo-tracker-react'
import type { FunctionComponent } from 'react'
import { login } from '../../../../app/utils/auth/auth'
import useDocumentTitle from '../../../../app/hooks/useDocumentTitle'
import LinkButton from '../LinkButton'

const LoginLinkButton: FunctionComponent = ({ children, ...otherProps }) => {
  const { trackEvent } = useMatomo()
  const { documentTitle } = useDocumentTitle()

  function handleClick() {
    trackEvent({ category: 'login', name: documentTitle, action: 'inloggen' })
    login()
  }

  return (
    <LinkButton {...otherProps} type="button" onClick={handleClick}>
      {children}
    </LinkButton>
  )
}

export default LoginLinkButton
