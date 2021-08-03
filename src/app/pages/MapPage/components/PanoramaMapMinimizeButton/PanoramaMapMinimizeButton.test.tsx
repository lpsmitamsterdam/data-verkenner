import { Map } from '@amsterdam/arm-core'
import { fireEvent, render, screen } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import MapContext from '../../MapContext'
import withMapContext, { initialState } from '../../../../utils/withMapContext'
import withAppContext from '../../../../utils/withAppContext'
import PanoramaMapMinimizeButton from './PanoramaMapMinimizeButton'

jest.mock('@amsterdam/arm-core', () => ({
  // @ts-ignore
  ...jest.requireActual('@amsterdam/arm-core'),
  Map: ({ children }: PropsWithChildren<any>) => <div>{children}</div>,
}))

describe('PanoramaMapMinimizeButton', () => {
  it('renders', () => {
    render(withMapContext(<PanoramaMapMinimizeButton />))
  })

  it('calls setPanoFullScreen with true when the resize button is clicked', async () => {
    const setPanoFullScreenMock = jest.fn()

    render(
      withAppContext(
        <MapContext.Provider
          value={{
            ...initialState,
            setPanoFullScreen: setPanoFullScreenMock,
          }}
        >
          <Map>
            <PanoramaMapMinimizeButton />
          </Map>
        </MapContext.Provider>,
      ),
    )

    const button = await screen.findByTestId('panoramaMapMinimize')
    fireEvent.click(button)
    expect(setPanoFullScreenMock).toHaveBeenCalledWith(true)
  })
})
