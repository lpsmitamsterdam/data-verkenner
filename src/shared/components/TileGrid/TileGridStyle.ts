import { ascDefaultTheme, breakpoint } from '@amsterdam/asc-ui'
import styled, { css } from 'styled-components'
import type { Theme } from '@amsterdam/asc-ui'

const GAP = ascDefaultTheme.spacing * 6

type Size = [number, number]
export type SizeOnBreakpoint = { [key in keyof Partial<Theme.BreakpointsInterface>]: Size }

export interface TileGridProps {
  grid?: SizeOnBreakpoint
}

export interface TileGridItemProps {
  span?: SizeOnBreakpoint
}

export const TileGridItem = styled.div<TileGridItemProps>`
  min-height: 250px;

  @supports (display: grid) {
    position: relative;
    width: 100%;
    display: block;
    margin-right: initial;
    margin-bottom: initial;
    height: 100%;
    flex-shrink: initial;
    & > * {
      border: none !important;
    }

    ${({ span }) =>
      span &&
      Object.entries(span).map(
        ([brkPoint, size]: [any, any]) => css`
          @media screen and ${breakpoint('min-width', brkPoint)} {
            grid-column: span ${size[1]};
            grid-row: span ${size[0]};
            ${size[1] === 2 &&
            css`
              &:before {
                padding-top: 50%;
              }
            `}
          }
        `,
      )}
  }
`

export default styled.div<TileGridProps>`
  // Begin IE 11 rules
  display: flex;
  flex-wrap: wrap;
  height: 50%;
  width: 100%;
  // End IE 11 rules

  @supports (display: grid) {
    display: grid;
    height: initial;
    grid-column-gap: ${GAP}px;
    grid-row-gap: ${GAP}px;

    ${({ grid }) =>
      grid &&
      Object.entries(grid).map(
        ([brkPoint, size]: [any, any]) => css`
          @media screen and ${breakpoint('min-width', brkPoint)} {
            grid-template-rows: repeat(${size[0]}, 1fr);
            grid-template-columns: repeat(${size[1]}, 1fr);
          }
        `,
      )}
  }
`
