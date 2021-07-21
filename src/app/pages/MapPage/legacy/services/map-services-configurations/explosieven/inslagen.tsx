import type { ServiceDefinition } from '../../map-services.config'
import { path } from '../../../../../../../api/explosieven/inslagen'
import { DetailResultItemType } from '../../../types/details'
import getFileName from '../../../../../../utils/getFileName'
import type { NormalizedInslagen } from './normalize-explosieven'
import normalizeExplosieven from './normalize-explosieven'
import type { Explosievenbominslag } from '../../../../../../../api/explosieven/generated'

const inslagen: ServiceDefinition<Explosievenbominslag, NormalizedInslagen> = {
  type: 'explosieven/bominslag',
  endpoint: path,
  normalization: normalizeExplosieven,
  mapDetail: (result) => ({
    title: 'Inslag',
    subTitle: `${result.id ?? ''}`,
    items: [
      {
        type: DetailResultItemType.DefinitionList,
        entries: [
          {
            term: 'Datum brondocument',
            description: result.datum,
          },
          {
            term: 'Datum van inslag',
            description: result.datumInslag,
          },
          { term: 'Soort handeling', description: result.detailType },
          { term: 'Bron', description: result.bron },
          { term: 'Intekening', description: result.intekening },
          { term: 'Nauwkeurigheid', description: result.nauwkeurig },
          { term: 'Opmerkingen', description: result.opmerkingen },
          {
            term: 'Oorlogsincidentrapport',
            description: result.pdf && getFileName(result.pdf),
            href: result.pdf && result.pdf,
          },
        ],
      },
    ],
  }),
}

export default inslagen
