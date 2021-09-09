import type { Link, PaginatedData } from '../legacy/types/details'
import getDataFromApi, { emptyResult } from './getDataFromApi'

const getPaginatedDataFromApi =
  (defaultUrl?: string | null, normalize?: (data: any[]) => any[] | Promise<any>) =>
  async (url?: string, pageSize = 20, page = 0): Promise<PaginatedData<Link[]>> => {
    const fetchUrl = url ?? defaultUrl
    if (!fetchUrl) {
      return emptyResult
    }
    const response = await getDataFromApi(fetchUrl, [
      { type: 'page_size', value: pageSize.toString() },
      { type: 'page', value: page.toString() },
    ])

    if (!response) {
      return emptyResult
    }

    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    const apiResponse = response._embedded ? response : response.results ?? [response]

    // @ts-ignore
    const results = normalize ? await normalize(apiResponse) : apiResponse

    return {
      data: results,
      // @ts-ignore
      count: response?.page?.totalElements ?? response.count,
      // eslint-disable-next-line no-underscore-dangle
      previous: response._links?.previous?.href || null,
      // eslint-disable-next-line no-underscore-dangle
      next: response._links?.next?.href || null,
    }
  }

export default getPaginatedDataFromApi
