import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { server } from '../../../../test/server'
import { singleFixture as bagFixture } from '../../../api/dataselectie/bag'
import environment from '../../../environment'
import { routing } from '../../routes'
import joinUrl from '../../utils/joinUrl'
import withAppContext from '../../utils/withAppContext'
import DataSelection from './DataSelection'
import { DataSelectionProvider } from '../../contexts/DataSelection/DataSelectionContext'

const pathname = routing.addresses.path
let search = '?modus=volledig'

const pushMock = jest.fn()
const replaceMock = jest.fn()

jest.mock('react-router-dom', () => ({
  // @ts-ignore
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: pushMock,
    replace: replaceMock,
  }),
  useLocation: () => ({
    pathname,
    search,
  }),
}))

const dataSelectionBagUrl = joinUrl([environment.API_ROOT, 'dataselectie/bag/'])

describe('DataSelection', () => {
  beforeEach(() => {
    server.use(rest.get(dataSelectionBagUrl, async (req, res, ctx) => res(ctx.json(bagFixture))))
  })
  describe('Table', () => {
    it('should render', async () => {
      render(
        withAppContext(
          <DataSelectionProvider>
            <DataSelection />
          </DataSelectionProvider>,
        ),
      )
      await waitFor(() => {
        const rows = screen.queryAllByTestId('dataSelectionTableRow').length
        expect(rows).toBe(2)
      })
    })

    it('should add a filter', async () => {
      render(
        withAppContext(
          <DataSelectionProvider>
            <DataSelection />
          </DataSelectionProvider>,
        ),
      )
      await waitFor(() => {
        const filter = screen
          .queryByTestId('dataSelectionAvailableFilters')
          ?.querySelectorAll('a')[0] as Element
        fireEvent.click(filter)
        expect(filter).toHaveAttribute(
          'href',
          '/?filters=%7B%22woonplaats%22%3A%22Amsterdam%22%7D&modus=volledig',
        )
      })
    })

    it('should remove a filter', async () => {
      search = 'filters=%7B%22woonplaats%22%3A%22Amsterdam%22%7D'
      render(
        withAppContext(
          <DataSelectionProvider>
            <DataSelection />
          </DataSelectionProvider>,
        ),
      )
      await waitFor(() => {
        const activeFilter = screen.getAllByTestId('activeFiltersItem')[0]
        fireEvent.click(activeFilter)
        expect(activeFilter).toHaveAttribute('href', '/')
      })
    })
  })

  describe('List', () => {
    it('should render', async () => {
      search = ''
      render(
        withAppContext(
          <DataSelectionProvider>
            <DataSelection />
          </DataSelectionProvider>,
        ),
      )
      await waitFor(() => {
        const rows = screen.queryByTestId('dataSelectionList')?.querySelectorAll('li').length
        expect(rows).toBe(2)
      })
    })
  })
})
