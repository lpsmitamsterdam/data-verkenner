import type { FunctionComponent } from 'react'
import { isEmbeddedParam } from '../../pages/MapPage/query-params'
import createNamedContext from '../createNamedContext'
import useParam from '../../hooks/useParam'
import useRequiredContext from '../../hooks/useRequiredContext'

export interface UiContextProps {
  /**
   * Indicates whether the application is being embedded through an iframe.
   */
  isEmbedded: boolean
}

const UiContext = createNamedContext<UiContextProps | null>('Ui', null)

export const UiProvider: FunctionComponent = ({ children }) => {
  const [isEmbedded] = useParam(isEmbeddedParam)

  return <UiContext.Provider value={{ isEmbedded }}>{children}</UiContext.Provider>
}

export const useIsEmbedded = () => useRequiredContext(UiContext).isEmbedded
