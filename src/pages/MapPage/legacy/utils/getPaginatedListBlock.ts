import type { Definition } from '../glossary.constant'
import type {
  DetailAuthentication,
  DetailResultItemPaginatedData,
  PotentialApiResult,
} from '../types/details'
import { DetailResultItemType } from '../types/details'
import getPaginatedDataFromApi from '../../utils/getPaginatedDataFromApi'
import getInfoBox from './getInfoBox'
import buildDetailUrl from '../../components/DetailPanel/buildDetailUrl'
import getDetailPageData from '../../../../shared/utils/getDetailPageData'

const getPaginatedListBlock = (
  definition: Definition,
  apiUrl?: string | null,
  settings?: {
    pageSize?: number
    page?: number
    displayFormatter?: (data: PotentialApiResult) => string | undefined
    normalize?: (data: PotentialApiResult[]) => any[] | Promise<any>
  } & DetailAuthentication,
): DetailResultItemPaginatedData => ({
  type: DetailResultItemType.PaginatedData,
  getData: getPaginatedDataFromApi(apiUrl, settings?.normalize),
  pageSize: settings?.pageSize || 20,
  page: settings?.page || 1,
  infoBox: getInfoBox({
    description: definition.description,
    url: definition.url,
    plural: definition.plural,
  }),
  title: definition.plural,
  ...settings,
  toView: (data) => {
    const results = data?.map((result: any) => ({
      // eslint-disable-next-line no-underscore-dangle
      to: buildDetailUrl(getDetailPageData(result._links.self.href)),
      id: result.id || null,
      // eslint-disable-next-line no-underscore-dangle
      title: settings?.displayFormatter ? settings.displayFormatter(result) : result._display,
    }))

    return {
      type: DetailResultItemType.LinkList,
      links: results,
    }
  },
})

export default getPaginatedListBlock
