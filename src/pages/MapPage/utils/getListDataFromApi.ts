import type { Link, SplitListData } from '../legacy/types/details'
import getDataFromApi, { emptyResult } from './getDataFromApi'

const getListDataFromApi =
  (defaultUrl?: string | null, normalize?: (data: any[]) => any[] | Promise<any>) =>
  async (url?: string, pageSize = 10): Promise<SplitListData<Link[]>> => {
    const fetchUrl = url ?? defaultUrl
    if (!fetchUrl) {
      return emptyResult
    }
    const response = await getDataFromApi(fetchUrl, [
      { type: 'page_size', value: pageSize.toString() },
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

export default getListDataFromApi
