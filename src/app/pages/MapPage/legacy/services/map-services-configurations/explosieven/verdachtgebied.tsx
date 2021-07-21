import type { ServiceDefinition } from '../../map-services.config'
import { DetailResultItemType } from '../../../types/details'
import getFileName from '../../../../../../utils/getFileName'
import { path } from '../../../../../../../api/explosieven/verdachtgebied'
import type { Explosievenverdachtgebied } from '../../../../../../../api/explosieven/generated'

const verdachtgebied: ServiceDefinition<Explosievenverdachtgebied> = {
  type: 'explosieven/verdachtgebied',
  endpoint: path,
  mapDetail: (result) => ({
    title: 'Verdacht gebied',
    subTitle: `${result.id ?? ''}`,
    items: [
      {
        type: DetailResultItemType.DefinitionList,
        entries: [
          { term: 'Hoofdgroep', description: result.detailType },
          { term: 'Subsoort', description: result.subtype },
          { term: 'Kaliber', description: result.kaliber },
          { term: 'Aantallen', description: result.aantal },
          { term: 'Verschijning', description: result.verschijning },
          { term: 'Afbakening', description: result.afbakening },
          { term: 'Horizontaal', description: result.horizontaal },
          { term: 'Cartografie', description: result.cartografie },
          { term: 'Opmerkingen', description: result.opmerkingen },
          {
            term: 'Oorlogshandelingsrapport',
            description: result.pdf && getFileName(result.pdf),
            href: result.pdf && result.pdf,
          },
        ],
      },
    ],
  }),
}

export default verdachtgebied
