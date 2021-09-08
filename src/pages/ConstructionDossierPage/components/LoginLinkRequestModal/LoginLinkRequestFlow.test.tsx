import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ThemeProvider } from '@amsterdam/asc-ui'
import { mocked } from 'ts-jest/utils'
import requestLoginLink from '../../../../api/iiif/requestLoginLink'
import LoginLinkRequestFlow from './LoginLinkRequestFlow'

jest.mock('../../../../api/iiif/requestLoginLink')

const requestLoginLinkMock = mocked(requestLoginLink)
const MOCK_EMAIL = 'janedoe@example.com'

describe('LoginLinkRequestFlow', () => {
  afterEach(() => {
    requestLoginLinkMock.mockClear()
  })

  it('requests a login link', () => {
    const origin = 'http://localhost:3000'
    const pathname = '/data/bouwdossiers/bouwdossier/ID123456'
    const locationSpy = jest.spyOn(window, 'location', 'get').mockReturnValue({
      origin,
      pathname,
      // Add the search to ensure it does not accidentally end up in the request.
      search: '?foo=bar',
    } as Location)

    requestLoginLinkMock.mockReturnValue(new Promise(() => {}))

    render(
      <ThemeProvider>
        <LoginLinkRequestFlow email={MOCK_EMAIL} onRetry={() => {}} onClose={() => {}} />
      </ThemeProvider>,
    )

    expect(requestLoginLinkMock).toHaveBeenCalledWith({
      email: MOCK_EMAIL,
      originUrl: origin + pathname,
    })

    locationSpy.mockRestore()
  })

  it('shows the loading message', () => {
    requestLoginLinkMock.mockReturnValue(new Promise(() => {}))

    render(
      <ThemeProvider>
        <LoginLinkRequestFlow email={MOCK_EMAIL} onRetry={() => {}} onClose={() => {}} />
      </ThemeProvider>,
    )

    expect(screen.getByTestId('loadingMessage')).toBeInTheDocument()
  })

  it('shows the error message', async () => {
    requestLoginLinkMock.mockReturnValue(Promise.reject(new Error('Whoopsie')))

    render(
      <ThemeProvider>
        <LoginLinkRequestFlow email={MOCK_EMAIL} onRetry={() => {}} onClose={() => {}} />
      </ThemeProvider>,
    )

    await waitFor(() => expect(screen.getByTestId('errorMessage')).toBeInTheDocument())
  })

  it('handles a retry the in the error state', async () => {
    requestLoginLinkMock.mockReturnValue(Promise.reject(new Error('Whoopsie')))

    const onRetry = jest.fn()

    render(
      <ThemeProvider>
        <LoginLinkRequestFlow email={MOCK_EMAIL} onRetry={onRetry} onClose={() => {}} />
      </ThemeProvider>,
    )

    const retryButton = await waitFor(() => screen.findByText('Probeer opnieuw'))

    fireEvent.click(retryButton)
    expect(onRetry).toHaveBeenCalled()
  })

  it('handles closing the modal in the error state', async () => {
    requestLoginLinkMock.mockReturnValue(Promise.reject(new Error('Whoopsie')))

    const onClose = jest.fn()

    render(
      <ThemeProvider>
        <LoginLinkRequestFlow email={MOCK_EMAIL} onRetry={() => {}} onClose={onClose} />
      </ThemeProvider>,
    )

    const closeButton = await waitFor(() => screen.findByText('Annuleren'))

    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalled()
  })

  it('shows the success message', async () => {
    requestLoginLinkMock.mockReturnValue(Promise.resolve())

    render(
      <ThemeProvider>
        <LoginLinkRequestFlow email={MOCK_EMAIL} onRetry={() => {}} onClose={() => {}} />
      </ThemeProvider>,
    )

    await waitFor(() => expect(screen.getByTestId('successMessage')).toBeInTheDocument())
  })

  it('handles closing the modal in the success state', async () => {
    requestLoginLinkMock.mockReturnValue(Promise.resolve())

    const onClose = jest.fn()

    render(
      <ThemeProvider>
        <LoginLinkRequestFlow email={MOCK_EMAIL} onRetry={() => {}} onClose={onClose} />
      </ThemeProvider>,
    )

    const closeButton = await waitFor(() => screen.findByText('Sluiten'))

    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalled()
  })
})
