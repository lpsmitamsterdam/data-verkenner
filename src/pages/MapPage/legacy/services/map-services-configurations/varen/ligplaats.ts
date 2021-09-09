import type { Varenligplaats } from '../../../../../../api/varen/generated'
import { varenLigplaatsPath } from '../../../../../../api/varen'
import categoryLabels from '../../map-search/category-labels'
import { DetailResultItemType } from '../../../types/details'
import type { ServiceDefinition } from '../../map-services.config'

const ligplaats: ServiceDefinition<Varenligplaats> = {
  type: 'varen/ligplaats',
  endpoint: varenLigplaatsPath,
  mapDetail: (result) => ({
    title: categoryLabels.varenLigplaats.singular,
    subTitle: result.id,
    noPanorama: true,
    items: [
      {
        type: DetailResultItemType.DefinitionList,
        entries: [
          { term: 'ID', description: result.id },
          { term: 'Naam vaartuig', description: result.naamVaartuig },
          { term: 'Rederij', description: result.naamKlantKvk },
          { term: 'Ligplaats segment', description: result.ligplaatsSegment },
          { term: 'Locatie ID', description: result.idLigplaats },
        ],
      },
    ],
  }),
}

export default ligplaats
