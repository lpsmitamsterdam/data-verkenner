import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import withAppContext from '../../../../app/utils/withAppContext'
import { AuthTokenProvider } from '../../../../app/contexts/AuthToken/AuthTokenContext'
import ImageViewerError from './ImageViewerError'

describe('ImageViewerError', () => {
  it('renders the component', () => {
    const onDownload = jest.fn()
    render(
      withAppContext(
        <AuthTokenProvider>
          <ImageViewerError downloadError={false} isImage={false} onDownload={onDownload} />
        </AuthTokenProvider>,
      ),
    )
  })

  it('displays a message to retry on download errors', () => {
    const onDownload = jest.fn()
    render(
      withAppContext(
        <AuthTokenProvider>
          <ImageViewerError downloadError isImage={false} onDownload={onDownload} />
        </AuthTokenProvider>,
      ),
    )

    expect(
      screen.getByText('Er is een fout opgetreden bij het laden van dit bestand.'),
    ).toBeInTheDocument()
  })

  it('displays a message that non-image files cannot be displayed', () => {
    const onDownload = jest.fn()
    render(
      withAppContext(
        <AuthTokenProvider>
          <ImageViewerError downloadError={false} isImage={false} onDownload={onDownload} />
        </AuthTokenProvider>,
      ),
    )

    expect(
      screen.getByText('Dit bestandsformaat kan niet worden weergegeven op deze pagina.'),
    ).toBeInTheDocument()
  })

  it('reloads the window on download errors button click', async () => {
    const onDownload = jest.fn()
    render(
      withAppContext(
        <AuthTokenProvider>
          <ImageViewerError downloadError isImage={false} onDownload={onDownload} />
        </AuthTokenProvider>,
      ),
    )

    const originalLocation = window.location
    const reloadMock = jest.fn()

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { reload: reloadMock },
    })

    await waitFor(() => fireEvent.click(screen.getByText('Probeer opnieuw')))
    expect(reloadMock).toHaveBeenCalled()

    window.location = originalLocation
  })
})
