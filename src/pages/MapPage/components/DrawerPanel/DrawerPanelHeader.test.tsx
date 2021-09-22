import { fireEvent, render, screen } from '@testing-library/react'
import withMapContext from '../../../../shared/utils/withMapContext'
import DrawerPanelHeader from './DrawerPanelHeader'

const CLOSE_BUTTON_TITLE = 'Sluit paneel'

describe('DrawerPanelHeader', () => {
  it('renders the panel header', () => {
    const { container } = render(withMapContext(<DrawerPanelHeader />))

    expect(container.firstChild).toBeDefined()
  })

  it('renders the children passed to the header', () => {
    const text = 'Hello World!'
    render(withMapContext(<DrawerPanelHeader>{text}</DrawerPanelHeader>))

    expect(screen.getByText(text)).toBeInTheDocument()
  })

  it('renders the close button if the header is closable', () => {
    render(withMapContext(<DrawerPanelHeader onClose={() => {}} />))

    expect(screen.getByTitle(CLOSE_BUTTON_TITLE)).toBeInTheDocument()
  })

  it('calls the onClose callback when the close button is clicked', () => {
    const onClose = jest.fn()
    render(withMapContext(<DrawerPanelHeader onClose={onClose} />))

    fireEvent.click(screen.getByTitle(CLOSE_BUTTON_TITLE))

    expect(onClose).toHaveBeenCalled()
  })
})
