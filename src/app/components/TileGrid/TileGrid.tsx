import React from 'react'
import TileGridStyle, { Props } from './TileGridStyle'

const TileGrid: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...otherProps
}) => <TileGridStyle {...otherProps}>{children}</TileGridStyle>

export default TileGrid
