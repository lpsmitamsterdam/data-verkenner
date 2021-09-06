import { fireEvent, render, screen } from '@testing-library/react'
import type { NormalizedFieldItems } from '../../../normalizations/cms/types'
import { CmsType } from '../../config/cms.config'
import withAppContext from '../../utils/withAppContext'
import EditorialResults from './EditorialResults'

const EDITORIAL_CARD_TEST_ID = 'editorialCard'

describe('EditorialResults', () => {
  Object.defineProperty(window, 'location', {
    value: {
      ...window.location,
      reload: jest.fn(),
    },
  })

  const result: NormalizedFieldItems = {
    key: 1,
    id: '1',
    specialType: null,
    slug: 'slug',
    coverImage: '123.jpg',
    teaserImage: '456.jpg',
    dateLocale: 'locale',
    label: 'label',
    teaser: 'long text',
    type: CmsType.Article,
    intro: '',
  }

  it('should display the loading indicator', () => {
    const props = {
      query: '',
      label: 'Label',
      isOverviewPage: false,
      type: CmsType.Article,
      errors: [],
      results: [],
    }
    const { rerender } = render(<EditorialResults {...props} loading />)

    expect(screen.queryByTestId('loadingSpinner')).toBeInTheDocument()

    rerender(withAppContext(<EditorialResults {...props} loading={false} />))

    expect(screen.queryByTestId('loadingSpinner')).not.toBeInTheDocument()
  })

  it('should render the cards', () => {
    const props = {
      query: '',
      label: 'Label',
      loading: false,
      isOverviewPage: false,
      type: CmsType.Article,
      errors: [],
    }
    const { rerender } = render(withAppContext(<EditorialResults {...props} results={[]} />))

    expect(screen.queryAllByTestId(EDITORIAL_CARD_TEST_ID).length).toBe(0)

    // Should render two cards
    rerender(
      withAppContext(<EditorialResults {...props} results={[result, { ...result, id: '2' }]} />),
    )
    expect(screen.queryAllByTestId(EDITORIAL_CARD_TEST_ID)).toHaveLength(2)
  })

  it('should render AuthAlert', () => {
    const props = {
      query: '',
      label: 'Label',
      loading: false,
      isOverviewPage: false,
      type: CmsType.Article,
      results: [],
      errors: [
        {
          message: 'Auth Error',
          path: ['articleSearch'],
          extensions: {
            label: 'No access',
            code: 'UNAUTHORIZED',
          },
        },
      ],
    }
    render(withAppContext(<EditorialResults {...props} />))

    expect(screen.getByTestId('auth-alert')).toBeInTheDocument()
  })
  it('should render ErrorMessage', () => {
    const props = {
      query: '',
      label: 'Label',
      loading: false,
      isOverviewPage: false,
      type: CmsType.Article,
      results: [],
      errors: [
        {
          message: 'Just an error',
          path: ['articleSearch'],
        },
      ],
    }
    render(withAppContext(<EditorialResults {...props} />))

    expect(screen.getByTestId('errorMessage')).toBeInTheDocument()
    expect(window.location.reload).not.toHaveBeenCalled()
    fireEvent.click(screen.getByTestId('buttonReload'))
    expect(window.location.reload).toHaveBeenCalled()
  })
})
