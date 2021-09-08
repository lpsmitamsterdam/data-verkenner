import { fetchWithToken } from '../../../shared/utils/api/api'

export interface ApiLinkObject {
  self: {
    href: string
  }
}

export interface ApiPaginateLinkObject extends ApiLinkObject {
  next?: {
    href?: string
  }
  previous?: {
    href?: string
  }
}

export interface ResolvedResult {
  count: number
  results: Array<{ dataset: string; id: string; _display: string; _links: ApiLinkObject }>
  _links: ApiPaginateLinkObject
}

interface EndpointOption {
  type: string
  value: string
}

const buildEndpointUrl = (fetchUrl: string, options: any[]): URL => {
  const endpoint = new URL(fetchUrl)
  options.forEach(({ type, value }) => endpoint.searchParams.set(type, value.toString()))
  return endpoint
}

export const emptyResult = {
  data: [],
  count: 0,
  previous: null,
  next: null,
}

const getDataFromApi = async (fetchUrl: string, endpointOptions: EndpointOption[]) => {
  const endpoint = buildEndpointUrl(fetchUrl, endpointOptions)
  const response = await fetchWithToken<ResolvedResult>(endpoint.toString())
  return response
}

export default getDataFromApi
