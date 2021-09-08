import AuthScope from '../../../../../../shared/utils/api/authScope'
import { DEFAULT_LOCALE } from '../../../../../../shared/config/locale.config'
import GLOSSARY from '../../../glossary.constant'
import type { PotentialApiResult } from '../../../types/details'
import categoryLabels from '../../map-search/category-labels'
import { DetailResultItemType } from '../../../types/details'
import type { ServiceDefinition } from '../../map-services.config'
import { getMainMetaBlock } from '../../map-services.config'
import getPaginatedListBlock from '../../../utils/getPaginatedListBlock'

const kadastraalSubject: ServiceDefinition = {
  type: 'brk/subject',
  endpoint: 'brk/subject',
  definition: GLOSSARY.DEFINITIONS.SUBJECT,
  authScopes: [AuthScope.BrkRs],
  authScopeRequired: true,
  authExcludedInfo: `kadastrale subjecten. Om ook zakelijke rechten van natuurlijke personen te bekijken, moet je als medewerker bovendien speciale bevoegdheden hebben`,
  mapDetail: (result: any) => {
    const zakelijkRechtNormalizer = (res: PotentialApiResult[]) =>
      res?.map((obj) => ({
        ...obj,
        _links: {
          self: {
            href: obj.object_href,
          },
        },
      }))
    return {
      title: categoryLabels.kadastraalSubject.singular,
      // eslint-disable-next-line no-underscore-dangle
      subTitle: result._display,
      infoBox: getMainMetaBlock(result, GLOSSARY.DEFINITIONS.SUBJECT),
      items: [
        !result?.is_natuurlijk_persoon
          ? {
              type: DetailResultItemType.DefinitionList,
              entries: [
                {
                  term: 'Statutaire zetel',
                  description: result.statutaire_zetel,
                },
                {
                  term: 'Rechtsvorm',
                  description: result.rechtsvorm?.omschrijving,
                },
                {
                  term: 'RSIN',
                  description: result.rsin,
                },
                {
                  term: 'KvK nummer',
                  description: result.kvknummer,
                },
                {
                  term: 'Woonadres',
                  description:
                    result.woonadres?.openbareruimte_naam &&
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `${result.woonadres?.openbareruimte_naam} ${result.woonadres?.huisnummer} ${result.woonadres?.huisletter} ${result.woonadres?.toevoeging} ${result.woonadres?.postcode} ${result.woonadres?.woonplaats}`,
                },
                {
                  term: 'Woonadres buitenland',
                  description:
                    result.woonadres?.buitenland_adres &&
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `${result.woonadres?.buitenland_adres} ${result.woonadres?.buitenland_woonplaats} ${result.woonadres?.buitenland_naam} ${result.woonadres?.buitenland_land?.omschrijving}`,
                },
                {
                  term: 'Postadres',
                  description:
                    result.postadres?.openbareruimte_naam &&
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `${result.postadres?.openbareruimte_naam} ${result.postadres?.huisnummer} ${result.postadres?.huisletter} ${result.postadres?.toevoeging} ${result.postadres?.woonplaats}`,
                },
                {
                  term: 'Postadres buitenland',
                  description:
                    result.postadres?.buitenland_adres &&
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `${result.postadres?.buitenland_adres} ${result.postadres?.buitenland_woonplaats} ${result.postadres?.buitenland_naam} ${result.postadres?.buitenland_land?.omschrijving}`,
                },
                {
                  term: 'Postadres postbus',
                  description:
                    result.postadres?.postbus_nummer &&
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `Postbus ${result.postadres?.postbus_nummer} ${result.postadres?.postbus_postcode} ${result.postadres?.postbus_woonplaats}`,
                },
              ],
            }
          : undefined,
        result.is_natuurlijk_persoon
          ? {
              type: DetailResultItemType.DefinitionList,
              entries: [
                {
                  term: 'Voornamen',
                  description: result.voornamen,
                },
                {
                  term: 'Voorvoegsels',
                  description: result.voorvoegsels,
                },
                {
                  term: 'Geslachtsnaam',
                  description: result.naam,
                },
                {
                  term: 'Geslacht',
                  description: result.geslacht?.omschrijving,
                },
                {
                  term: 'Geboortedatum',
                  description:
                    result.geboortedatum &&
                    new Date(result.geboortedatum).toLocaleDateString(DEFAULT_LOCALE, {
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric',
                    }),
                },
                {
                  term: 'Geboorteplaats',
                  description: result.geboorteplaats,
                },
                {
                  term: 'Geboorteland',
                  description: result.geboorteland?.omschrijving,
                },
                {
                  term: 'Datum van overlijden',
                  description:
                    result.overlijdensdatum &&
                    new Date(result.overlijdensdatum).toLocaleDateString(DEFAULT_LOCALE, {
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric',
                    }),
                },
                {
                  term: 'Woonadres',
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  description: `${result.woonadres?.openbareruimte_naam} ${result.woonadres?.huisnummer} ${result.woonadres?.huisletter} ${result.woonadres?.toevoeging} ${result.woonadres?.postcode} ${result.woonadres?.woonplaats}`,
                },
                {
                  term: 'Woonadres buitenland',
                  description:
                    result.woonadres?.buitenland_adres &&
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `${result.woonadres?.buitenland_adres} ${result.woonadres?.buitenland_woonplaats} ${result.woonadres?.buitenland_naam} ${result.woonadres?.buitenland_land?.omschrijving}`,
                },
                {
                  term: 'Postadres',
                  description:
                    result.postadres?.openbareruimte_naam &&
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `${result.postadres?.openbareruimte_naam} ${result.postadres?.huisnummer} ${result.postadres?.huisletter} ${result.postadres?.toevoeging} ${result.postadres?.postcode} ${result.postadres?.woonplaats}`,
                },
                {
                  term: 'Postadres buitenland',
                  description:
                    result.postadres?.buitenland_adres &&
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `${result.postadres?.buitenland_adres} ${result.postadres?.buitenland_woonplaats} ${result.postadres?.buitenland_naam} ${result.postadres?.buitenland_land?.omschrijving}`,
                },
                {
                  term: 'Postadres postbus',
                  description:
                    result.postadres?.postbus_nummer &&
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `Postbus ${result.postadres?.postbus_nummer} ${result.postadres?.postbus_postcode} ${result.postadres?.postbus_woonplaats}`,
                },
              ],
            }
          : undefined,
        getPaginatedListBlock(
          GLOSSARY.DEFINITIONS.ZAKELIJK_RECHT,
          result.rechten?.href,
          result?.is_natuurlijk_persoon
            ? {
                authScopes: [AuthScope.BrkRsn],
                authScopeRequired: true,
                specialAuthLevel: true,
                normalize: zakelijkRechtNormalizer,
              }
            : {
                normalize: zakelijkRechtNormalizer,
              },
        ),
      ],
    }
  },
}

export default kadastraalSubject
