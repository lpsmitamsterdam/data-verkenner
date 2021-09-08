import categoryLabels from '../../map-search/category-labels'
import { DetailResultItemType } from '../../../types/details'
import type { ServiceDefinition } from '../../map-services.config'
import { bouwstroompuntenPath } from '../../../../../../api/bouwstroompunten'
import type { Bouwstroompuntenbouwstroompunten } from '../../../../../../api/bouwstroompunten/generated'

const bouwstroompunten: ServiceDefinition<Bouwstroompuntenbouwstroompunten> = {
  type: 'bouwstroompunten/bouwstroompunten',
  endpoint: bouwstroompuntenPath,
  mapDetail: (result) => ({
    title: categoryLabels.bouwstroompunten.singular,
    subTitle: result.bouwstroompuntId,
    items: [
      {
        type: DetailResultItemType.DefinitionList,
        entries: [
          {
            term: 'Primaire Functie',
            description: result.primaireFunctie,
          },
          {
            term: 'Contactnummer bij melden storing',
            description: result.contactnummerBijMeldenStoring,
          },
          {
            term: 'Capaciteit',
            description: result.capaciteit || 'onbekend',
          },
          {
            term: 'Minimale gebruikscapaciteit',
            description: result.minimaleGebruikscapaciteit,
          },
          {
            term: 'Beschikbare aansluiting(en)',
            description: result.beschikbareAansluitingen?.map((item: string) => item).join(', '),
          },
          {
            term: 'Beheerorganisatie',
            description: result.organisatie || 'onbekend',
          },
          {
            term: 'Contactgegevens',
            description: result.email || 'onbekend',
          },
          {
            term: 'Licentie benodigd',
            description: result.vergunningsplichtig ? 'Ja' : 'Nee',
          },
          {
            term: 'Adresgegevens',
            description: `${result.straat ?? ''} ${result.huisnummer ?? ''}, ${
              result.plaats ?? ''
            }`,
          },
        ],
      },
    ],
  }),
}

export default bouwstroompunten
