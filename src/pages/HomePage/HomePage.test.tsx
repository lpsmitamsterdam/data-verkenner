import { render } from '@testing-library/react'
import { createClient, Provider as GraphQLProvider } from 'urql'
import HomePage from './HomePage'
import environment from '../../environment'
import withAppContext from '../../shared/utils/withAppContext'

describe('HomePage', () => {
  it('renders the home page', () => {
    const graphQLClient = createClient({ url: `${environment.GRAPHQL_ENDPOINT}` })
    const { container } = render(
      withAppContext(
        <GraphQLProvider value={graphQLClient}>
          <HomePage />
        </GraphQLProvider>,
      ),
    )

    expect(container.firstChild).toBeDefined()
  })
})
