import { render } from '@testing-library/react'
import withAppContext from '../../../../shared/utils/withAppContext'
import MapContainer from './MapContainer'

describe('MapContainer', () => {
  it('renders the container', () => {
    const { container } = render(withAppContext(<MapContainer />))

    expect(container.firstChild).toBeDefined()
  })
})
