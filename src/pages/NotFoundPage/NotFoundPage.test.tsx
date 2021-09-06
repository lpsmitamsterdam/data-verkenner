import { screen, render } from '@testing-library/react'
import withAppContext from '../../shared/utils/withAppContext'
import NotFoundPage from './NotFoundPage'

describe('NotFoundPage', () => {
  it('renders the page', () => {
    render(withAppContext(<NotFoundPage />))

    expect(screen.getByText('Pagina niet gevonden')).toBeInTheDocument()
  })
})
