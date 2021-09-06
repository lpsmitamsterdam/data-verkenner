import { render } from '@testing-library/react'
import 'jest-styled-components'
import withAppContext from '../../../../shared/utils/withAppContext'
import { DeviceMode } from '../DrawerOverlay'
import DrawerPanel from './DrawerPanel'
import { slideInDesktop, slideInMobile } from './keyframes'

describe('DrawerPanel', () => {
  it('renders the panel', () => {
    const { container } = render(withAppContext(<DrawerPanel />))

    expect(container.firstChild).toBeDefined()
  })

  it('renders the panel in a stack on mobile', () => {
    const { container } = render(withAppContext(<DrawerPanel stackLevel={1} />))

    expect(container.firstChild).toHaveStyleRule('margin-top', '32px')
  })

  it('renders the panel with the correct animation on mobile', () => {
    const { container } = render(withAppContext(<DrawerPanel />))

    expect(container.firstChild).toHaveStyleRule(
      'animation',
      expect.stringContaining(slideInMobile.getName()),
    )
  })

  it('renders the panel with the correct animation on desktop', () => {
    const { container } = render(withAppContext(<DrawerPanel deviceMode={DeviceMode.Desktop} />))

    expect(container.firstChild).toHaveStyleRule(
      'animation',
      expect.stringContaining(slideInDesktop.getName()),
    )
  })
})
