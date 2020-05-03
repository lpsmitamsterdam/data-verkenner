import React from 'react'
import { AlertMessage, Paragraph } from '@datapunt/asc-ui'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { getMessage } from '../../../shared/ducks/error/error-message'

const StyledAlertMessage = styled(AlertMessage)`
  /* Ensure outline is visible when element is in focus */
  &:focus {
    z-index: 999;
  }
`

const ErrorAlert: React.FC = () => {
  const message: string = useSelector(getMessage)

  return (
    <StyledAlertMessage dismissible compact level="error">
      <Paragraph>{message}</Paragraph>
    </StyledAlertMessage>
  )
}

export default ErrorAlert
