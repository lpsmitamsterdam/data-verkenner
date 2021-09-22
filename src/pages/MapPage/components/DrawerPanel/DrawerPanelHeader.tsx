import { Close } from '@amsterdam/asc-assets'
import { Button, Heading, themeColor, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'
import type { FunctionComponent, HTMLAttributes } from 'react'
import { useMapContext } from '../../../../shared/contexts/map/MapContext'
import DetailInfoBox from '../DetailPanel/DetailInfoBox'

const HeaderContainer = styled.div`
  display: flex;
  margin: ${themeSpacing(5, 0)};
`

const CloseButton = styled(Button)`
  margin-left: auto;
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const TitleHeading = styled(Heading)`
  margin: 0;
`

const SubtitleHeading = styled(Heading)`
  color: ${themeColor('secondary')};
  margin: 0;
`

const StyledDetailInfoBox = styled(DetailInfoBox)`
  position: absolute;
  right: 0;
  top: 0;
`

interface DrawerPanelHeaderProps {
  onClose?: () => void
}

const DrawerPanelHeader: FunctionComponent<
  DrawerPanelHeaderProps & HTMLAttributes<HTMLDivElement>
> = ({ children, onClose, className }) => {
  const { panelHeader, infoBox } = useMapContext()
  return (
    <HeaderContainer className={className}>
      <Wrapper>
        {children || (
          <>
            {panelHeader.type && (
              <SubtitleHeading forwardedAs="h5">{panelHeader.type}</SubtitleHeading>
            )}
            <TitleHeading>{panelHeader.title}</TitleHeading>
            {panelHeader.customElement && panelHeader.customElement}
            {infoBox && <StyledDetailInfoBox {...infoBox} />}
          </>
        )}
      </Wrapper>
      {onClose && (
        <CloseButton
          data-testid="closePanelButton"
          variant="blank"
          title="Sluit paneel"
          type="button"
          size={30}
          onClick={onClose}
          icon={<Close />}
        />
      )}
    </HeaderContainer>
  )
}

export default DrawerPanelHeader
