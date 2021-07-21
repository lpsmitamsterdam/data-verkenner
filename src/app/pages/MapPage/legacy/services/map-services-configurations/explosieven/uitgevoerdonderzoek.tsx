import type { ServiceDefinition } from '../../map-services.config'
import { DetailResultItemType } from '../../../types/details'
import normalizeExplosieven, { NormalizedUitgevoerdOnderzoek } from './normalize-explosieven'
import { path } from '../../../../../../../api/explosieven/uitgevoerdonderzoek'
import type { Explosievenuitgevoerdonderzoek } from '../../../../../../../api/explosieven/generated'

const uitgevoerdonderzoek: ServiceDefinition<
  Explosievenuitgevoerdonderzoek,
  NormalizedUitgevoerdOnderzoek
> = {
  type: 'explosieven/uitgevoerdonderzoek',
  endpoint: path,
  normalization: normalizeExplosieven,
  mapDetail: (result) => ({
    title: 'Reeds uitgevoerd CE onderzoek',
    subTitle: `${result.id ?? ''}`,
    items: [
      {
        type: DetailResultItemType.DefinitionList,
        entries: [
          { term: 'Soort rapportage', description: result.detailType },
          { term: 'Onderzoeksgebied', description: result.onderzoeksgebied },
          { term: 'Opdrachtnemer', description: result.opdrachtnemer },
          { term: 'Opdrachtgever', description: result.opdrachtgever },
          { term: 'Verdacht gebied', description: result.verdachtgebied },
          {
            term: 'Datum rapport',
            description: result.datum,
          },
        ],
      },
    ],
  }),
}

export default uitgevoerdonderzoek
