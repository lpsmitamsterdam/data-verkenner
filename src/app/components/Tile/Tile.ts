import styled, { css } from '@datapunt/asc-core'
import { breakpoint, perceivedLoading, themeColor, themeSpacing } from '@datapunt/asc-ui'
import { SizeOnBreakpoint } from '../TileGrid/TileGridStyle'

type TileProps = {
  backgroundImageTemplate?: string
  isLoading?: boolean
  span?: SizeOnBreakpoint
  animateLoading?: boolean
}

const Tile = styled.div<TileProps>`
  position: relative;
  width: 100%;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  padding: ${themeSpacing(12, 5)};
  min-height: 100%;

  ${({ backgroundImageTemplate, span }) =>
    backgroundImageTemplate && span
      ? css`
          ${span &&
            Object.entries(span).map(
              ([brkPoint, size]: [any, any]) => css`
                background-image: url(${backgroundImageTemplate
                  .replace('%w', '400')
                  .replace('%h', '300')});
                @media screen and ${breakpoint('min-width', brkPoint)} {
                  background-image: url(${backgroundImageTemplate
                    .replace('%w', size[1] === 2 ? '600' : '300')
                    .replace('%h', size[0] === 2 ? '600' : '300')});
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
