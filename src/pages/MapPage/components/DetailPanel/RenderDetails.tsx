import { Alert, Paragraph, themeSpacing } from '@amsterdam/asc-ui'
import { Fragment, useEffect } from 'react'
import type { FunctionComponent } from 'react'
import styled, { css } from 'styled-components'
import { v4 as uuid } from 'uuid'
import type { MapDetails } from '../../legacy/services/map'
import AuthAlert from '../../../../shared/components/Alerts/AuthAlert'
import { useMapContext } from '../../../../shared/contexts/map/MapContext'
import Spacer from '../../../../shared/components/Spacer/Spacer'
import PanoramaPreview from '../PanoramaPreview/PanoramaPreview'
import DetailItem from './DetailItem'

const Message = styled(Paragraph)`
  margin: ${themeSpacing(4)} 0;
`

const StyledAuthAlert = styled(AuthAlert)`
  order: -1; // Make sure the alert is always on top and not pushed down because of grid
`

// Todo: remove gridArea when legacy map is removed
const ItemWrapper = styled.div<{ gridArea?: string }>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${themeSpacing(3)};
  ${({ gridArea }) =>
    gridArea &&
    css`
      grid-area: ${gridArea} !important;
    `}
`

export interface RenderDetailsProps {
  details: (MapDetails & { showAuthAlert: boolean; authExcludedInfo?: string }) | null
  showNoMapObjectsAlert?: boolean
}

const RenderDetails: FunctionComponent<RenderDetailsProps> = ({
  details,
  showNoMapObjectsAlert,
}) => {
  const { setInfoBox } = useMapContext()
  useEffect(() => {
    if (details?.data.infoBox) {
      setInfoBox(details?.data.infoBox)
    }
    return () => {
      setInfoBox(undefined)
    }
  }, [details, setInfoBox])
  if (!details) {
    // Todo: redirect to 404?
    return <Message>Geen detailweergave beschikbaar.</Message>
  }

  return (
    <>
      {showNoMapObjectsAlert === true && (
        <Alert level="warning" dismissible>
          Er zijn geen resultaten op de kaart bij dit object
        </Alert>
      )}
      {details.showAuthAlert && <StyledAuthAlert excludedResults={details.authExcludedInfo} />}
      {details.location && !details.data.noPanorama ? (
        <PanoramaPreview location={details.location} radius={180} aspect={2.5} />
      ) : null}
      <Spacer />
      {details.data.notifications?.map((notification) => (
        <Fragment key={notification.id}>
          <Alert level={notification.level} dismissible={notification.canClose}>
            {notification.value}
          </Alert>
          <Spacer />
        </Fragment>
      ))}
      {details.data.items.map((item) => {
        if (!item) {
          return null
        }

        return (
          <ItemWrapper
            key={`${item.title as string}_${uuid()}`}
            className={item.type}
            gridArea={item.gridArea}
          >
            <DetailItem item={item} />
          </ItemWrapper>
        )
      })}
    </>
  )
}

export default RenderDetails
