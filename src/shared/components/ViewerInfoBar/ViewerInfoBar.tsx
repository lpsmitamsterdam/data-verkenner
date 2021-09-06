import { breakpoint, Hidden, themeSpacing } from '@amsterdam/asc-ui'
import type { FunctionComponent } from 'react'
import { useMemo } from 'react'
import styled, { css } from 'styled-components'
import type { LatLngLiteral } from 'leaflet'
import { wgs84ToRd } from '../../utils/coordinateReferenceSystem'
import formatDate from '../../utils/formatDate'

const ViewerInfoBarStyle = styled.div<{ panoFullScreen?: boolean; panelActive: boolean }>`
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  white-space: nowrap;

  @media screen and ${breakpoint('min-width', 'desktop')} {
    flex-direction: row;
  }

  span {
    display: inline-block;
    padding: ${themeSpacing(2)};

    &:not(:last-of-type) {
      border-right: 1px solid rgba(255, 255, 255, 0.2);
    }
  }

  ${({ panoFullScreen }) =>
    !panoFullScreen &&
    css`
      flex-direction: row;
    `}

  ${({ panoFullScreen, panelActive }) =>
    panoFullScreen &&
    !panelActive &&
    css`
      // Ideally we would use the Hidden component but it doesn't play nice with multiple instances (see below for more info)
      display: none;
      align-items: flex-end;

      span:last-of-type {
        border-top: 1px solid rgba(255, 255, 255, 0.2);
      }

      span:not(:last-of-type) {
        border-right: 0;
      }

      @media screen and ${breakpoint('min-width', 'tabletM')} {
        display: flex;
      }

      @media screen and ${breakpoint('min-width', 'laptop')} {
        flex-direction: row;
        align-items: normal;

        span:last-of-type {
          border-top: 0;
        }

        span:not(:last-of-type) {
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }
      }
    `}
`

export interface ViewerInfoBarProps {
  location: LatLngLiteral
  date?: string
  panelActive: boolean
  panoFullScreen?: boolean
}

const ViewerInfoBar: FunctionComponent<ViewerInfoBarProps> = ({
  location,
  date,
  panelActive,
  panoFullScreen,
}) => {
  const { x: rdX, y: rdY } = useMemo(() => wgs84ToRd(location), [location])
  const formattedDate = useMemo(
    () =>
      date
        ? formatDate(new Date(date), {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })
        : null,
    [date],
  )
  const formattedLocation = `${rdX.toFixed(2)}, ${rdY.toFixed(2)} (${location.lat.toFixed(
    7,
  )}, ${location.lng.toFixed(7)})`

  if (panelActive && panoFullScreen) {
    return (
      <Hidden maxBreakpoint="laptop">
        <ViewerInfoBarStyle panoFullScreen={panoFullScreen} panelActive={panelActive}>
          <span>{formattedDate}</span>
          <Hidden maxBreakpoint="desktop">
            <span>{formattedLocation}</span>
          </Hidden>
        </ViewerInfoBarStyle>
      </Hidden>
    )
  }

  // We should use the Hidden component here as a wrapper with maxBreakpoint="tabletM" but there seems to be an issue with multiple rendered
  // instances of it (we also use the Hidden component in PanoramaPrimaryMenuControl). The Hidden component works via a window.matchMedia event
  // listener, which will use the first media-query it's passed - in this case laptop, which is not what we want for this component so use a
  // styled-components media query and display: none
  if (panoFullScreen) {
    return (
      <ViewerInfoBarStyle panoFullScreen={panoFullScreen} panelActive={panelActive}>
        <span>{formattedDate}</span>
        <span>{formattedLocation}</span>
      </ViewerInfoBarStyle>
    )
  }

  return (
    <ViewerInfoBarStyle panoFullScreen={panoFullScreen} panelActive={panelActive}>
      <span>{formattedDate}</span>
      <Hidden maxBreakpoint="tabletM">
        <span>{formattedLocation}</span>
      </Hidden>
    </ViewerInfoBarStyle>
  )
}

export default ViewerInfoBar
