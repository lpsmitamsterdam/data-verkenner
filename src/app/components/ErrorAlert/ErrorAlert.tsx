import React from 'react'
import { Alert, Paragraph } from '@datapunt/asc-ui'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { getMessage } from '../../../shared/ducks/error/error-message'

const StyledAlert = styled(Alert)`
  /* Ensure outline is visible when element is in focus */
  &:focus {
    z-index: 999;
  }
`

const ErrorAlert: React.FC = () => {
  const message: string = useSelector(getMessage)

  return (
    <StyledAlert dismissible compact level="error">
      <Paragraph>{message}</Paragraph>
    </StyledAlert>
  )
}

export default ErrorAlert
