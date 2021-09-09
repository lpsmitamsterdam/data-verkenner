import type { ServiceDefinition } from '../../map-services.config'
import { varenOpafstapplaatsPath } from '../../../../../../api/varen'
import categoryLabels from '../../map-search/category-labels'
import { DetailResultItemType } from '../../../types/details'
import type { Varenopafstapplaats } from '../../../../../../api/varen/generated'

const varenOpAfstapplaats: ServiceDefinition<Varenopafstapplaats> = {
  type: 'varen/opafstapplaats',
  endpoint: varenOpafstapplaatsPath,
  mapDetail: (result) => ({
    title: categoryLabels.varenOpafstapplaats.singular,
    subTitle: result.id,
    noPanorama: true,
    items: [
      {
        type: DetailResultItemType.DefinitionList,
        entries: [
          { term: 'ID', description: result.id },
          { term: 'Volgnummer', description: result.volgnr },
          { term: 'Indicatie over opstap of afstaplocatie', description: result.opEnAfstap },
          { term: 'Indicatie voor laden en lossen', description: result.laadLos },
          { term: 'Indicatie elektrische laadpunt', description: result.eLaadpunt },
          { term: 'Volgnummer + locatiebeschrijving', description: result.tekstOnMouseover },
          { term: 'Soort op- en afstaplocatie', description: result.kleurOpKaart },
        ],
      },
    ],
  }),
}

export default varenOpAfstapplaats
