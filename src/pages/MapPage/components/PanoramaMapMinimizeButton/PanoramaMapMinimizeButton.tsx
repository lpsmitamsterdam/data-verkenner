import type { FunctionComponent } from 'react'
import { ControlButton } from '@amsterdam/arm-core'
import { breakpoint } from '@amsterdam/asc-ui'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import styled from 'styled-components'
import { useMapContext } from '../../../../app/contexts/map/MapContext'
import { PANORAMA_FULLSCREEN_TOGGLE } from '../../matomo-events'
import Reduce from '../PanoramaViewer/reduce.svg'

const ResizeButton = styled(ControlButton)`
  @media screen and ${breakpoint('max-width', 'tabletM')} {
    display: none; // below tabletM is always full screen, so no need to show this button
  }
`

const PanoramaMapMinimizeButton: FunctionComponent = () => {
  const { panoFullScreen, setPanoFullScreen } = useMapContext()
  const { trackEvent } = useMatomo()

  return (
    <ResizeButton
      type="button"
      variant="blank"
      title="Kaart verkleinen"
      size={44}
      iconSize={40}
      data-testid="panoramaMapMinimize"
      onClick={() => {
        trackEvent({
          ...PANORAMA_FULLSCREEN_TOGGLE,
          name: 'klein',
        })
        setPanoFullScreen(!panoFullScreen)
      }}
      icon={<Reduce />}
    />
  )
}

export default PanoramaMapMinimizeButton
