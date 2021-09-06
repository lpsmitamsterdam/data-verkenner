import { ThemeProvider } from '@amsterdam/asc-ui'
import { screen, render } from '@testing-library/react'
import type { SearchBarProps } from './SearchBar'
import SearchBar from './SearchBar'

// Mock the SearchBarFilter component as it's not relevant for this test and is tested seperately
jest.mock('../SearchBarFilter', () => () => <div />)

describe('SearchBar', () => {
  const props: SearchBarProps = {
    expanded: false,
    placeholder: 'Zoek',
    onBlur: jest.fn(),
    onFocus: jest.fn(),
    onChange: jest.fn(),
    onClear: jest.fn(),
    onKeyDown: jest.fn(),
    value: 'foo',
    setSearchBarFilterValue: () => {},
    searchBarFilterValue: '',
  }

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  it('should not show the backdrop by default', () => {
    render(
      <ThemeProvider>
        <SearchBar {...props} />
      </ThemeProvider>,
    )

    expect(screen.queryByTestId('backDrop')).not.toBeInTheDocument()
  })

  it('should show the backdrop when the component receives the right props', () => {
    render(
      <ThemeProvider>
        <SearchBar {...{ ...props, expanded: true }} />
      </ThemeProvider>,
    )

    expect(screen.queryByTestId('backDrop')).toBeInTheDocument()
  })
})
