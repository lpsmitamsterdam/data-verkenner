import { Button, perceivedLoading, themeColor, themeSpacing } from '@amsterdam/asc-ui'
import usePromise, { isPending, isRejected } from '@amsterdam/use-promise'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import type { FunctionComponent } from 'react'
import { useMemo } from 'react'
import type { LatLngLiteral } from 'leaflet'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import type { FetchPanoramaOptions } from '../../../../api/panorama/thumbnail'
import { getPanoramaThumbnail } from '../../../../api/panorama/thumbnail'
import { ForbiddenError } from '../../../../shared/utils/api/customError'
import PanoAlert from '../../../../shared/components/PanoAlert/PanoAlert'
import useBuildQueryString from '../../../../shared/hooks/useBuildQueryString'
import useParam from '../../../../shared/hooks/useParam'
import Maximize from '../../../../shared/assets/icons/icon-maximize.svg'
import {
  locationParam,
  mapLayersParam,
  panoFovParam,
  panoHeadingParam,
  panoPitchParam,
  zoomParam,
} from '../../query-params'
import { PANORAMA_THUMBNAIL } from '../../matomo-events'
import { PANO_LAYERS } from '../PanoramaViewer/PanoramaViewer'
import { useMapContext } from '../../../../shared/contexts/map/MapContext'

export interface PanoramaPreviewProps extends FetchPanoramaOptions {
  location: LatLngLiteral
}

const PreviewContainer = styled.div`
  position: relative;
  width: 100%;

  @media print {
    display: none;
  }
`

const PreviewImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 3;
`

const PreviewSkeleton = styled.div`
  aspect-ratio: 3;
  ${perceivedLoading()}
`

const PreviewMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${themeColor('tint', 'level3')};
`
const StyledButton = styled(Button)`
  position: absolute;
  bottom: ${themeSpacing(5)};
  right: ${themeSpacing(5)};
`

const MIN_ZOOM_LEVEL_PANO_LAYERS = 11

// TODO: Link to panorama detail panel
// TODO: Wait for image to load and decode to prevent flickering.
// TODO: AfterBeta: Remove legacy link
const PanoramaPreview: FunctionComponent<PanoramaPreviewProps> = ({
  location,
  width,
  fov,
  horizon,
  aspect,
  radius,
  ...otherProps
}) => {
  const [activeLayers] = useParam(mapLayersParam)
  const [zoom] = useParam(zoomParam)
  const { panoActive } = useMapContext()
  const browserLocation = useLocation()
  const { trackEvent } = useMatomo()

  const result = usePromise(
    () =>
      getPanoramaThumbnail(location, {
        width,
        fov,
        horizon,
        aspect,
        radius,
      }),
    [location],
  )

  const activeLayersWithPanorama = useMemo(
    () => [...activeLayers, ...PANO_LAYERS],
    [activeLayers, PANO_LAYERS],
  )

  const { buildQueryString } = useBuildQueryString()

  if (panoActive) {
    return null
  }

  if (isPending(result)) {
    return <PreviewSkeleton {...otherProps} />
  }

  if (isRejected(result)) {
    if (result.reason instanceof ForbiddenError) {
      return <PanoAlert {...otherProps} />
    }
    return <PreviewMessage {...otherProps}>Kan panoramabeeld niet laden.</PreviewMessage>
  }

  if (!result.value) {
    return <PreviewMessage {...otherProps}>Geen panoramabeeld beschikbaar.</PreviewMessage>
  }

  const to = {
    pathname: browserLocation.pathname,
    search: buildQueryString<any>([
      [panoPitchParam, panoPitchParam.initialValue],
      [panoFovParam, panoFovParam.initialValue],
      [panoHeadingParam, result?.value?.heading ?? panoHeadingParam.initialValue],
      [locationParam, location],
      [mapLayersParam, activeLayersWithPanorama],
      [zoomParam, zoom < MIN_ZOOM_LEVEL_PANO_LAYERS ? MIN_ZOOM_LEVEL_PANO_LAYERS : zoom],
    ]),
  }

  return (
    <PreviewContainer {...otherProps} data-testid="panoramaPreview">
      <StyledButton
        forwardedAs={RouterLink}
        // @ts-ignore
        to={to}
        onClick={() => {
          trackEvent(PANORAMA_THUMBNAIL)
        }}
        variant="primaryInverted"
        iconSize={24}
        iconLeft={<Maximize />}
      >
        Bekijk panoramabeeld
      </StyledButton>

      <PreviewImage src={result.value.url} alt="Voorvertoning van panoramabeeld" />
    </PreviewContainer>
  )
}

export default PanoramaPreview
