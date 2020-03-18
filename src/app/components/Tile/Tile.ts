import styled, { css } from '@datapunt/asc-core'
import { breakpoint, perceivedLoading, themeColor, Link, themeSpacing } from '@datapunt/asc-ui'
import { SizeOnBreakpoint } from '../TileGrid/TileGridStyle'
import getImageFromCms from '../../utils/getImageFromCms'

type TileProps = {
  backgroundImage?: string
  isLoading?: boolean
  span?: SizeOnBreakpoint
  animateLoading?: boolean
}

const Tile = styled(Link)<TileProps>`
  display: block;
  position: relative;
  width: 100%;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  padding: ${themeSpacing(12, 5)};
  min-height: 100%;
  color: ${themeColor('tint', 'level7')};
  background-position: center;

  ${({ backgroundImage, span, isLoading }) =>
    backgroundImage && span && !isLoading
      ? css`
          ${span &&
            Object.entries(span).map(
              ([brkPoint, size]: [any, any]) => css`
                background-image: url(${getImageFromCms(backgroundImage, 400, 300)});
                @media screen and ${breakpoint('min-width', brkPoint)} {
                  background-image: url(${getImageFromCms(
                    backgroundImage,
                    size[1] === 2 ? 600 : 300,
                    size[0] === 2 ? 600 : 300,
                  )});
                }
              `,
            )}
        `
      : css`
          background-color: ${themeColor('support', 'valid')};
        `}
  ${({ isLoading, theme, animateLoading }) =>
    isLoading &&
    css`
      ${perceivedLoading(animateLoading)({ theme })}
      & > * {
        display: none;
      }
    `}

  &::before {
    content: '';
    width: 0;
    height: 0;
    border-width: 22px;
    border-color: transparent;
    position: absolute;
    border-style: solid;
    right: 0;
    bottom: 0;
    border-bottom-color: white;
    border-right-color: white;
  }
`

export default Tile
