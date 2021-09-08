import { routing } from '../../routes'
import redirectToDcatd, {
  DCATD_DETAIL_REDIRECT_URL,
  DCATD_LIST_REDIRECT_URL,
} from './redirectToDcatd'

describe('redirectToDcatd', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        assign: jest.fn(),
      },
    })
  })

  it('sets the variables to redirect in the session storage', () => {
    const id = '123'

    redirectToDcatd(id)

    expect(global.sessionStorage.setItem).toHaveBeenCalledWith(
      DCATD_DETAIL_REDIRECT_URL,
      document.location.href,
    )

    expect(global.sessionStorage.setItem).toHaveBeenCalledWith(
      DCATD_LIST_REDIRECT_URL,
      `${document.location.origin}${routing.datasetSearch.path}`,
    )
  })

  it('redirects the user', () => {
    const id = '123'

    redirectToDcatd(id)

    expect(window.location.assign).toHaveBeenCalledWith(`/dcatd_admin/#/datasets/${id}`)
  })
})
