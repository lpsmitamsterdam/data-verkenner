import { useLocation } from 'react-router-dom'
import { useCallback } from 'react'
import buildQueryString from './buildQueryString'
import { UrlParam } from './useParam'

const useGetUrl = () => {
  const location = useLocation()
  const getFromParams = useCallback(
    (params: [UrlParam<any>, any][]) => `${location.pathname}?${buildQueryString(params)}`,
    [location],
  )

  const getFromPath = useCallback((path: string) => `${path}?${location.search}`, [location])
  return {
    getFromParams,
    getFromPath,
  }
}

export default useGetUrl
