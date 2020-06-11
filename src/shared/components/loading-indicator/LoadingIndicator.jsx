import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Spinner, svgFill, themeColor } from '@datapunt/asc-ui'

const LoadingIndicator = ({ IconComponent, ...otherProps }) => (
  <div className="loading-indicator" {...otherProps}>
    {IconComponent}
  </div>
)

const StyledSpinner = styled(Spinner)`
  ${svgFill(themeColor('secondary'))}
`

LoadingIndicator.defaultProps = {
  IconComponent: <StyledSpinner size={36} />,
}

LoadingIndicator.propTypes = {
  IconComponent: PropTypes.node,
}

export default LoadingIndicator
