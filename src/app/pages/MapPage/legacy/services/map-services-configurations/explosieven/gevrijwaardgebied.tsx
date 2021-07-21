import type { ServiceDefinition } from '../../map-services.config'
import { DetailResultItemType } from '../../../types/details'
import { path } from '../../../../../../../api/explosieven/gevrijwaardgebied'
import normalizeExplosieven, { NormalizedGevrijwaardGebied } from './normalize-explosieven'
import type { Explosievengevrijwaardgebied } from '../../../../../../../api/explosieven/generated'

const gevrijwaardGebied: ServiceDefinition<
  Explosievengevrijwaardgebied,
  NormalizedGevrijwaardGebied
> = {
  type: 'explosieven/gevrijwaardgebied',
  endpoint: path,
  normalization: normalizeExplosieven,
  mapDetail: (result) => ({
    title: 'Gevrijwaard gebied',
    subTitle: `${result.id ?? ''}`,
    items: [
      {
        type: DetailResultItemType.DefinitionList,
        entries: [
          { term: 'Soort handeling', description: result.detailType },
          { term: 'Bron', description: result.bron },
          {
            term: 'Datum rapport',
            description: result.datum,
          },
          { term: 'Intekening', description: result.intekening },
          { term: 'Kenmerk', description: result.kenmerk },
          {
            term: 'Opmerkingen',
            description: result.opmerkingen,
          },
        ],
      },
    ],
  }),
}

export default gevrijwaardGebied
