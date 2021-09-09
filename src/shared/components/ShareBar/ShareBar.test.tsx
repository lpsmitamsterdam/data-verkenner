import { fireEvent, render, screen } from '@testing-library/react'
import ShareBar from './ShareBar'

describe('ShareBar', () => {
  beforeEach(() => {
    global.window.open = jest.fn()
    global.window.print = jest.fn()
  })

  it('should handle onClick event on buttons', () => {
    render(<ShareBar hideInPrintMode={false} />)

    const buttons = screen.queryAllByRole('button')

    buttons.forEach((button) => {
      fireEvent.click(button)
    })

    expect(buttons.length).toBe(5)
  })
})
