import { Close } from '@amsterdam/asc-assets'
import { Button, Divider, Heading, Modal, Paragraph, TopBar } from '@amsterdam/asc-ui'
import type { FunctionComponent } from 'react'
import CONSTANTS from '../../config/constants'
import ModalBlock from './ModalBlock'

interface InfoModalProps {
  handleClose(): void
  open: boolean
  title: string
  body: string
}

const InfoModal: FunctionComponent<InfoModalProps> = ({ open, handleClose, title, body }) => (
  <Modal
    aria-labelledby="feedback"
    aria-describedby="feedback"
    open={open}
    onClose={handleClose}
    hideOverFlow={false}
    backdropOpacity={CONSTANTS.BACKDROP_OPACITY}
  >
    <TopBar>
      <Heading style={{ flexGrow: 1 }} as="h4">
        {title}
        <Button variant="blank" type="button" size={30} onClick={handleClose} icon={<Close />} />
      </Heading>
    </TopBar>
    <Divider />
    <ModalBlock>
      {body && <Paragraph className="infomodal__body" dangerouslySetInnerHTML={{ __html: body }} />}
    </ModalBlock>
  </Modal>
)

export default InfoModal
