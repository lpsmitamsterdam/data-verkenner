import { fireEvent, render, screen } from '@testing-library/react'
import { toGeoSearch } from '../../../../app/links'
import withMapContext from '../../../../app/utils/withMapContext'
import DetailPanel from './DetailPanel'

const pushMock = jest.fn()
jest.mock('react-router-dom', () => ({
  // @ts-ignore
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: pushMock,
  }),
  useLocation: () => ({
    search: '?pano={"shouldBe": "removed"}&thisOne="should_not"',
  }),
  useParams: () => ({
    type: 'gebieden',
    subtype: 'stadsdeel',
    id: '124',
  }),
}))

// tests need to be (re)written for this (quite complex) component
describe.skip('DetailPanel', () => {
  it('should navigate back to geoSearch page, without pano parameter, when closing the panel', async () => {
    render(withMapContext(<DetailPanel />))

    const button = await screen.findByTitle('Sluit')
    expect(pushMock).not.toHaveBeenCalled()

    fireEvent.click(button)

    expect(pushMock).toHaveBeenCalledWith({
      ...toGeoSearch(),
      search: 'thisOne=%22should_not%22',
    })
  })
})
