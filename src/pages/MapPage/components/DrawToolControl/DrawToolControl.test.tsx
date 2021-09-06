import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useIsEmbedded } from '../../../../shared/contexts/ui'
import DrawToolControl from './DrawToolControl'

jest.mock('../../../../shared/contexts/ui')
jest.mock('../DrawTool/DrawTool', () => () => null)

const useIsEmbeddedMock = mocked(useIsEmbedded)

describe('DrawToolControl', () => {
  beforeEach(() => {
    useIsEmbeddedMock.mockReturnValue(false)
  })

  afterEach(() => {
    useIsEmbeddedMock.mockReset()
  })

  it('renders the control', () => {
    render(<DrawToolControl />)
    expect(screen.getByTestId('drawtoolControl')).toBeInTheDocument()
  })

  it('hides the control if embedded', () => {
    useIsEmbeddedMock.mockReturnValue(true)
    render(<DrawToolControl />)
    expect(screen.queryByTestId('drawtoolControl')).not.toBeInTheDocument()
  })
})
