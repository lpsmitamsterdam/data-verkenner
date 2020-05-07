/* eslint-disable camelcase */
import React from 'react'
import styled from 'styled-components'
import { Alert, Paragraph, Link } from '@datapunt/asc-ui'
import { useSelector } from 'react-redux'
import { isEmbedded } from '../../../shared/ducks/ui/ui'
import { createCookie, getCookie } from '../../../shared/services/cookie/cookie'

const COOKIE_NAME = 'showUpdateAlert'

const StyledAlert = styled(Alert)`
  z-index: 3;
  // IE11 fix
  & > div {
    min-width: 0%;
  }
`

// Todo: remove this before 1th of may 2020, as this alert wont be relevant anymore
const UpdateAlert: React.FC = () => {
  const hide = useSelector(isEmbedded)
  if (!hide && !getCookie(COOKIE_NAME)) {
    return (
      <StyledAlert
        dismissible
        compact
        level="attention"
        onDismiss={() => createCookie(COOKIE_NAME, '160')} // 4 weeks
      >
        <Paragraph>
          De indeling van de kaartlagen is veranderd.{' '}
          <Link onDarkBackground title="Lees meer" href="/content/nieuws/">
            Lees meer
          </Link>
        </Paragraph>
      </StyledAlert>
    )
  }

  return null
}

export default UpdateAlert
