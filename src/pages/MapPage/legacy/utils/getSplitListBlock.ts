import type { Definition } from '../glossary.constant'
import type {
  DetailAuthentication,
  DetailResultItemSplitListData,
  PotentialApiResult,
} from '../types/details'
import { DetailResultItemType } from '../types/details'
import buildDetailUrl from '../../components/DetailPanel/buildDetailUrl'
import getListDataFromApi from '../../utils/getListDataFromApi'
import getDetailPageData from '../../../../shared/utils/getDetailPageData'
import getInfoBox from './getInfoBox'

const getSplitListBlock = (
  definition: Definition,
  apiUrl?: string | null,
  settings?: {
    pageSize?: number
    displayFormatter?: (data: PotentialApiResult) => string | undefined
    normalize?: (data: PotentialApiResult[]) => any[] | Promise<any>
  } & DetailAuthentication,
): DetailResultItemSplitListData => ({
  type: DetailResultItemType.SplitListData,
  getData: getListDataFromApi(apiUrl, settings?.normalize),
  pageSize: settings?.pageSize || 10,
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

export default getSplitListBlock
