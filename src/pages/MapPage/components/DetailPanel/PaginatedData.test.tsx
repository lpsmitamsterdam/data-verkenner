import { rest } from 'msw'
import { render, screen, waitFor } from '@testing-library/react'
import joinUrl from '../../../../shared/utils/joinUrl'
import environment from '../../../../environment'
import { DetailResultItemType } from '../../legacy/types/details'
import PaginatedData from './PaginatedData'
import withMapContext from '../../../../shared/utils/withMapContext'
import getPaginatedDataFromApi from '../../utils/getPaginatedDataFromApi'
import { server } from '../../../../../test/server'
import { listFixture } from '../../../../api/brk/subject'

const brkUrl = joinUrl([environment.API_ROOT, 'brk/zakelijk-recht'])

describe('PaginatedData', () => {
  it('should render a preloader', () => {
    server.use(
      rest.get(brkUrl, async (req, res, ctx) => {
        return res(ctx.json(listFixture))
      }),
    )

    render(
      withMapContext(
        <PaginatedData
          item={{
            type: DetailResultItemType.PaginatedData,
            pageSize: 20,
            page: 1,
            infoBox: {
              description:
                'Een Zakelijk Recht is een door een complex van rechtsregels verleende en beschermende bevoegdheid van een persoon. Het meest omvattende recht dat een persoon op een zaak kan hebben is eigendom.',
              url: 'https://www.amsterdam.nl/stelselpedia/brk-index/catalog-brk-levering/objectklasse-4/',
              plural: 'Zakelijke rechten',
            },
            title: 'Zakelijke rechten',
            getData: getPaginatedDataFromApi(brkUrl),
            toView: jest.fn(),
          }}
        />,
      ),
    )

    expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument()
  })

  it('should render a error on API errors', async () => {
    server.use(
      rest.get(brkUrl, async (req, res, ctx) => {
        return res(ctx.status(404))
      }),
    )

    render(
      withMapContext(
        <PaginatedData
          item={{
            type: DetailResultItemType.PaginatedData,
            pageSize: 20,
            page: 1,
            infoBox: {
              description:
                'Een Zakelijk Recht is een door een complex van rechtsregels verleende en beschermende bevoegdheid van een persoon. Het meest omvattende recht dat een persoon op een zaak kan hebben is eigendom.',
              url: 'https://www.amsterdam.nl/stelselpedia/brk-index/catalog-brk-levering/objectklasse-4/',
              plural: 'Zakelijke rechten',
            },
            title: 'Zakelijke rechten',
            getData: getPaginatedDataFromApi(brkUrl),
            toView: jest.fn(),
          }}
        />,
      ),
    )

    await waitFor(() => {
      expect(screen.getByTestId('errorMessage')).toBeInTheDocument()
    })
  })
})
