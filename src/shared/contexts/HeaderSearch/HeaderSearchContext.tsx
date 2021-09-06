import { useState } from 'react'
import type { FunctionComponent } from 'react'
import createNamedContext from '../createNamedContext'
import useRequiredContext from '../../hooks/useRequiredContext'
import { queryParam } from '../../../pages/SearchPage/query-params'
import useParam from '../../hooks/useParam'

export interface HeaderSearchContextProps {
  searchInputValue: string
  setSearchInputValue: (input: string) => void
}

const HeaderSearchContext = createNamedContext<HeaderSearchContextProps | null>(
  'SearchInputValue',
  null,
)

export default HeaderSearchContext

const HeaderSearchProvider: FunctionComponent = ({ children }) => {
  const [searchQuery] = useParam(queryParam)
  const [searchInputValue, setSearchInputValue] = useState<string>(searchQuery)

  return (
    <HeaderSearchContext.Provider value={{ searchInputValue, setSearchInputValue }}>
      {children}
    </HeaderSearchContext.Provider>
  )
}

export { HeaderSearchProvider }

export function useHeaderSearch() {
  return useRequiredContext(HeaderSearchContext)
}
