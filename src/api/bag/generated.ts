/**
 * bag
 * 0.0.1
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from 'oazapfts/lib/runtime'
import * as QS from 'oazapfts/lib/runtime/query'

export const defaults: Oazapfts.RequestOpts = {
  baseUrl: 'https://api.data.amsterdam.nl/',
}
const oazapfts = Oazapfts.runtime(defaults)
export const servers = {
  server1: 'https://api.data.amsterdam.nl/',
}
export interface SelfLink {
  self?: {
    href?: string
    title?: string
  }
}
export interface BagbrondocumentenLinks {
  schema: string
  self?: SelfLink
  heeftBrondocumentenDossiers: string[]
}
export interface Bagbrondocumenten {
  _links: BagbrondocumentenLinks
  documentnummer: string
  typeDossierCode?: string | null
  registratiedatum?: string | null
  bronleverancierCode?: string | null
  typeBrondocumentCode?: string | null
  typeDossierOmschrijving?: string | null
  bronleverancierOmschrijving?: string | null
  typeBrondocumentOmschrijving?: string | null
}
export interface PaginatedBagbrondocumentenList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Bagbrondocumenten[]
}
export interface BagdossiersLinks {
  schema: string
  self?: SelfLink
  heeftBrondocumenten: string[]
}
export interface Bagdossiers {
  _links: BagdossiersLinks
  dossier: string
}
export interface PaginatedBagdossiersList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Bagdossiers[]
}
export interface BagligplaatsenLinks {
  schema: string
  self?: SelfLink
  ligtInBuurt?: string | null
  heeftDossier?: string | null
  heeftHoofdadres?: string | null
  heeftNevenadres: string[]
  heeftOnderzoeken: string[]
}
export interface Geometry {
  type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'
}
export interface BagligplaatsenGebruiksdoel {
  omschrijving?: string | null
}
export interface Bagligplaatsen {
  _links: BagligplaatsenLinks
  geometrie?: Geometry
  statusCode?: number | null
  ligtInBuurtId: string | null
  heeftDossierId: string | null
  bagprocesCode?: number | null
  documentdatum?: string | null
  geconstateerd?: boolean | null
  documentnummer?: string | null
  eindGeldigheid?: string | null
  beginGeldigheid?: string | null
  heeftHoofdadresId: string | null
  registratiedatum?: string | null
  statusOmschrijving?: string | null
  bagprocesOmschrijving?: string | null
  id: string
  gebruiksdoel: BagligplaatsenGebruiksdoel[]
}
export interface PaginatedBagligplaatsenList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Bagligplaatsen[]
}
export interface BagnummeraanduidingenLinks {
  schema: string
  self?: SelfLink
  heeftNevenadresStandplaatsen: string[]
  heeftNevenadresLigplaatsen: string[]
  heeftNevenadresVerblijfsobjecten: string[]
  heeftDossier?: string | null
  ligtInWoonplaats?: string | null
  adresseertLigplaats?: string | null
  adresseertStandplaats?: string | null
  ligtAanOpenbareruimte?: string | null
  adresseertVerblijfsobject?: string | null
  heeftOnderzoeken: string[]
}
export interface Bagnummeraanduidingen {
  _links: BagnummeraanduidingenLinks
  postcode?: string | null
  typeAdres?: string | null
  huisletter?: string | null
  huisnummer?: number | null
  statusCode?: number | null
  heeftDossierId: string | null
  bagprocesCode?: number | null
  documentdatum?: string | null
  geconstateerd?: boolean | null
  documentnummer?: string | null
  eindGeldigheid?: string | null
  beginGeldigheid?: string | null
  ligtInWoonplaatsId: string | null
  registratiedatum?: string | null
  statusOmschrijving?: string | null
  adresseertLigplaatsId: string | null
  huisnummertoevoeging?: string | null
  adresseertStandplaatsId: string | null
  bagprocesOmschrijving?: string | null
  ligtAanOpenbareruimteId: string | null
  adresseertVerblijfsobjectId: string | null
  typeAdresseerbaarObjectCode?: number | null
  typeAdresseerbaarObjectOmschrijving?: string | null
  id: string
}
export interface PaginatedBagnummeraanduidingenList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Bagnummeraanduidingen[]
}
export interface BagonderzoekenLinks {
  schema: string
  self?: SelfLink
  heeftOnderzoekenWoonplaatsen: string[]
  heeftOnderzoekenStandplaatsen: string[]
  heeftOnderzoekenLigplaatsen: string[]
  heeftOnderzoekenOpenbareruimtes: string[]
  heeftOnderzoekenNummeraanduidingen: string[]
  heeftOnderzoekenVerblijfsobjecten: string[]
  heeftOnderzoekenPanden: string[]
}
export interface Bagonderzoeken {
  _links: BagonderzoekenLinks
  kenmerk?: string | null
  objecttype?: string | null
  inOnderzoek?: string | null
  documentdatum?: string | null
  documentnummer?: string | null
  eindGeldigheid?: string | null
  beginGeldigheid?: string | null
  eindRegistratie?: string | null
  registratiedatum?: string | null
  objectIdentificatie?: string | null
  tijdstipRegistratie?: string | null
  id: string
}
export interface PaginatedBagonderzoekenList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Bagonderzoeken[]
}
export interface BagopenbareruimtesLinks {
  schema: string
  self?: SelfLink
  heeftDossier?: string | null
  ligtInWoonplaats?: string | null
  heeftOnderzoeken: string[]
}
export interface Bagopenbareruimtes {
  _links: BagopenbareruimtesLinks
  naam?: string | null
  naamNen?: string | null
  typeCode?: number | null
  geometrie?: Geometry
  statusCode?: number | null
  straatcode?: string | null
  heeftDossierId: string | null
  bagprocesCode?: number | null
  documentdatum?: string | null
  geconstateerd?: boolean | null
  straatnaamPtt?: string | null
  documentnummer?: string | null
  eindGeldigheid?: string | null
  beginGeldigheid?: string | null
  beschrijvingNaam?: string | null
  ligtInWoonplaatsId: string | null
  registratiedatum?: string | null
  typeOmschrijving?: string | null
  statusOmschrijving?: string | null
  bagprocesOmschrijving?: string | null
  id: string
}
export interface PaginatedBagopenbareruimtesList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Bagopenbareruimtes[]
}
export interface BagpandenLinks {
  schema: string
  self?: SelfLink
  ligtInPandenVerblijfsobjecten: string[]
  heeftDossier?: string | null
  ligtInBouwblok?: string | null
  heeftOnderzoeken: string[]
}
export interface Bagpanden {
  _links: BagpandenLinks
  naam?: string | null
  geometrie?: Geometry
  statusCode?: number | null
  liggingCode?: number | null
  heeftDossierId: string | null
  bagprocesCode?: number | null
  documentdatum?: string | null
  geconstateerd?: boolean | null
  documentnummer?: string | null
  eindGeldigheid?: string | null
  ligtInBouwblokId: string | null
  typeWoonobject?: string | null
  aantalBouwlagen?: number | null
  beginGeldigheid?: string | null
  hoogsteBouwlaag?: number | null
  laagsteBouwlaag?: number | null
  registratiedatum?: string | null
  statusOmschrijving?: string | null
  liggingOmschrijving?: string | null
  bagprocesOmschrijving?: string | null
  oorspronkelijkBouwjaar?: number | null
  id: string
}
export interface PaginatedBagpandenList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Bagpanden[]
}
export interface BagstandplaatsenLinks {
  schema: string
  self?: SelfLink
  ligtInBuurt?: string | null
  heeftDossier?: string | null
  heeftHoofdadres?: string | null
  heeftNevenadres: string[]
  heeftOnderzoeken: string[]
}
export interface BagstandplaatsenGebruiksdoel {
  omschrijving?: string | null
}
export interface Bagstandplaatsen {
  _links: BagstandplaatsenLinks
  geometrie?: Geometry
  statusCode?: number | null
  ligtInBuurtId: string | null
  heeftDossierId: string | null
  bagprocesCode?: number | null
  documentdatum?: string | null
  geconstateerd?: boolean | null
  documentnummer?: string | null
  eindGeldigheid?: string | null
  beginGeldigheid?: string | null
  heeftHoofdadresId: string | null
  registratiedatum?: string | null
  statusOmschrijving?: string | null
  bagprocesOmschrijving?: string | null
  id: string
  gebruiksdoel: BagstandplaatsenGebruiksdoel[]
}
export interface PaginatedBagstandplaatsenList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Bagstandplaatsen[]
}
export interface BagverblijfsobjectenLinks {
  schema: string
  self?: SelfLink
  ligtInBuurt?: string | null
  heeftDossier?: string | null
  heeftHoofdadres?: string | null
  ligtInPanden: string[]
  heeftNevenadres: string[]
  heeftOnderzoeken: string[]
}
export interface BagverblijfsobjectenToegang {
  code?: string | null
  omschrijving?: string | null
}
export interface BagverblijfsobjectenGebruiksdoel {
  code?: string | null
  omschrijving?: string | null
}
export interface Bagverblijfsobjecten {
  _links: BagverblijfsobjectenLinks
  cbsNummer?: string | null
  geometrie?: Geometry
  statusCode?: number | null
  ligtInBuurtId: string | null
  oppervlakte?: number | null
  aantalKamers?: number | null
  heeftDossierId: string | null
  bagprocesCode?: number | null
  documentdatum?: string | null
  geconstateerd?: boolean | null
  documentnummer?: string | null
  eindGeldigheid?: string | null
  aantalBouwlagen?: number | null
  beginGeldigheid?: string | null
  heeftHoofdadresId: string | null
  hoogsteBouwlaag?: number | null
  laagsteBouwlaag?: number | null
  redenafvoerCode?: number | null
  redenopvoerCode?: number | null
  registratiedatum?: string | null
  verdiepingToegang?: number | null
  statusOmschrijving?: string | null
  feitelijkGebruikCode?: number | null
  aantalEenhedenComplex?: number | null
  bagprocesOmschrijving?: string | null
  financieringscodeCode?: number | null
  eigendomsverhoudingCode?: number | null
  indicatieWoningvoorraad?: string | null
  redenafvoerOmschrijving?: string | null
  redenopvoerOmschrijving?: string | null
  gebruiksdoelWoonfunctieCode?: number | null
  feitelijkGebruikOmschrijving?: string | null
  financieringscodeOmschrijving?: string | null
  eigendomsverhoudingOmschrijving?: string | null
  gebruiksdoelWoonfunctieOmschrijving?: string | null
  gebruiksdoelGezondheidszorgfunctieCode?: number | null
  gebruiksdoelGezondheidszorgfunctieOmschrijving?: string | null
  id: string
  toegang: BagverblijfsobjectenToegang[]
  gebruiksdoel: BagverblijfsobjectenGebruiksdoel[]
}
export interface PaginatedBagverblijfsobjectenList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Bagverblijfsobjecten[]
}
export interface BagwoonplaatsenLinks {
  schema: string
  self?: SelfLink
  openbareruimtes: string
  heeftDossier?: string | null
  ligtInGemeente?: string | null
  heeftOnderzoeken: string[]
}
export interface Bagwoonplaatsen {
  _links: BagwoonplaatsenLinks
  openbareruimtes: string
  naam?: string | null
  geometrie?: Geometry
  statusCode?: number | null
  heeftDossierId: string | null
  bagprocesCode?: number | null
  documentdatum?: string | null
  geconstateerd?: string | null
  woonplaatsPtt?: string | null
  documentnummer?: string | null
  eindGeldigheid?: string | null
  ligtInGemeenteId: string | null
  beginGeldigheid?: string | null
  registratiedatum?: string | null
  statusOmschrijving?: string | null
  bagprocesOmschrijving?: string | null
  id: string
}
export interface PaginatedBagwoonplaatsenList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Bagwoonplaatsen[]
}
export function bagBrondocumentenList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    bronleverancierCode,
    bronleverancierCodeIsempty,
    bronleverancierCodeIsnull,
    bronleverancierCodeLike,
    bronleverancierCodeNot,
    bronleverancierOmschrijving,
    bronleverancierOmschrijvingIsempty,
    bronleverancierOmschrijvingIsnull,
    bronleverancierOmschrijvingLike,
    bronleverancierOmschrijvingNot,
    documentnummer,
    documentnummerIsempty,
    documentnummerIsnull,
    documentnummerLike,
    documentnummerNot,
    page,
    registratiedatum,
    registratiedatumGt,
    registratiedatumGte,
    registratiedatumIsnull,
    registratiedatumLt,
    registratiedatumLte,
    registratiedatumNot,
    typeBrondocumentCode,
    typeBrondocumentCodeIsempty,
    typeBrondocumentCodeIsnull,
    typeBrondocumentCodeLike,
    typeBrondocumentCodeNot,
    typeBrondocumentOmschrijving,
    typeBrondocumentOmschrijvingIsempty,
    typeBrondocumentOmschrijvingIsnull,
    typeBrondocumentOmschrijvingLike,
    typeBrondocumentOmschrijvingNot,
    typeDossierCode,
    typeDossierCodeIsempty,
    typeDossierCodeIsnull,
    typeDossierCodeLike,
    typeDossierCodeNot,
    typeDossierOmschrijving,
    typeDossierOmschrijvingIsempty,
    typeDossierOmschrijvingIsnull,
    typeDossierOmschrijvingLike,
    typeDossierOmschrijvingNot,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    bronleverancierCode?: string
    bronleverancierCodeIsempty?: boolean
    bronleverancierCodeIsnull?: boolean
    bronleverancierCodeLike?: string
    bronleverancierCodeNot?: string | null
    bronleverancierOmschrijving?: string
    bronleverancierOmschrijvingIsempty?: boolean
    bronleverancierOmschrijvingIsnull?: boolean
    bronleverancierOmschrijvingLike?: string
    bronleverancierOmschrijvingNot?: string | null
    documentnummer?: string
    documentnummerIsempty?: boolean
    documentnummerIsnull?: boolean
    documentnummerLike?: string
    documentnummerNot?: string
    page?: number
    registratiedatum?: string
    registratiedatumGt?: string
    registratiedatumGte?: string
    registratiedatumIsnull?: boolean
    registratiedatumLt?: string
    registratiedatumLte?: string
    registratiedatumNot?: string | null
    typeBrondocumentCode?: string
    typeBrondocumentCodeIsempty?: boolean
    typeBrondocumentCodeIsnull?: boolean
    typeBrondocumentCodeLike?: string
    typeBrondocumentCodeNot?: string | null
    typeBrondocumentOmschrijving?: string
    typeBrondocumentOmschrijvingIsempty?: boolean
    typeBrondocumentOmschrijvingIsnull?: boolean
    typeBrondocumentOmschrijvingLike?: string
    typeBrondocumentOmschrijvingNot?: string | null
    typeDossierCode?: string
    typeDossierCodeIsempty?: boolean
    typeDossierCodeIsnull?: boolean
    typeDossierCodeLike?: string
    typeDossierCodeNot?: string | null
    typeDossierOmschrijving?: string
    typeDossierOmschrijvingIsempty?: boolean
    typeDossierOmschrijvingIsnull?: boolean
    typeDossierOmschrijvingLike?: string
    typeDossierOmschrijvingNot?: string | null
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedBagbrondocumentenList
  }>(
    `/v1/bag/brondocumenten/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        bronleverancierCode,
        'bronleverancierCode[isempty]': bronleverancierCodeIsempty,
        'bronleverancierCode[isnull]': bronleverancierCodeIsnull,
        'bronleverancierCode[like]': bronleverancierCodeLike,
        'bronleverancierCode[not]': bronleverancierCodeNot,
        bronleverancierOmschrijving,
        'bronleverancierOmschrijving[isempty]': bronleverancierOmschrijvingIsempty,
        'bronleverancierOmschrijving[isnull]': bronleverancierOmschrijvingIsnull,
        'bronleverancierOmschrijving[like]': bronleverancierOmschrijvingLike,
        'bronleverancierOmschrijving[not]': bronleverancierOmschrijvingNot,
        documentnummer,
        'documentnummer[isempty]': documentnummerIsempty,
        'documentnummer[isnull]': documentnummerIsnull,
        'documentnummer[like]': documentnummerLike,
        'documentnummer[not]': documentnummerNot,
        page,
        registratiedatum,
        'registratiedatum[gt]': registratiedatumGt,
        'registratiedatum[gte]': registratiedatumGte,
        'registratiedatum[isnull]': registratiedatumIsnull,
        'registratiedatum[lt]': registratiedatumLt,
        'registratiedatum[lte]': registratiedatumLte,
        'registratiedatum[not]': registratiedatumNot,
        typeBrondocumentCode,
        'typeBrondocumentCode[isempty]': typeBrondocumentCodeIsempty,
        'typeBrondocumentCode[isnull]': typeBrondocumentCodeIsnull,
        'typeBrondocumentCode[like]': typeBrondocumentCodeLike,
        'typeBrondocumentCode[not]': typeBrondocumentCodeNot,
        typeBrondocumentOmschrijving,
        'typeBrondocumentOmschrijving[isempty]': typeBrondocumentOmschrijvingIsempty,
        'typeBrondocumentOmschrijving[isnull]': typeBrondocumentOmschrijvingIsnull,
        'typeBrondocumentOmschrijving[like]': typeBrondocumentOmschrijvingLike,
        'typeBrondocumentOmschrijving[not]': typeBrondocumentOmschrijvingNot,
        typeDossierCode,
        'typeDossierCode[isempty]': typeDossierCodeIsempty,
        'typeDossierCode[isnull]': typeDossierCodeIsnull,
        'typeDossierCode[like]': typeDossierCodeLike,
        'typeDossierCode[not]': typeDossierCodeNot,
        typeDossierOmschrijving,
        'typeDossierOmschrijving[isempty]': typeDossierOmschrijvingIsempty,
        'typeDossierOmschrijving[isnull]': typeDossierOmschrijvingIsnull,
        'typeDossierOmschrijving[like]': typeDossierOmschrijvingLike,
        'typeDossierOmschrijving[not]': typeDossierOmschrijvingNot,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagBrondocumentenRetrieve(
  documentnummer: string,
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: Bagbrondocumenten
  }>(
    `/v1/bag/brondocumenten/${documentnummer}/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagDossiersList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    dossier,
    dossierIsempty,
    dossierIsnull,
    dossierLike,
    dossierNot,
    heeftBrondocumenten,
    page,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    dossier?: string
    dossierIsempty?: boolean
    dossierIsnull?: boolean
    dossierLike?: string
    dossierNot?: string
    heeftBrondocumenten?: string[]
    page?: number
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedBagdossiersList
  }>(
    `/v1/bag/dossiers/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        dossier,
        'dossier[isempty]': dossierIsempty,
        'dossier[isnull]': dossierIsnull,
        'dossier[like]': dossierLike,
        'dossier[not]': dossierNot,
        page,
      }),
      QS.explode({
        heeftBrondocumenten,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagDossiersRetrieve(
  dossier: string,
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: Bagdossiers
  }>(
    `/v1/bag/dossiers/${dossier}/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagLigplaatsenList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    bagprocesCode,
    bagprocesOmschrijving,
    bagprocesOmschrijvingIsempty,
    bagprocesOmschrijvingIsnull,
    bagprocesOmschrijvingLike,
    bagprocesOmschrijvingNot,
    beginGeldigheid,
    beginGeldigheidGt,
    beginGeldigheidGte,
    beginGeldigheidIsnull,
    beginGeldigheidLt,
    beginGeldigheidLte,
    beginGeldigheidNot,
    documentdatum,
    documentdatumGt,
    documentdatumGte,
    documentdatumIsnull,
    documentdatumLt,
    documentdatumLte,
    documentdatumNot,
    documentnummer,
    documentnummerIsempty,
    documentnummerIsnull,
    documentnummerLike,
    documentnummerNot,
    eindGeldigheid,
    eindGeldigheidGt,
    eindGeldigheidGte,
    eindGeldigheidIsnull,
    eindGeldigheidLt,
    eindGeldigheidLte,
    eindGeldigheidNot,
    gebruiksdoelOmschrijving,
    gebruiksdoelOmschrijvingIsempty,
    gebruiksdoelOmschrijvingIsnull,
    gebruiksdoelOmschrijvingLike,
    gebruiksdoelOmschrijvingNot,
    geconstateerd,
    geometrie,
    heeftDossierId,
    heeftDossierIdIn,
    heeftDossierIdIsnull,
    heeftDossierIdNot,
    heeftHoofdadresId,
    heeftHoofdadresIdIn,
    heeftHoofdadresIdIsnull,
    heeftHoofdadresIdNot,
    heeftHoofdadresIdentificatie,
    heeftHoofdadresIdentificatieIsempty,
    heeftHoofdadresIdentificatieIsnull,
    heeftHoofdadresIdentificatieLike,
    heeftHoofdadresIdentificatieNot,
    heeftHoofdadresVolgnummer,
    heeftNevenadres,
    heeftOnderzoeken,
    id,
    idIsempty,
    idIsnull,
    idLike,
    idNot,
    identificatie,
    identificatieIsempty,
    identificatieIsnull,
    identificatieLike,
    identificatieNot,
    ligtInBuurtId,
    ligtInBuurtIdIn,
    ligtInBuurtIdIsnull,
    ligtInBuurtIdNot,
    ligtInBuurtIdentificatie,
    ligtInBuurtIdentificatieIsempty,
    ligtInBuurtIdentificatieIsnull,
    ligtInBuurtIdentificatieLike,
    ligtInBuurtIdentificatieNot,
    ligtInBuurtVolgnummer,
    page,
    registratiedatum,
    registratiedatumGt,
    registratiedatumGte,
    registratiedatumIsnull,
    registratiedatumLt,
    registratiedatumLte,
    registratiedatumNot,
    statusCode,
    statusOmschrijving,
    statusOmschrijvingIsempty,
    statusOmschrijvingIsnull,
    statusOmschrijvingLike,
    statusOmschrijvingNot,
    volgnummer,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    bagprocesCode?: number
    bagprocesOmschrijving?: string
    bagprocesOmschrijvingIsempty?: boolean
    bagprocesOmschrijvingIsnull?: boolean
    bagprocesOmschrijvingLike?: string
    bagprocesOmschrijvingNot?: string | null
    beginGeldigheid?: string
    beginGeldigheidGt?: string
    beginGeldigheidGte?: string
    beginGeldigheidIsnull?: boolean
    beginGeldigheidLt?: string
    beginGeldigheidLte?: string
    beginGeldigheidNot?: string | null
    documentdatum?: string
    documentdatumGt?: string
    documentdatumGte?: string
    documentdatumIsnull?: boolean
    documentdatumLt?: string
    documentdatumLte?: string
    documentdatumNot?: string | null
    documentnummer?: string
    documentnummerIsempty?: boolean
    documentnummerIsnull?: boolean
    documentnummerLike?: string
    documentnummerNot?: string | null
    eindGeldigheid?: string
    eindGeldigheidGt?: string
    eindGeldigheidGte?: string
    eindGeldigheidIsnull?: boolean
    eindGeldigheidLt?: string
    eindGeldigheidLte?: string
    eindGeldigheidNot?: string | null
    gebruiksdoelOmschrijving?: string
    gebruiksdoelOmschrijvingIsempty?: string
    gebruiksdoelOmschrijvingIsnull?: string
    gebruiksdoelOmschrijvingLike?: string
    gebruiksdoelOmschrijvingNot?: string | null
    geconstateerd?: boolean
    geometrie?: string
    heeftDossierId?: string | null
    heeftDossierIdIn?: (string | null)[]
    heeftDossierIdIsnull?: boolean
    heeftDossierIdNot?: string | null
    heeftHoofdadresId?: string | null
    heeftHoofdadresIdIn?: (string | null)[]
    heeftHoofdadresIdIsnull?: boolean
    heeftHoofdadresIdNot?: string | null
    heeftHoofdadresIdentificatie?: string
    heeftHoofdadresIdentificatieIsempty?: boolean
    heeftHoofdadresIdentificatieIsnull?: boolean
    heeftHoofdadresIdentificatieLike?: string
    heeftHoofdadresIdentificatieNot?: string | null
    heeftHoofdadresVolgnummer?: number
    heeftNevenadres?: string[]
    heeftOnderzoeken?: string[]
    id?: string
    idIsempty?: boolean
    idIsnull?: boolean
    idLike?: string
    idNot?: string
    identificatie?: string
    identificatieIsempty?: boolean
    identificatieIsnull?: boolean
    identificatieLike?: string
    identificatieNot?: string
    ligtInBuurtId?: string | null
    ligtInBuurtIdIn?: (string | null)[]
    ligtInBuurtIdIsnull?: boolean
    ligtInBuurtIdNot?: string | null
    ligtInBuurtIdentificatie?: string
    ligtInBuurtIdentificatieIsempty?: boolean
    ligtInBuurtIdentificatieIsnull?: boolean
    ligtInBuurtIdentificatieLike?: string
    ligtInBuurtIdentificatieNot?: string | null
    ligtInBuurtVolgnummer?: number
    page?: number
    registratiedatum?: string
    registratiedatumGt?: string
    registratiedatumGte?: string
    registratiedatumIsnull?: boolean
    registratiedatumLt?: string
    registratiedatumLte?: string
    registratiedatumNot?: string | null
    statusCode?: number
    statusOmschrijving?: string
    statusOmschrijvingIsempty?: boolean
    statusOmschrijvingIsnull?: boolean
    statusOmschrijvingLike?: string
    statusOmschrijvingNot?: string | null
    volgnummer?: number
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedBagligplaatsenList
  }>(
    `/v1/bag/ligplaatsen/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        bagprocesCode,
        bagprocesOmschrijving,
        'bagprocesOmschrijving[isempty]': bagprocesOmschrijvingIsempty,
        'bagprocesOmschrijving[isnull]': bagprocesOmschrijvingIsnull,
        'bagprocesOmschrijving[like]': bagprocesOmschrijvingLike,
        'bagprocesOmschrijving[not]': bagprocesOmschrijvingNot,
        beginGeldigheid,
        'beginGeldigheid[gt]': beginGeldigheidGt,
        'beginGeldigheid[gte]': beginGeldigheidGte,
        'beginGeldigheid[isnull]': beginGeldigheidIsnull,
        'beginGeldigheid[lt]': beginGeldigheidLt,
        'beginGeldigheid[lte]': beginGeldigheidLte,
        'beginGeldigheid[not]': beginGeldigheidNot,
        documentdatum,
        'documentdatum[gt]': documentdatumGt,
        'documentdatum[gte]': documentdatumGte,
        'documentdatum[isnull]': documentdatumIsnull,
        'documentdatum[lt]': documentdatumLt,
        'documentdatum[lte]': documentdatumLte,
        'documentdatum[not]': documentdatumNot,
        documentnummer,
        'documentnummer[isempty]': documentnummerIsempty,
        'documentnummer[isnull]': documentnummerIsnull,
        'documentnummer[like]': documentnummerLike,
        'documentnummer[not]': documentnummerNot,
        eindGeldigheid,
        'eindGeldigheid[gt]': eindGeldigheidGt,
        'eindGeldigheid[gte]': eindGeldigheidGte,
        'eindGeldigheid[isnull]': eindGeldigheidIsnull,
        'eindGeldigheid[lt]': eindGeldigheidLt,
        'eindGeldigheid[lte]': eindGeldigheidLte,
        'eindGeldigheid[not]': eindGeldigheidNot,
        'gebruiksdoel.omschrijving': gebruiksdoelOmschrijving,
        'gebruiksdoel.omschrijving[isempty]': gebruiksdoelOmschrijvingIsempty,
        'gebruiksdoel.omschrijving[isnull]': gebruiksdoelOmschrijvingIsnull,
        'gebruiksdoel.omschrijving[like]': gebruiksdoelOmschrijvingLike,
        'gebruiksdoel.omschrijving[not]': gebruiksdoelOmschrijvingNot,
        geconstateerd,
        geometrie,
        heeftDossierId,
        'heeftDossierId[in]': heeftDossierIdIn,
        'heeftDossierId[isnull]': heeftDossierIdIsnull,
        'heeftDossierId[not]': heeftDossierIdNot,
        heeftHoofdadresId,
        'heeftHoofdadresId[in]': heeftHoofdadresIdIn,
        'heeftHoofdadresId[isnull]': heeftHoofdadresIdIsnull,
        'heeftHoofdadresId[not]': heeftHoofdadresIdNot,
        heeftHoofdadresIdentificatie,
        'heeftHoofdadresIdentificatie[isempty]': heeftHoofdadresIdentificatieIsempty,
        'heeftHoofdadresIdentificatie[isnull]': heeftHoofdadresIdentificatieIsnull,
        'heeftHoofdadresIdentificatie[like]': heeftHoofdadresIdentificatieLike,
        'heeftHoofdadresIdentificatie[not]': heeftHoofdadresIdentificatieNot,
        heeftHoofdadresVolgnummer,
        id,
        'id[isempty]': idIsempty,
        'id[isnull]': idIsnull,
        'id[like]': idLike,
        'id[not]': idNot,
        identificatie,
        'identificatie[isempty]': identificatieIsempty,
        'identificatie[isnull]': identificatieIsnull,
        'identificatie[like]': identificatieLike,
        'identificatie[not]': identificatieNot,
        ligtInBuurtId,
        'ligtInBuurtId[in]': ligtInBuurtIdIn,
        'ligtInBuurtId[isnull]': ligtInBuurtIdIsnull,
        'ligtInBuurtId[not]': ligtInBuurtIdNot,
        ligtInBuurtIdentificatie,
        'ligtInBuurtIdentificatie[isempty]': ligtInBuurtIdentificatieIsempty,
        'ligtInBuurtIdentificatie[isnull]': ligtInBuurtIdentificatieIsnull,
        'ligtInBuurtIdentificatie[like]': ligtInBuurtIdentificatieLike,
        'ligtInBuurtIdentificatie[not]': ligtInBuurtIdentificatieNot,
        ligtInBuurtVolgnummer,
        page,
        registratiedatum,
        'registratiedatum[gt]': registratiedatumGt,
        'registratiedatum[gte]': registratiedatumGte,
        'registratiedatum[isnull]': registratiedatumIsnull,
        'registratiedatum[lt]': registratiedatumLt,
        'registratiedatum[lte]': registratiedatumLte,
        'registratiedatum[not]': registratiedatumNot,
        statusCode,
        statusOmschrijving,
        'statusOmschrijving[isempty]': statusOmschrijvingIsempty,
        'statusOmschrijving[isnull]': statusOmschrijvingIsnull,
        'statusOmschrijving[like]': statusOmschrijvingLike,
        'statusOmschrijving[not]': statusOmschrijvingNot,
        volgnummer,
      }),
      QS.explode({
        heeftNevenadres,
        heeftOnderzoeken,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagLigplaatsenRetrieve(
  id: string,
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: Bagligplaatsen
  }>(
    `/v1/bag/ligplaatsen/${id}/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagNummeraanduidingenList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    adresseertLigplaatsId,
    adresseertLigplaatsIdIn,
    adresseertLigplaatsIdIsnull,
    adresseertLigplaatsIdNot,
    adresseertLigplaatsIdentificatie,
    adresseertLigplaatsIdentificatieIsempty,
    adresseertLigplaatsIdentificatieIsnull,
    adresseertLigplaatsIdentificatieLike,
    adresseertLigplaatsIdentificatieNot,
    adresseertLigplaatsVolgnummer,
    adresseertStandplaatsId,
    adresseertStandplaatsIdIn,
    adresseertStandplaatsIdIsnull,
    adresseertStandplaatsIdNot,
    adresseertStandplaatsIdentificatie,
    adresseertStandplaatsIdentificatieIsempty,
    adresseertStandplaatsIdentificatieIsnull,
    adresseertStandplaatsIdentificatieLike,
    adresseertStandplaatsIdentificatieNot,
    adresseertStandplaatsVolgnummer,
    adresseertVerblijfsobjectId,
    adresseertVerblijfsobjectIdIn,
    adresseertVerblijfsobjectIdIsnull,
    adresseertVerblijfsobjectIdNot,
    adresseertVerblijfsobjectIdentificatie,
    adresseertVerblijfsobjectIdentificatieIsempty,
    adresseertVerblijfsobjectIdentificatieIsnull,
    adresseertVerblijfsobjectIdentificatieLike,
    adresseertVerblijfsobjectIdentificatieNot,
    adresseertVerblijfsobjectVolgnummer,
    bagprocesCode,
    bagprocesOmschrijving,
    bagprocesOmschrijvingIsempty,
    bagprocesOmschrijvingIsnull,
    bagprocesOmschrijvingLike,
    bagprocesOmschrijvingNot,
    beginGeldigheid,
    beginGeldigheidGt,
    beginGeldigheidGte,
    beginGeldigheidIsnull,
    beginGeldigheidLt,
    beginGeldigheidLte,
    beginGeldigheidNot,
    documentdatum,
    documentdatumGt,
    documentdatumGte,
    documentdatumIsnull,
    documentdatumLt,
    documentdatumLte,
    documentdatumNot,
    documentnummer,
    documentnummerIsempty,
    documentnummerIsnull,
    documentnummerLike,
    documentnummerNot,
    eindGeldigheid,
    eindGeldigheidGt,
    eindGeldigheidGte,
    eindGeldigheidIsnull,
    eindGeldigheidLt,
    eindGeldigheidLte,
    eindGeldigheidNot,
    geconstateerd,
    heeftDossierId,
    heeftDossierIdIn,
    heeftDossierIdIsnull,
    heeftDossierIdNot,
    heeftOnderzoeken,
    huisletter,
    huisletterIsempty,
    huisletterIsnull,
    huisletterLike,
    huisletterNot,
    huisnummer,
    huisnummertoevoeging,
    huisnummertoevoegingIsempty,
    huisnummertoevoegingIsnull,
    huisnummertoevoegingLike,
    huisnummertoevoegingNot,
    id,
    idIsempty,
    idIsnull,
    idLike,
    idNot,
    identificatie,
    identificatieIsempty,
    identificatieIsnull,
    identificatieLike,
    identificatieNot,
    ligtAanOpenbareruimteId,
    ligtAanOpenbareruimteIdIn,
    ligtAanOpenbareruimteIdIsnull,
    ligtAanOpenbareruimteIdNot,
    ligtAanOpenbareruimteIdentificatie,
    ligtAanOpenbareruimteIdentificatieIsempty,
    ligtAanOpenbareruimteIdentificatieIsnull,
    ligtAanOpenbareruimteIdentificatieLike,
    ligtAanOpenbareruimteIdentificatieNot,
    ligtAanOpenbareruimteVolgnummer,
    ligtInWoonplaatsId,
    ligtInWoonplaatsIdIn,
    ligtInWoonplaatsIdIsnull,
    ligtInWoonplaatsIdNot,
    ligtInWoonplaatsIdentificatie,
    ligtInWoonplaatsIdentificatieIsempty,
    ligtInWoonplaatsIdentificatieIsnull,
    ligtInWoonplaatsIdentificatieLike,
    ligtInWoonplaatsIdentificatieNot,
    ligtInWoonplaatsVolgnummer,
    page,
    postcode,
    postcodeIsempty,
    postcodeIsnull,
    postcodeLike,
    postcodeNot,
    registratiedatum,
    registratiedatumGt,
    registratiedatumGte,
    registratiedatumIsnull,
    registratiedatumLt,
    registratiedatumLte,
    registratiedatumNot,
    statusCode,
    statusOmschrijving,
    statusOmschrijvingIsempty,
    statusOmschrijvingIsnull,
    statusOmschrijvingLike,
    statusOmschrijvingNot,
    typeAdres,
    typeAdresIsempty,
    typeAdresIsnull,
    typeAdresLike,
    typeAdresNot,
    typeAdresseerbaarObjectCode,
    typeAdresseerbaarObjectOmschrijving,
    typeAdresseerbaarObjectOmschrijvingIsempty,
    typeAdresseerbaarObjectOmschrijvingIsnull,
    typeAdresseerbaarObjectOmschrijvingLike,
    typeAdresseerbaarObjectOmschrijvingNot,
    volgnummer,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    adresseertLigplaatsId?: string | null
    adresseertLigplaatsIdIn?: (string | null)[]
    adresseertLigplaatsIdIsnull?: boolean
    adresseertLigplaatsIdNot?: string | null
    adresseertLigplaatsIdentificatie?: string
    adresseertLigplaatsIdentificatieIsempty?: boolean
    adresseertLigplaatsIdentificatieIsnull?: boolean
    adresseertLigplaatsIdentificatieLike?: string
    adresseertLigplaatsIdentificatieNot?: string | null
    adresseertLigplaatsVolgnummer?: number
    adresseertStandplaatsId?: string | null
    adresseertStandplaatsIdIn?: (string | null)[]
    adresseertStandplaatsIdIsnull?: boolean
    adresseertStandplaatsIdNot?: string | null
    adresseertStandplaatsIdentificatie?: string
    adresseertStandplaatsIdentificatieIsempty?: boolean
    adresseertStandplaatsIdentificatieIsnull?: boolean
    adresseertStandplaatsIdentificatieLike?: string
    adresseertStandplaatsIdentificatieNot?: string | null
    adresseertStandplaatsVolgnummer?: number
    adresseertVerblijfsobjectId?: string | null
    adresseertVerblijfsobjectIdIn?: (string | null)[]
    adresseertVerblijfsobjectIdIsnull?: boolean
    adresseertVerblijfsobjectIdNot?: string | null
    adresseertVerblijfsobjectIdentificatie?: string
    adresseertVerblijfsobjectIdentificatieIsempty?: boolean
    adresseertVerblijfsobjectIdentificatieIsnull?: boolean
    adresseertVerblijfsobjectIdentificatieLike?: string
    adresseertVerblijfsobjectIdentificatieNot?: string | null
    adresseertVerblijfsobjectVolgnummer?: number
    bagprocesCode?: number
    bagprocesOmschrijving?: string
    bagprocesOmschrijvingIsempty?: boolean
    bagprocesOmschrijvingIsnull?: boolean
    bagprocesOmschrijvingLike?: string
    bagprocesOmschrijvingNot?: string | null
    beginGeldigheid?: string
    beginGeldigheidGt?: string
    beginGeldigheidGte?: string
    beginGeldigheidIsnull?: boolean
    beginGeldigheidLt?: string
    beginGeldigheidLte?: string
    beginGeldigheidNot?: string | null
    documentdatum?: string
    documentdatumGt?: string
    documentdatumGte?: string
    documentdatumIsnull?: boolean
    documentdatumLt?: string
    documentdatumLte?: string
    documentdatumNot?: string | null
    documentnummer?: string
    documentnummerIsempty?: boolean
    documentnummerIsnull?: boolean
    documentnummerLike?: string
    documentnummerNot?: string | null
    eindGeldigheid?: string
    eindGeldigheidGt?: string
    eindGeldigheidGte?: string
    eindGeldigheidIsnull?: boolean
    eindGeldigheidLt?: string
    eindGeldigheidLte?: string
    eindGeldigheidNot?: string | null
    geconstateerd?: boolean
    heeftDossierId?: string | null
    heeftDossierIdIn?: (string | null)[]
    heeftDossierIdIsnull?: boolean
    heeftDossierIdNot?: string | null
    heeftOnderzoeken?: string[]
    huisletter?: string
    huisletterIsempty?: boolean
    huisletterIsnull?: boolean
    huisletterLike?: string
    huisletterNot?: string | null
    huisnummer?: number
    huisnummertoevoeging?: string
    huisnummertoevoegingIsempty?: boolean
    huisnummertoevoegingIsnull?: boolean
    huisnummertoevoegingLike?: string
    huisnummertoevoegingNot?: string | null
    id?: string
    idIsempty?: boolean
    idIsnull?: boolean
    idLike?: string
    idNot?: string
    identificatie?: string
    identificatieIsempty?: boolean
    identificatieIsnull?: boolean
    identificatieLike?: string
    identificatieNot?: string
    ligtAanOpenbareruimteId?: string | null
    ligtAanOpenbareruimteIdIn?: (string | null)[]
    ligtAanOpenbareruimteIdIsnull?: boolean
    ligtAanOpenbareruimteIdNot?: string | null
    ligtAanOpenbareruimteIdentificatie?: string
    ligtAanOpenbareruimteIdentificatieIsempty?: boolean
    ligtAanOpenbareruimteIdentificatieIsnull?: boolean
    ligtAanOpenbareruimteIdentificatieLike?: string
    ligtAanOpenbareruimteIdentificatieNot?: string | null
    ligtAanOpenbareruimteVolgnummer?: number
    ligtInWoonplaatsId?: string | null
    ligtInWoonplaatsIdIn?: (string | null)[]
    ligtInWoonplaatsIdIsnull?: boolean
    ligtInWoonplaatsIdNot?: string | null
    ligtInWoonplaatsIdentificatie?: string
    ligtInWoonplaatsIdentificatieIsempty?: boolean
    ligtInWoonplaatsIdentificatieIsnull?: boolean
    ligtInWoonplaatsIdentificatieLike?: string
    ligtInWoonplaatsIdentificatieNot?: string | null
    ligtInWoonplaatsVolgnummer?: number
    page?: number
    postcode?: string
    postcodeIsempty?: boolean
    postcodeIsnull?: boolean
    postcodeLike?: string
    postcodeNot?: string | null
    registratiedatum?: string
    registratiedatumGt?: string
    registratiedatumGte?: string
    registratiedatumIsnull?: boolean
    registratiedatumLt?: string
    registratiedatumLte?: string
    registratiedatumNot?: string | null
    statusCode?: number
    statusOmschrijving?: string
    statusOmschrijvingIsempty?: boolean
    statusOmschrijvingIsnull?: boolean
    statusOmschrijvingLike?: string
    statusOmschrijvingNot?: string | null
    typeAdres?: string
    typeAdresIsempty?: boolean
    typeAdresIsnull?: boolean
    typeAdresLike?: string
    typeAdresNot?: string | null
    typeAdresseerbaarObjectCode?: number
    typeAdresseerbaarObjectOmschrijving?: string
    typeAdresseerbaarObjectOmschrijvingIsempty?: boolean
    typeAdresseerbaarObjectOmschrijvingIsnull?: boolean
    typeAdresseerbaarObjectOmschrijvingLike?: string
    typeAdresseerbaarObjectOmschrijvingNot?: string | null
    volgnummer?: number
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedBagnummeraanduidingenList
  }>(
    `/v1/bag/nummeraanduidingen/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        adresseertLigplaatsId,
        'adresseertLigplaatsId[in]': adresseertLigplaatsIdIn,
        'adresseertLigplaatsId[isnull]': adresseertLigplaatsIdIsnull,
        'adresseertLigplaatsId[not]': adresseertLigplaatsIdNot,
        adresseertLigplaatsIdentificatie,
        'adresseertLigplaatsIdentificatie[isempty]': adresseertLigplaatsIdentificatieIsempty,
        'adresseertLigplaatsIdentificatie[isnull]': adresseertLigplaatsIdentificatieIsnull,
        'adresseertLigplaatsIdentificatie[like]': adresseertLigplaatsIdentificatieLike,
        'adresseertLigplaatsIdentificatie[not]': adresseertLigplaatsIdentificatieNot,
        adresseertLigplaatsVolgnummer,
        adresseertStandplaatsId,
        'adresseertStandplaatsId[in]': adresseertStandplaatsIdIn,
        'adresseertStandplaatsId[isnull]': adresseertStandplaatsIdIsnull,
        'adresseertStandplaatsId[not]': adresseertStandplaatsIdNot,
        adresseertStandplaatsIdentificatie,
        'adresseertStandplaatsIdentificatie[isempty]': adresseertStandplaatsIdentificatieIsempty,
        'adresseertStandplaatsIdentificatie[isnull]': adresseertStandplaatsIdentificatieIsnull,
        'adresseertStandplaatsIdentificatie[like]': adresseertStandplaatsIdentificatieLike,
        'adresseertStandplaatsIdentificatie[not]': adresseertStandplaatsIdentificatieNot,
        adresseertStandplaatsVolgnummer,
        adresseertVerblijfsobjectId,
        'adresseertVerblijfsobjectId[in]': adresseertVerblijfsobjectIdIn,
        'adresseertVerblijfsobjectId[isnull]': adresseertVerblijfsobjectIdIsnull,
        'adresseertVerblijfsobjectId[not]': adresseertVerblijfsobjectIdNot,
        adresseertVerblijfsobjectIdentificatie,
        'adresseertVerblijfsobjectIdentificatie[isempty]':
          adresseertVerblijfsobjectIdentificatieIsempty,
        'adresseertVerblijfsobjectIdentificatie[isnull]':
          adresseertVerblijfsobjectIdentificatieIsnull,
        'adresseertVerblijfsobjectIdentificatie[like]': adresseertVerblijfsobjectIdentificatieLike,
        'adresseertVerblijfsobjectIdentificatie[not]': adresseertVerblijfsobjectIdentificatieNot,
        adresseertVerblijfsobjectVolgnummer,
        bagprocesCode,
        bagprocesOmschrijving,
        'bagprocesOmschrijving[isempty]': bagprocesOmschrijvingIsempty,
        'bagprocesOmschrijving[isnull]': bagprocesOmschrijvingIsnull,
        'bagprocesOmschrijving[like]': bagprocesOmschrijvingLike,
        'bagprocesOmschrijving[not]': bagprocesOmschrijvingNot,
        beginGeldigheid,
        'beginGeldigheid[gt]': beginGeldigheidGt,
        'beginGeldigheid[gte]': beginGeldigheidGte,
        'beginGeldigheid[isnull]': beginGeldigheidIsnull,
        'beginGeldigheid[lt]': beginGeldigheidLt,
        'beginGeldigheid[lte]': beginGeldigheidLte,
        'beginGeldigheid[not]': beginGeldigheidNot,
        documentdatum,
        'documentdatum[gt]': documentdatumGt,
        'documentdatum[gte]': documentdatumGte,
        'documentdatum[isnull]': documentdatumIsnull,
        'documentdatum[lt]': documentdatumLt,
        'documentdatum[lte]': documentdatumLte,
        'documentdatum[not]': documentdatumNot,
        documentnummer,
        'documentnummer[isempty]': documentnummerIsempty,
        'documentnummer[isnull]': documentnummerIsnull,
        'documentnummer[like]': documentnummerLike,
        'documentnummer[not]': documentnummerNot,
        eindGeldigheid,
        'eindGeldigheid[gt]': eindGeldigheidGt,
        'eindGeldigheid[gte]': eindGeldigheidGte,
        'eindGeldigheid[isnull]': eindGeldigheidIsnull,
        'eindGeldigheid[lt]': eindGeldigheidLt,
        'eindGeldigheid[lte]': eindGeldigheidLte,
        'eindGeldigheid[not]': eindGeldigheidNot,
        geconstateerd,
        heeftDossierId,
        'heeftDossierId[in]': heeftDossierIdIn,
        'heeftDossierId[isnull]': heeftDossierIdIsnull,
        'heeftDossierId[not]': heeftDossierIdNot,
        huisletter,
        'huisletter[isempty]': huisletterIsempty,
        'huisletter[isnull]': huisletterIsnull,
        'huisletter[like]': huisletterLike,
        'huisletter[not]': huisletterNot,
        huisnummer,
        huisnummertoevoeging,
        'huisnummertoevoeging[isempty]': huisnummertoevoegingIsempty,
        'huisnummertoevoeging[isnull]': huisnummertoevoegingIsnull,
        'huisnummertoevoeging[like]': huisnummertoevoegingLike,
        'huisnummertoevoeging[not]': huisnummertoevoegingNot,
        id,
        'id[isempty]': idIsempty,
        'id[isnull]': idIsnull,
        'id[like]': idLike,
        'id[not]': idNot,
        identificatie,
        'identificatie[isempty]': identificatieIsempty,
        'identificatie[isnull]': identificatieIsnull,
        'identificatie[like]': identificatieLike,
        'identificatie[not]': identificatieNot,
        ligtAanOpenbareruimteId,
        'ligtAanOpenbareruimteId[in]': ligtAanOpenbareruimteIdIn,
        'ligtAanOpenbareruimteId[isnull]': ligtAanOpenbareruimteIdIsnull,
        'ligtAanOpenbareruimteId[not]': ligtAanOpenbareruimteIdNot,
        ligtAanOpenbareruimteIdentificatie,
        'ligtAanOpenbareruimteIdentificatie[isempty]': ligtAanOpenbareruimteIdentificatieIsempty,
        'ligtAanOpenbareruimteIdentificatie[isnull]': ligtAanOpenbareruimteIdentificatieIsnull,
        'ligtAanOpenbareruimteIdentificatie[like]': ligtAanOpenbareruimteIdentificatieLike,
        'ligtAanOpenbareruimteIdentificatie[not]': ligtAanOpenbareruimteIdentificatieNot,
        ligtAanOpenbareruimteVolgnummer,
        ligtInWoonplaatsId,
        'ligtInWoonplaatsId[in]': ligtInWoonplaatsIdIn,
        'ligtInWoonplaatsId[isnull]': ligtInWoonplaatsIdIsnull,
        'ligtInWoonplaatsId[not]': ligtInWoonplaatsIdNot,
        ligtInWoonplaatsIdentificatie,
        'ligtInWoonplaatsIdentificatie[isempty]': ligtInWoonplaatsIdentificatieIsempty,
        'ligtInWoonplaatsIdentificatie[isnull]': ligtInWoonplaatsIdentificatieIsnull,
        'ligtInWoonplaatsIdentificatie[like]': ligtInWoonplaatsIdentificatieLike,
        'ligtInWoonplaatsIdentificatie[not]': ligtInWoonplaatsIdentificatieNot,
        ligtInWoonplaatsVolgnummer,
        page,
        postcode,
        'postcode[isempty]': postcodeIsempty,
        'postcode[isnull]': postcodeIsnull,
        'postcode[like]': postcodeLike,
        'postcode[not]': postcodeNot,
        registratiedatum,
        'registratiedatum[gt]': registratiedatumGt,
        'registratiedatum[gte]': registratiedatumGte,
        'registratiedatum[isnull]': registratiedatumIsnull,
        'registratiedatum[lt]': registratiedatumLt,
        'registratiedatum[lte]': registratiedatumLte,
        'registratiedatum[not]': registratiedatumNot,
        statusCode,
        statusOmschrijving,
        'statusOmschrijving[isempty]': statusOmschrijvingIsempty,
        'statusOmschrijving[isnull]': statusOmschrijvingIsnull,
        'statusOmschrijving[like]': statusOmschrijvingLike,
        'statusOmschrijving[not]': statusOmschrijvingNot,
        typeAdres,
        'typeAdres[isempty]': typeAdresIsempty,
        'typeAdres[isnull]': typeAdresIsnull,
        'typeAdres[like]': typeAdresLike,
        'typeAdres[not]': typeAdresNot,
        typeAdresseerbaarObjectCode,
        typeAdresseerbaarObjectOmschrijving,
        'typeAdresseerbaarObjectOmschrijving[isempty]': typeAdresseerbaarObjectOmschrijvingIsempty,
        'typeAdresseerbaarObjectOmschrijving[isnull]': typeAdresseerbaarObjectOmschrijvingIsnull,
        'typeAdresseerbaarObjectOmschrijving[like]': typeAdresseerbaarObjectOmschrijvingLike,
        'typeAdresseerbaarObjectOmschrijving[not]': typeAdresseerbaarObjectOmschrijvingNot,
        volgnummer,
      }),
      QS.explode({
        heeftOnderzoeken,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagNummeraanduidingenRetrieve(
  id: string,
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: Bagnummeraanduidingen
  }>(
    `/v1/bag/nummeraanduidingen/${id}/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagOnderzoekenList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    beginGeldigheid,
    beginGeldigheidGt,
    beginGeldigheidGte,
    beginGeldigheidIsnull,
    beginGeldigheidLt,
    beginGeldigheidLte,
    beginGeldigheidNot,
    documentdatum,
    documentdatumGt,
    documentdatumGte,
    documentdatumIsnull,
    documentdatumLt,
    documentdatumLte,
    documentdatumNot,
    documentnummer,
    documentnummerIsempty,
    documentnummerIsnull,
    documentnummerLike,
    documentnummerNot,
    eindGeldigheid,
    eindGeldigheidGt,
    eindGeldigheidGte,
    eindGeldigheidIsnull,
    eindGeldigheidLt,
    eindGeldigheidLte,
    eindGeldigheidNot,
    eindRegistratie,
    eindRegistratieGt,
    eindRegistratieGte,
    eindRegistratieIsnull,
    eindRegistratieLt,
    eindRegistratieLte,
    eindRegistratieNot,
    id,
    idIsempty,
    idIsnull,
    idLike,
    idNot,
    identificatie,
    identificatieIsempty,
    identificatieIsnull,
    identificatieLike,
    identificatieNot,
    inOnderzoek,
    inOnderzoekIsempty,
    inOnderzoekIsnull,
    inOnderzoekLike,
    inOnderzoekNot,
    kenmerk,
    kenmerkIsempty,
    kenmerkIsnull,
    kenmerkLike,
    kenmerkNot,
    objectIdentificatie,
    objectIdentificatieIsempty,
    objectIdentificatieIsnull,
    objectIdentificatieLike,
    objectIdentificatieNot,
    objecttype,
    objecttypeIsempty,
    objecttypeIsnull,
    objecttypeLike,
    objecttypeNot,
    page,
    registratiedatum,
    registratiedatumGt,
    registratiedatumGte,
    registratiedatumIsnull,
    registratiedatumLt,
    registratiedatumLte,
    registratiedatumNot,
    tijdstipRegistratie,
    tijdstipRegistratieGt,
    tijdstipRegistratieGte,
    tijdstipRegistratieIsnull,
    tijdstipRegistratieLt,
    tijdstipRegistratieLte,
    tijdstipRegistratieNot,
    volgnummer,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    beginGeldigheid?: string
    beginGeldigheidGt?: string
    beginGeldigheidGte?: string
    beginGeldigheidIsnull?: boolean
    beginGeldigheidLt?: string
    beginGeldigheidLte?: string
    beginGeldigheidNot?: string | null
    documentdatum?: string
    documentdatumGt?: string
    documentdatumGte?: string
    documentdatumIsnull?: boolean
    documentdatumLt?: string
    documentdatumLte?: string
    documentdatumNot?: string | null
    documentnummer?: string
    documentnummerIsempty?: boolean
    documentnummerIsnull?: boolean
    documentnummerLike?: string
    documentnummerNot?: string | null
    eindGeldigheid?: string
    eindGeldigheidGt?: string
    eindGeldigheidGte?: string
    eindGeldigheidIsnull?: boolean
    eindGeldigheidLt?: string
    eindGeldigheidLte?: string
    eindGeldigheidNot?: string | null
    eindRegistratie?: string
    eindRegistratieGt?: string
    eindRegistratieGte?: string
    eindRegistratieIsnull?: boolean
    eindRegistratieLt?: string
    eindRegistratieLte?: string
    eindRegistratieNot?: string | null
    id?: string
    idIsempty?: boolean
    idIsnull?: boolean
    idLike?: string
    idNot?: string
    identificatie?: string
    identificatieIsempty?: boolean
    identificatieIsnull?: boolean
    identificatieLike?: string
    identificatieNot?: string
    inOnderzoek?: string
    inOnderzoekIsempty?: boolean
    inOnderzoekIsnull?: boolean
    inOnderzoekLike?: string
    inOnderzoekNot?: string | null
    kenmerk?: string
    kenmerkIsempty?: boolean
    kenmerkIsnull?: boolean
    kenmerkLike?: string
    kenmerkNot?: string | null
    objectIdentificatie?: string
    objectIdentificatieIsempty?: boolean
    objectIdentificatieIsnull?: boolean
    objectIdentificatieLike?: string
    objectIdentificatieNot?: string | null
    objecttype?: string
    objecttypeIsempty?: boolean
    objecttypeIsnull?: boolean
    objecttypeLike?: string
    objecttypeNot?: string | null
    page?: number
    registratiedatum?: string
    registratiedatumGt?: string
    registratiedatumGte?: string
    registratiedatumIsnull?: boolean
    registratiedatumLt?: string
    registratiedatumLte?: string
    registratiedatumNot?: string | null
    tijdstipRegistratie?: string
    tijdstipRegistratieGt?: string
    tijdstipRegistratieGte?: string
    tijdstipRegistratieIsnull?: boolean
    tijdstipRegistratieLt?: string
    tijdstipRegistratieLte?: string
    tijdstipRegistratieNot?: string | null
    volgnummer?: number
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedBagonderzoekenList
  }>(
    `/v1/bag/onderzoeken/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        beginGeldigheid,
        'beginGeldigheid[gt]': beginGeldigheidGt,
        'beginGeldigheid[gte]': beginGeldigheidGte,
        'beginGeldigheid[isnull]': beginGeldigheidIsnull,
        'beginGeldigheid[lt]': beginGeldigheidLt,
        'beginGeldigheid[lte]': beginGeldigheidLte,
        'beginGeldigheid[not]': beginGeldigheidNot,
        documentdatum,
        'documentdatum[gt]': documentdatumGt,
        'documentdatum[gte]': documentdatumGte,
        'documentdatum[isnull]': documentdatumIsnull,
        'documentdatum[lt]': documentdatumLt,
        'documentdatum[lte]': documentdatumLte,
        'documentdatum[not]': documentdatumNot,
        documentnummer,
        'documentnummer[isempty]': documentnummerIsempty,
        'documentnummer[isnull]': documentnummerIsnull,
        'documentnummer[like]': documentnummerLike,
        'documentnummer[not]': documentnummerNot,
        eindGeldigheid,
        'eindGeldigheid[gt]': eindGeldigheidGt,
        'eindGeldigheid[gte]': eindGeldigheidGte,
        'eindGeldigheid[isnull]': eindGeldigheidIsnull,
        'eindGeldigheid[lt]': eindGeldigheidLt,
        'eindGeldigheid[lte]': eindGeldigheidLte,
        'eindGeldigheid[not]': eindGeldigheidNot,
        eindRegistratie,
        'eindRegistratie[gt]': eindRegistratieGt,
        'eindRegistratie[gte]': eindRegistratieGte,
        'eindRegistratie[isnull]': eindRegistratieIsnull,
        'eindRegistratie[lt]': eindRegistratieLt,
        'eindRegistratie[lte]': eindRegistratieLte,
        'eindRegistratie[not]': eindRegistratieNot,
        id,
        'id[isempty]': idIsempty,
        'id[isnull]': idIsnull,
        'id[like]': idLike,
        'id[not]': idNot,
        identificatie,
        'identificatie[isempty]': identificatieIsempty,
        'identificatie[isnull]': identificatieIsnull,
        'identificatie[like]': identificatieLike,
        'identificatie[not]': identificatieNot,
        inOnderzoek,
        'inOnderzoek[isempty]': inOnderzoekIsempty,
        'inOnderzoek[isnull]': inOnderzoekIsnull,
        'inOnderzoek[like]': inOnderzoekLike,
        'inOnderzoek[not]': inOnderzoekNot,
        kenmerk,
        'kenmerk[isempty]': kenmerkIsempty,
        'kenmerk[isnull]': kenmerkIsnull,
        'kenmerk[like]': kenmerkLike,
        'kenmerk[not]': kenmerkNot,
        objectIdentificatie,
        'objectIdentificatie[isempty]': objectIdentificatieIsempty,
        'objectIdentificatie[isnull]': objectIdentificatieIsnull,
        'objectIdentificatie[like]': objectIdentificatieLike,
        'objectIdentificatie[not]': objectIdentificatieNot,
        objecttype,
        'objecttype[isempty]': objecttypeIsempty,
        'objecttype[isnull]': objecttypeIsnull,
        'objecttype[like]': objecttypeLike,
        'objecttype[not]': objecttypeNot,
        page,
        registratiedatum,
        'registratiedatum[gt]': registratiedatumGt,
        'registratiedatum[gte]': registratiedatumGte,
        'registratiedatum[isnull]': registratiedatumIsnull,
        'registratiedatum[lt]': registratiedatumLt,
        'registratiedatum[lte]': registratiedatumLte,
        'registratiedatum[not]': registratiedatumNot,
        tijdstipRegistratie,
        'tijdstipRegistratie[gt]': tijdstipRegistratieGt,
        'tijdstipRegistratie[gte]': tijdstipRegistratieGte,
        'tijdstipRegistratie[isnull]': tijdstipRegistratieIsnull,
        'tijdstipRegistratie[lt]': tijdstipRegistratieLt,
        'tijdstipRegistratie[lte]': tijdstipRegistratieLte,
        'tijdstipRegistratie[not]': tijdstipRegistratieNot,
        volgnummer,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagOnderzoekenRetrieve(
  id: string,
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: Bagonderzoeken
  }>(
    `/v1/bag/onderzoeken/${id}/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagOpenbareruimtesList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    bagprocesCode,
    bagprocesOmschrijving,
    bagprocesOmschrijvingIsempty,
    bagprocesOmschrijvingIsnull,
    bagprocesOmschrijvingLike,
    bagprocesOmschrijvingNot,
    beginGeldigheid,
    beginGeldigheidGt,
    beginGeldigheidGte,
    beginGeldigheidIsnull,
    beginGeldigheidLt,
    beginGeldigheidLte,
    beginGeldigheidNot,
    beschrijvingNaam,
    beschrijvingNaamIsempty,
    beschrijvingNaamIsnull,
    beschrijvingNaamLike,
    beschrijvingNaamNot,
    documentdatum,
    documentdatumGt,
    documentdatumGte,
    documentdatumIsnull,
    documentdatumLt,
    documentdatumLte,
    documentdatumNot,
    documentnummer,
    documentnummerIsempty,
    documentnummerIsnull,
    documentnummerLike,
    documentnummerNot,
    eindGeldigheid,
    eindGeldigheidGt,
    eindGeldigheidGte,
    eindGeldigheidIsnull,
    eindGeldigheidLt,
    eindGeldigheidLte,
    eindGeldigheidNot,
    geconstateerd,
    geometrie,
    heeftDossierId,
    heeftDossierIdIn,
    heeftDossierIdIsnull,
    heeftDossierIdNot,
    heeftOnderzoeken,
    id,
    idIsempty,
    idIsnull,
    idLike,
    idNot,
    identificatie,
    identificatieIsempty,
    identificatieIsnull,
    identificatieLike,
    identificatieNot,
    ligtInWoonplaatsId,
    ligtInWoonplaatsIdIn,
    ligtInWoonplaatsIdIsnull,
    ligtInWoonplaatsIdNot,
    ligtInWoonplaatsIdentificatie,
    ligtInWoonplaatsIdentificatieIsempty,
    ligtInWoonplaatsIdentificatieIsnull,
    ligtInWoonplaatsIdentificatieLike,
    ligtInWoonplaatsIdentificatieNot,
    ligtInWoonplaatsVolgnummer,
    naam,
    naamNen,
    naamNenIsempty,
    naamNenIsnull,
    naamNenLike,
    naamNenNot,
    naamIsempty,
    naamIsnull,
    naamLike,
    naamNot,
    page,
    registratiedatum,
    registratiedatumGt,
    registratiedatumGte,
    registratiedatumIsnull,
    registratiedatumLt,
    registratiedatumLte,
    registratiedatumNot,
    statusCode,
    statusOmschrijving,
    statusOmschrijvingIsempty,
    statusOmschrijvingIsnull,
    statusOmschrijvingLike,
    statusOmschrijvingNot,
    straatcode,
    straatcodeIsempty,
    straatcodeIsnull,
    straatcodeLike,
    straatcodeNot,
    straatnaamPtt,
    straatnaamPttIsempty,
    straatnaamPttIsnull,
    straatnaamPttLike,
    straatnaamPttNot,
    typeCode,
    typeOmschrijving,
    typeOmschrijvingIsempty,
    typeOmschrijvingIsnull,
    typeOmschrijvingLike,
    typeOmschrijvingNot,
    volgnummer,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    bagprocesCode?: number
    bagprocesOmschrijving?: string
    bagprocesOmschrijvingIsempty?: boolean
    bagprocesOmschrijvingIsnull?: boolean
    bagprocesOmschrijvingLike?: string
    bagprocesOmschrijvingNot?: string | null
    beginGeldigheid?: string
    beginGeldigheidGt?: string
    beginGeldigheidGte?: string
    beginGeldigheidIsnull?: boolean
    beginGeldigheidLt?: string
    beginGeldigheidLte?: string
    beginGeldigheidNot?: string | null
    beschrijvingNaam?: string
    beschrijvingNaamIsempty?: boolean
    beschrijvingNaamIsnull?: boolean
    beschrijvingNaamLike?: string
    beschrijvingNaamNot?: string | null
    documentdatum?: string
    documentdatumGt?: string
    documentdatumGte?: string
    documentdatumIsnull?: boolean
    documentdatumLt?: string
    documentdatumLte?: string
    documentdatumNot?: string | null
    documentnummer?: string
    documentnummerIsempty?: boolean
    documentnummerIsnull?: boolean
    documentnummerLike?: string
    documentnummerNot?: string | null
    eindGeldigheid?: string
    eindGeldigheidGt?: string
    eindGeldigheidGte?: string
    eindGeldigheidIsnull?: boolean
    eindGeldigheidLt?: string
    eindGeldigheidLte?: string
    eindGeldigheidNot?: string | null
    geconstateerd?: boolean
    geometrie?: string
    heeftDossierId?: string | null
    heeftDossierIdIn?: (string | null)[]
    heeftDossierIdIsnull?: boolean
    heeftDossierIdNot?: string | null
    heeftOnderzoeken?: string[]
    id?: string
    idIsempty?: boolean
    idIsnull?: boolean
    idLike?: string
    idNot?: string
    identificatie?: string
    identificatieIsempty?: boolean
    identificatieIsnull?: boolean
    identificatieLike?: string
    identificatieNot?: string
    ligtInWoonplaatsId?: string | null
    ligtInWoonplaatsIdIn?: (string | null)[]
    ligtInWoonplaatsIdIsnull?: boolean
    ligtInWoonplaatsIdNot?: string | null
    ligtInWoonplaatsIdentificatie?: string
    ligtInWoonplaatsIdentificatieIsempty?: boolean
    ligtInWoonplaatsIdentificatieIsnull?: boolean
    ligtInWoonplaatsIdentificatieLike?: string
    ligtInWoonplaatsIdentificatieNot?: string | null
    ligtInWoonplaatsVolgnummer?: number
    naam?: string
    naamNen?: string
    naamNenIsempty?: boolean
    naamNenIsnull?: boolean
    naamNenLike?: string
    naamNenNot?: string | null
    naamIsempty?: boolean
    naamIsnull?: boolean
    naamLike?: string
    naamNot?: string | null
    page?: number
    registratiedatum?: string
    registratiedatumGt?: string
    registratiedatumGte?: string
    registratiedatumIsnull?: boolean
    registratiedatumLt?: string
    registratiedatumLte?: string
    registratiedatumNot?: string | null
    statusCode?: number
    statusOmschrijving?: string
    statusOmschrijvingIsempty?: boolean
    statusOmschrijvingIsnull?: boolean
    statusOmschrijvingLike?: string
    statusOmschrijvingNot?: string | null
    straatcode?: string
    straatcodeIsempty?: boolean
    straatcodeIsnull?: boolean
    straatcodeLike?: string
    straatcodeNot?: string | null
    straatnaamPtt?: string
    straatnaamPttIsempty?: boolean
    straatnaamPttIsnull?: boolean
    straatnaamPttLike?: string
    straatnaamPttNot?: string | null
    typeCode?: number
    typeOmschrijving?: string
    typeOmschrijvingIsempty?: boolean
    typeOmschrijvingIsnull?: boolean
    typeOmschrijvingLike?: string
    typeOmschrijvingNot?: string | null
    volgnummer?: number
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedBagopenbareruimtesList
  }>(
    `/v1/bag/openbareruimtes/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        bagprocesCode,
        bagprocesOmschrijving,
        'bagprocesOmschrijving[isempty]': bagprocesOmschrijvingIsempty,
        'bagprocesOmschrijving[isnull]': bagprocesOmschrijvingIsnull,
        'bagprocesOmschrijving[like]': bagprocesOmschrijvingLike,
        'bagprocesOmschrijving[not]': bagprocesOmschrijvingNot,
        beginGeldigheid,
        'beginGeldigheid[gt]': beginGeldigheidGt,
        'beginGeldigheid[gte]': beginGeldigheidGte,
        'beginGeldigheid[isnull]': beginGeldigheidIsnull,
        'beginGeldigheid[lt]': beginGeldigheidLt,
        'beginGeldigheid[lte]': beginGeldigheidLte,
        'beginGeldigheid[not]': beginGeldigheidNot,
        beschrijvingNaam,
        'beschrijvingNaam[isempty]': beschrijvingNaamIsempty,
        'beschrijvingNaam[isnull]': beschrijvingNaamIsnull,
        'beschrijvingNaam[like]': beschrijvingNaamLike,
        'beschrijvingNaam[not]': beschrijvingNaamNot,
        documentdatum,
        'documentdatum[gt]': documentdatumGt,
        'documentdatum[gte]': documentdatumGte,
        'documentdatum[isnull]': documentdatumIsnull,
        'documentdatum[lt]': documentdatumLt,
        'documentdatum[lte]': documentdatumLte,
        'documentdatum[not]': documentdatumNot,
        documentnummer,
        'documentnummer[isempty]': documentnummerIsempty,
        'documentnummer[isnull]': documentnummerIsnull,
        'documentnummer[like]': documentnummerLike,
        'documentnummer[not]': documentnummerNot,
        eindGeldigheid,
        'eindGeldigheid[gt]': eindGeldigheidGt,
        'eindGeldigheid[gte]': eindGeldigheidGte,
        'eindGeldigheid[isnull]': eindGeldigheidIsnull,
        'eindGeldigheid[lt]': eindGeldigheidLt,
        'eindGeldigheid[lte]': eindGeldigheidLte,
        'eindGeldigheid[not]': eindGeldigheidNot,
        geconstateerd,
        geometrie,
        heeftDossierId,
        'heeftDossierId[in]': heeftDossierIdIn,
        'heeftDossierId[isnull]': heeftDossierIdIsnull,
        'heeftDossierId[not]': heeftDossierIdNot,
        id,
        'id[isempty]': idIsempty,
        'id[isnull]': idIsnull,
        'id[like]': idLike,
        'id[not]': idNot,
        identificatie,
        'identificatie[isempty]': identificatieIsempty,
        'identificatie[isnull]': identificatieIsnull,
        'identificatie[like]': identificatieLike,
        'identificatie[not]': identificatieNot,
        ligtInWoonplaatsId,
        'ligtInWoonplaatsId[in]': ligtInWoonplaatsIdIn,
        'ligtInWoonplaatsId[isnull]': ligtInWoonplaatsIdIsnull,
        'ligtInWoonplaatsId[not]': ligtInWoonplaatsIdNot,
        ligtInWoonplaatsIdentificatie,
        'ligtInWoonplaatsIdentificatie[isempty]': ligtInWoonplaatsIdentificatieIsempty,
        'ligtInWoonplaatsIdentificatie[isnull]': ligtInWoonplaatsIdentificatieIsnull,
        'ligtInWoonplaatsIdentificatie[like]': ligtInWoonplaatsIdentificatieLike,
        'ligtInWoonplaatsIdentificatie[not]': ligtInWoonplaatsIdentificatieNot,
        ligtInWoonplaatsVolgnummer,
        naam,
        naamNen,
        'naamNen[isempty]': naamNenIsempty,
        'naamNen[isnull]': naamNenIsnull,
        'naamNen[like]': naamNenLike,
        'naamNen[not]': naamNenNot,
        'naam[isempty]': naamIsempty,
        'naam[isnull]': naamIsnull,
        'naam[like]': naamLike,
        'naam[not]': naamNot,
        page,
        registratiedatum,
        'registratiedatum[gt]': registratiedatumGt,
        'registratiedatum[gte]': registratiedatumGte,
        'registratiedatum[isnull]': registratiedatumIsnull,
        'registratiedatum[lt]': registratiedatumLt,
        'registratiedatum[lte]': registratiedatumLte,
        'registratiedatum[not]': registratiedatumNot,
        statusCode,
        statusOmschrijving,
        'statusOmschrijving[isempty]': statusOmschrijvingIsempty,
        'statusOmschrijving[isnull]': statusOmschrijvingIsnull,
        'statusOmschrijving[like]': statusOmschrijvingLike,
        'statusOmschrijving[not]': statusOmschrijvingNot,
        straatcode,
        'straatcode[isempty]': straatcodeIsempty,
        'straatcode[isnull]': straatcodeIsnull,
        'straatcode[like]': straatcodeLike,
        'straatcode[not]': straatcodeNot,
        straatnaamPtt,
        'straatnaamPtt[isempty]': straatnaamPttIsempty,
        'straatnaamPtt[isnull]': straatnaamPttIsnull,
        'straatnaamPtt[like]': straatnaamPttLike,
        'straatnaamPtt[not]': straatnaamPttNot,
        typeCode,
        typeOmschrijving,
        'typeOmschrijving[isempty]': typeOmschrijvingIsempty,
        'typeOmschrijving[isnull]': typeOmschrijvingIsnull,
        'typeOmschrijving[like]': typeOmschrijvingLike,
        'typeOmschrijving[not]': typeOmschrijvingNot,
        volgnummer,
      }),
      QS.explode({
        heeftOnderzoeken,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagOpenbareruimtesRetrieve(
  id: string,
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: Bagopenbareruimtes
  }>(
    `/v1/bag/openbareruimtes/${id}/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagPandenList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    aantalBouwlagen,
    bagprocesCode,
    bagprocesOmschrijving,
    bagprocesOmschrijvingIsempty,
    bagprocesOmschrijvingIsnull,
    bagprocesOmschrijvingLike,
    bagprocesOmschrijvingNot,
    beginGeldigheid,
    beginGeldigheidGt,
    beginGeldigheidGte,
    beginGeldigheidIsnull,
    beginGeldigheidLt,
    beginGeldigheidLte,
    beginGeldigheidNot,
    documentdatum,
    documentdatumGt,
    documentdatumGte,
    documentdatumIsnull,
    documentdatumLt,
    documentdatumLte,
    documentdatumNot,
    documentnummer,
    documentnummerIsempty,
    documentnummerIsnull,
    documentnummerLike,
    documentnummerNot,
    eindGeldigheid,
    eindGeldigheidGt,
    eindGeldigheidGte,
    eindGeldigheidIsnull,
    eindGeldigheidLt,
    eindGeldigheidLte,
    eindGeldigheidNot,
    geconstateerd,
    geometrie,
    heeftDossierId,
    heeftDossierIdIn,
    heeftDossierIdIsnull,
    heeftDossierIdNot,
    heeftOnderzoeken,
    hoogsteBouwlaag,
    id,
    idIsempty,
    idIsnull,
    idLike,
    idNot,
    identificatie,
    identificatieIsempty,
    identificatieIsnull,
    identificatieLike,
    identificatieNot,
    laagsteBouwlaag,
    liggingCode,
    liggingOmschrijving,
    liggingOmschrijvingIsempty,
    liggingOmschrijvingIsnull,
    liggingOmschrijvingLike,
    liggingOmschrijvingNot,
    ligtInBouwblokId,
    ligtInBouwblokIdIn,
    ligtInBouwblokIdIsnull,
    ligtInBouwblokIdNot,
    ligtInBouwblokIdentificatie,
    ligtInBouwblokIdentificatieIsempty,
    ligtInBouwblokIdentificatieIsnull,
    ligtInBouwblokIdentificatieLike,
    ligtInBouwblokIdentificatieNot,
    ligtInBouwblokVolgnummer,
    naam,
    naamIsempty,
    naamIsnull,
    naamLike,
    naamNot,
    oorspronkelijkBouwjaar,
    page,
    registratiedatum,
    registratiedatumGt,
    registratiedatumGte,
    registratiedatumIsnull,
    registratiedatumLt,
    registratiedatumLte,
    registratiedatumNot,
    statusCode,
    statusOmschrijving,
    statusOmschrijvingIsempty,
    statusOmschrijvingIsnull,
    statusOmschrijvingLike,
    statusOmschrijvingNot,
    typeWoonobject,
    typeWoonobjectIsempty,
    typeWoonobjectIsnull,
    typeWoonobjectLike,
    typeWoonobjectNot,
    volgnummer,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    aantalBouwlagen?: number
    bagprocesCode?: number
    bagprocesOmschrijving?: string
    bagprocesOmschrijvingIsempty?: boolean
    bagprocesOmschrijvingIsnull?: boolean
    bagprocesOmschrijvingLike?: string
    bagprocesOmschrijvingNot?: string | null
    beginGeldigheid?: string
    beginGeldigheidGt?: string
    beginGeldigheidGte?: string
    beginGeldigheidIsnull?: boolean
    beginGeldigheidLt?: string
    beginGeldigheidLte?: string
    beginGeldigheidNot?: string | null
    documentdatum?: string
    documentdatumGt?: string
    documentdatumGte?: string
    documentdatumIsnull?: boolean
    documentdatumLt?: string
    documentdatumLte?: string
    documentdatumNot?: string | null
    documentnummer?: string
    documentnummerIsempty?: boolean
    documentnummerIsnull?: boolean
    documentnummerLike?: string
    documentnummerNot?: string | null
    eindGeldigheid?: string
    eindGeldigheidGt?: string
    eindGeldigheidGte?: string
    eindGeldigheidIsnull?: boolean
    eindGeldigheidLt?: string
    eindGeldigheidLte?: string
    eindGeldigheidNot?: string | null
    geconstateerd?: boolean
    geometrie?: string
    heeftDossierId?: string | null
    heeftDossierIdIn?: (string | null)[]
    heeftDossierIdIsnull?: boolean
    heeftDossierIdNot?: string | null
    heeftOnderzoeken?: string[]
    hoogsteBouwlaag?: number
    id?: string
    idIsempty?: boolean
    idIsnull?: boolean
    idLike?: string
    idNot?: string
    identificatie?: string
    identificatieIsempty?: boolean
    identificatieIsnull?: boolean
    identificatieLike?: string
    identificatieNot?: string
    laagsteBouwlaag?: number
    liggingCode?: number
    liggingOmschrijving?: string
    liggingOmschrijvingIsempty?: boolean
    liggingOmschrijvingIsnull?: boolean
    liggingOmschrijvingLike?: string
    liggingOmschrijvingNot?: string | null
    ligtInBouwblokId?: string | null
    ligtInBouwblokIdIn?: (string | null)[]
    ligtInBouwblokIdIsnull?: boolean
    ligtInBouwblokIdNot?: string | null
    ligtInBouwblokIdentificatie?: string
    ligtInBouwblokIdentificatieIsempty?: boolean
    ligtInBouwblokIdentificatieIsnull?: boolean
    ligtInBouwblokIdentificatieLike?: string
    ligtInBouwblokIdentificatieNot?: string | null
    ligtInBouwblokVolgnummer?: number
    naam?: string
    naamIsempty?: boolean
    naamIsnull?: boolean
    naamLike?: string
    naamNot?: string | null
    oorspronkelijkBouwjaar?: number
    page?: number
    registratiedatum?: string
    registratiedatumGt?: string
    registratiedatumGte?: string
    registratiedatumIsnull?: boolean
    registratiedatumLt?: string
    registratiedatumLte?: string
    registratiedatumNot?: string | null
    statusCode?: number
    statusOmschrijving?: string
    statusOmschrijvingIsempty?: boolean
    statusOmschrijvingIsnull?: boolean
    statusOmschrijvingLike?: string
    statusOmschrijvingNot?: string | null
    typeWoonobject?: string
    typeWoonobjectIsempty?: boolean
    typeWoonobjectIsnull?: boolean
    typeWoonobjectLike?: string
    typeWoonobjectNot?: string | null
    volgnummer?: number
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedBagpandenList
  }>(
    `/v1/bag/panden/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        aantalBouwlagen,
        bagprocesCode,
        bagprocesOmschrijving,
        'bagprocesOmschrijving[isempty]': bagprocesOmschrijvingIsempty,
        'bagprocesOmschrijving[isnull]': bagprocesOmschrijvingIsnull,
        'bagprocesOmschrijving[like]': bagprocesOmschrijvingLike,
        'bagprocesOmschrijving[not]': bagprocesOmschrijvingNot,
        beginGeldigheid,
        'beginGeldigheid[gt]': beginGeldigheidGt,
        'beginGeldigheid[gte]': beginGeldigheidGte,
        'beginGeldigheid[isnull]': beginGeldigheidIsnull,
        'beginGeldigheid[lt]': beginGeldigheidLt,
        'beginGeldigheid[lte]': beginGeldigheidLte,
        'beginGeldigheid[not]': beginGeldigheidNot,
        documentdatum,
        'documentdatum[gt]': documentdatumGt,
        'documentdatum[gte]': documentdatumGte,
        'documentdatum[isnull]': documentdatumIsnull,
        'documentdatum[lt]': documentdatumLt,
        'documentdatum[lte]': documentdatumLte,
        'documentdatum[not]': documentdatumNot,
        documentnummer,
        'documentnummer[isempty]': documentnummerIsempty,
        'documentnummer[isnull]': documentnummerIsnull,
        'documentnummer[like]': documentnummerLike,
        'documentnummer[not]': documentnummerNot,
        eindGeldigheid,
        'eindGeldigheid[gt]': eindGeldigheidGt,
        'eindGeldigheid[gte]': eindGeldigheidGte,
        'eindGeldigheid[isnull]': eindGeldigheidIsnull,
        'eindGeldigheid[lt]': eindGeldigheidLt,
        'eindGeldigheid[lte]': eindGeldigheidLte,
        'eindGeldigheid[not]': eindGeldigheidNot,
        geconstateerd,
        geometrie,
        heeftDossierId,
        'heeftDossierId[in]': heeftDossierIdIn,
        'heeftDossierId[isnull]': heeftDossierIdIsnull,
        'heeftDossierId[not]': heeftDossierIdNot,
        hoogsteBouwlaag,
        id,
        'id[isempty]': idIsempty,
        'id[isnull]': idIsnull,
        'id[like]': idLike,
        'id[not]': idNot,
        identificatie,
        'identificatie[isempty]': identificatieIsempty,
        'identificatie[isnull]': identificatieIsnull,
        'identificatie[like]': identificatieLike,
        'identificatie[not]': identificatieNot,
        laagsteBouwlaag,
        liggingCode,
        liggingOmschrijving,
        'liggingOmschrijving[isempty]': liggingOmschrijvingIsempty,
        'liggingOmschrijving[isnull]': liggingOmschrijvingIsnull,
        'liggingOmschrijving[like]': liggingOmschrijvingLike,
        'liggingOmschrijving[not]': liggingOmschrijvingNot,
        ligtInBouwblokId,
        'ligtInBouwblokId[in]': ligtInBouwblokIdIn,
        'ligtInBouwblokId[isnull]': ligtInBouwblokIdIsnull,
        'ligtInBouwblokId[not]': ligtInBouwblokIdNot,
        ligtInBouwblokIdentificatie,
        'ligtInBouwblokIdentificatie[isempty]': ligtInBouwblokIdentificatieIsempty,
        'ligtInBouwblokIdentificatie[isnull]': ligtInBouwblokIdentificatieIsnull,
        'ligtInBouwblokIdentificatie[like]': ligtInBouwblokIdentificatieLike,
        'ligtInBouwblokIdentificatie[not]': ligtInBouwblokIdentificatieNot,
        ligtInBouwblokVolgnummer,
        naam,
        'naam[isempty]': naamIsempty,
        'naam[isnull]': naamIsnull,
        'naam[like]': naamLike,
        'naam[not]': naamNot,
        oorspronkelijkBouwjaar,
        page,
        registratiedatum,
        'registratiedatum[gt]': registratiedatumGt,
        'registratiedatum[gte]': registratiedatumGte,
        'registratiedatum[isnull]': registratiedatumIsnull,
        'registratiedatum[lt]': registratiedatumLt,
        'registratiedatum[lte]': registratiedatumLte,
        'registratiedatum[not]': registratiedatumNot,
        statusCode,
        statusOmschrijving,
        'statusOmschrijving[isempty]': statusOmschrijvingIsempty,
        'statusOmschrijving[isnull]': statusOmschrijvingIsnull,
        'statusOmschrijving[like]': statusOmschrijvingLike,
        'statusOmschrijving[not]': statusOmschrijvingNot,
        typeWoonobject,
        'typeWoonobject[isempty]': typeWoonobjectIsempty,
        'typeWoonobject[isnull]': typeWoonobjectIsnull,
        'typeWoonobject[like]': typeWoonobjectLike,
        'typeWoonobject[not]': typeWoonobjectNot,
        volgnummer,
      }),
      QS.explode({
        heeftOnderzoeken,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagPandenRetrieve(
  id: string,
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: Bagpanden
  }>(
    `/v1/bag/panden/${id}/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagStandplaatsenList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    bagprocesCode,
    bagprocesOmschrijving,
    bagprocesOmschrijvingIsempty,
    bagprocesOmschrijvingIsnull,
    bagprocesOmschrijvingLike,
    bagprocesOmschrijvingNot,
    beginGeldigheid,
    beginGeldigheidGt,
    beginGeldigheidGte,
    beginGeldigheidIsnull,
    beginGeldigheidLt,
    beginGeldigheidLte,
    beginGeldigheidNot,
    documentdatum,
    documentdatumGt,
    documentdatumGte,
    documentdatumIsnull,
    documentdatumLt,
    documentdatumLte,
    documentdatumNot,
    documentnummer,
    documentnummerIsempty,
    documentnummerIsnull,
    documentnummerLike,
    documentnummerNot,
    eindGeldigheid,
    eindGeldigheidGt,
    eindGeldigheidGte,
    eindGeldigheidIsnull,
    eindGeldigheidLt,
    eindGeldigheidLte,
    eindGeldigheidNot,
    gebruiksdoelOmschrijving,
    gebruiksdoelOmschrijvingIsempty,
    gebruiksdoelOmschrijvingIsnull,
    gebruiksdoelOmschrijvingLike,
    gebruiksdoelOmschrijvingNot,
    geconstateerd,
    geometrie,
    heeftDossierId,
    heeftDossierIdIn,
    heeftDossierIdIsnull,
    heeftDossierIdNot,
    heeftHoofdadresId,
    heeftHoofdadresIdIn,
    heeftHoofdadresIdIsnull,
    heeftHoofdadresIdNot,
    heeftHoofdadresIdentificatie,
    heeftHoofdadresIdentificatieIsempty,
    heeftHoofdadresIdentificatieIsnull,
    heeftHoofdadresIdentificatieLike,
    heeftHoofdadresIdentificatieNot,
    heeftHoofdadresVolgnummer,
    heeftNevenadres,
    heeftOnderzoeken,
    id,
    idIsempty,
    idIsnull,
    idLike,
    idNot,
    identificatie,
    identificatieIsempty,
    identificatieIsnull,
    identificatieLike,
    identificatieNot,
    ligtInBuurtId,
    ligtInBuurtIdIn,
    ligtInBuurtIdIsnull,
    ligtInBuurtIdNot,
    ligtInBuurtIdentificatie,
    ligtInBuurtIdentificatieIsempty,
    ligtInBuurtIdentificatieIsnull,
    ligtInBuurtIdentificatieLike,
    ligtInBuurtIdentificatieNot,
    ligtInBuurtVolgnummer,
    page,
    registratiedatum,
    registratiedatumGt,
    registratiedatumGte,
    registratiedatumIsnull,
    registratiedatumLt,
    registratiedatumLte,
    registratiedatumNot,
    statusCode,
    statusOmschrijving,
    statusOmschrijvingIsempty,
    statusOmschrijvingIsnull,
    statusOmschrijvingLike,
    statusOmschrijvingNot,
    volgnummer,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    bagprocesCode?: number
    bagprocesOmschrijving?: string
    bagprocesOmschrijvingIsempty?: boolean
    bagprocesOmschrijvingIsnull?: boolean
    bagprocesOmschrijvingLike?: string
    bagprocesOmschrijvingNot?: string | null
    beginGeldigheid?: string
    beginGeldigheidGt?: string
    beginGeldigheidGte?: string
    beginGeldigheidIsnull?: boolean
    beginGeldigheidLt?: string
    beginGeldigheidLte?: string
    beginGeldigheidNot?: string | null
    documentdatum?: string
    documentdatumGt?: string
    documentdatumGte?: string
    documentdatumIsnull?: boolean
    documentdatumLt?: string
    documentdatumLte?: string
    documentdatumNot?: string | null
    documentnummer?: string
    documentnummerIsempty?: boolean
    documentnummerIsnull?: boolean
    documentnummerLike?: string
    documentnummerNot?: string | null
    eindGeldigheid?: string
    eindGeldigheidGt?: string
    eindGeldigheidGte?: string
    eindGeldigheidIsnull?: boolean
    eindGeldigheidLt?: string
    eindGeldigheidLte?: string
    eindGeldigheidNot?: string | null
    gebruiksdoelOmschrijving?: string
    gebruiksdoelOmschrijvingIsempty?: string
    gebruiksdoelOmschrijvingIsnull?: string
    gebruiksdoelOmschrijvingLike?: string
    gebruiksdoelOmschrijvingNot?: string | null
    geconstateerd?: boolean
    geometrie?: string
    heeftDossierId?: string | null
    heeftDossierIdIn?: (string | null)[]
    heeftDossierIdIsnull?: boolean
    heeftDossierIdNot?: string | null
    heeftHoofdadresId?: string | null
    heeftHoofdadresIdIn?: (string | null)[]
    heeftHoofdadresIdIsnull?: boolean
    heeftHoofdadresIdNot?: string | null
    heeftHoofdadresIdentificatie?: string
    heeftHoofdadresIdentificatieIsempty?: boolean
    heeftHoofdadresIdentificatieIsnull?: boolean
    heeftHoofdadresIdentificatieLike?: string
    heeftHoofdadresIdentificatieNot?: string | null
    heeftHoofdadresVolgnummer?: number
    heeftNevenadres?: string[]
    heeftOnderzoeken?: string[]
    id?: string
    idIsempty?: boolean
    idIsnull?: boolean
    idLike?: string
    idNot?: string
    identificatie?: string
    identificatieIsempty?: boolean
    identificatieIsnull?: boolean
    identificatieLike?: string
    identificatieNot?: string
    ligtInBuurtId?: string | null
    ligtInBuurtIdIn?: (string | null)[]
    ligtInBuurtIdIsnull?: boolean
    ligtInBuurtIdNot?: string | null
    ligtInBuurtIdentificatie?: string
    ligtInBuurtIdentificatieIsempty?: boolean
    ligtInBuurtIdentificatieIsnull?: boolean
    ligtInBuurtIdentificatieLike?: string
    ligtInBuurtIdentificatieNot?: string | null
    ligtInBuurtVolgnummer?: number
    page?: number
    registratiedatum?: string
    registratiedatumGt?: string
    registratiedatumGte?: string
    registratiedatumIsnull?: boolean
    registratiedatumLt?: string
    registratiedatumLte?: string
    registratiedatumNot?: string | null
    statusCode?: number
    statusOmschrijving?: string
    statusOmschrijvingIsempty?: boolean
    statusOmschrijvingIsnull?: boolean
    statusOmschrijvingLike?: string
    statusOmschrijvingNot?: string | null
    volgnummer?: number
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedBagstandplaatsenList
  }>(
    `/v1/bag/standplaatsen/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        bagprocesCode,
        bagprocesOmschrijving,
        'bagprocesOmschrijving[isempty]': bagprocesOmschrijvingIsempty,
        'bagprocesOmschrijving[isnull]': bagprocesOmschrijvingIsnull,
        'bagprocesOmschrijving[like]': bagprocesOmschrijvingLike,
        'bagprocesOmschrijving[not]': bagprocesOmschrijvingNot,
        beginGeldigheid,
        'beginGeldigheid[gt]': beginGeldigheidGt,
        'beginGeldigheid[gte]': beginGeldigheidGte,
        'beginGeldigheid[isnull]': beginGeldigheidIsnull,
        'beginGeldigheid[lt]': beginGeldigheidLt,
        'beginGeldigheid[lte]': beginGeldigheidLte,
        'beginGeldigheid[not]': beginGeldigheidNot,
        documentdatum,
        'documentdatum[gt]': documentdatumGt,
        'documentdatum[gte]': documentdatumGte,
        'documentdatum[isnull]': documentdatumIsnull,
        'documentdatum[lt]': documentdatumLt,
        'documentdatum[lte]': documentdatumLte,
        'documentdatum[not]': documentdatumNot,
        documentnummer,
        'documentnummer[isempty]': documentnummerIsempty,
        'documentnummer[isnull]': documentnummerIsnull,
        'documentnummer[like]': documentnummerLike,
        'documentnummer[not]': documentnummerNot,
        eindGeldigheid,
        'eindGeldigheid[gt]': eindGeldigheidGt,
        'eindGeldigheid[gte]': eindGeldigheidGte,
        'eindGeldigheid[isnull]': eindGeldigheidIsnull,
        'eindGeldigheid[lt]': eindGeldigheidLt,
        'eindGeldigheid[lte]': eindGeldigheidLte,
        'eindGeldigheid[not]': eindGeldigheidNot,
        'gebruiksdoel.omschrijving': gebruiksdoelOmschrijving,
        'gebruiksdoel.omschrijving[isempty]': gebruiksdoelOmschrijvingIsempty,
        'gebruiksdoel.omschrijving[isnull]': gebruiksdoelOmschrijvingIsnull,
        'gebruiksdoel.omschrijving[like]': gebruiksdoelOmschrijvingLike,
        'gebruiksdoel.omschrijving[not]': gebruiksdoelOmschrijvingNot,
        geconstateerd,
        geometrie,
        heeftDossierId,
        'heeftDossierId[in]': heeftDossierIdIn,
        'heeftDossierId[isnull]': heeftDossierIdIsnull,
        'heeftDossierId[not]': heeftDossierIdNot,
        heeftHoofdadresId,
        'heeftHoofdadresId[in]': heeftHoofdadresIdIn,
        'heeftHoofdadresId[isnull]': heeftHoofdadresIdIsnull,
        'heeftHoofdadresId[not]': heeftHoofdadresIdNot,
        heeftHoofdadresIdentificatie,
        'heeftHoofdadresIdentificatie[isempty]': heeftHoofdadresIdentificatieIsempty,
        'heeftHoofdadresIdentificatie[isnull]': heeftHoofdadresIdentificatieIsnull,
        'heeftHoofdadresIdentificatie[like]': heeftHoofdadresIdentificatieLike,
        'heeftHoofdadresIdentificatie[not]': heeftHoofdadresIdentificatieNot,
        heeftHoofdadresVolgnummer,
        id,
        'id[isempty]': idIsempty,
        'id[isnull]': idIsnull,
        'id[like]': idLike,
        'id[not]': idNot,
        identificatie,
        'identificatie[isempty]': identificatieIsempty,
        'identificatie[isnull]': identificatieIsnull,
        'identificatie[like]': identificatieLike,
        'identificatie[not]': identificatieNot,
        ligtInBuurtId,
        'ligtInBuurtId[in]': ligtInBuurtIdIn,
        'ligtInBuurtId[isnull]': ligtInBuurtIdIsnull,
        'ligtInBuurtId[not]': ligtInBuurtIdNot,
        ligtInBuurtIdentificatie,
        'ligtInBuurtIdentificatie[isempty]': ligtInBuurtIdentificatieIsempty,
        'ligtInBuurtIdentificatie[isnull]': ligtInBuurtIdentificatieIsnull,
        'ligtInBuurtIdentificatie[like]': ligtInBuurtIdentificatieLike,
        'ligtInBuurtIdentificatie[not]': ligtInBuurtIdentificatieNot,
        ligtInBuurtVolgnummer,
        page,
        registratiedatum,
        'registratiedatum[gt]': registratiedatumGt,
        'registratiedatum[gte]': registratiedatumGte,
        'registratiedatum[isnull]': registratiedatumIsnull,
        'registratiedatum[lt]': registratiedatumLt,
        'registratiedatum[lte]': registratiedatumLte,
        'registratiedatum[not]': registratiedatumNot,
        statusCode,
        statusOmschrijving,
        'statusOmschrijving[isempty]': statusOmschrijvingIsempty,
        'statusOmschrijving[isnull]': statusOmschrijvingIsnull,
        'statusOmschrijving[like]': statusOmschrijvingLike,
        'statusOmschrijving[not]': statusOmschrijvingNot,
        volgnummer,
      }),
      QS.explode({
        heeftNevenadres,
        heeftOnderzoeken,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagStandplaatsenRetrieve(
  id: string,
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: Bagstandplaatsen
  }>(
    `/v1/bag/standplaatsen/${id}/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagVerblijfsobjectenList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    aantalBouwlagen,
    aantalEenhedenComplex,
    aantalKamers,
    bagprocesCode,
    bagprocesOmschrijving,
    bagprocesOmschrijvingIsempty,
    bagprocesOmschrijvingIsnull,
    bagprocesOmschrijvingLike,
    bagprocesOmschrijvingNot,
    beginGeldigheid,
    beginGeldigheidGt,
    beginGeldigheidGte,
    beginGeldigheidIsnull,
    beginGeldigheidLt,
    beginGeldigheidLte,
    beginGeldigheidNot,
    cbsNummer,
    cbsNummerIsempty,
    cbsNummerIsnull,
    cbsNummerLike,
    cbsNummerNot,
    documentdatum,
    documentdatumGt,
    documentdatumGte,
    documentdatumIsnull,
    documentdatumLt,
    documentdatumLte,
    documentdatumNot,
    documentnummer,
    documentnummerIsempty,
    documentnummerIsnull,
    documentnummerLike,
    documentnummerNot,
    eigendomsverhoudingCode,
    eigendomsverhoudingOmschrijving,
    eigendomsverhoudingOmschrijvingIsempty,
    eigendomsverhoudingOmschrijvingIsnull,
    eigendomsverhoudingOmschrijvingLike,
    eigendomsverhoudingOmschrijvingNot,
    eindGeldigheid,
    eindGeldigheidGt,
    eindGeldigheidGte,
    eindGeldigheidIsnull,
    eindGeldigheidLt,
    eindGeldigheidLte,
    eindGeldigheidNot,
    feitelijkGebruikCode,
    feitelijkGebruikOmschrijving,
    feitelijkGebruikOmschrijvingIsempty,
    feitelijkGebruikOmschrijvingIsnull,
    feitelijkGebruikOmschrijvingLike,
    feitelijkGebruikOmschrijvingNot,
    financieringscodeCode,
    financieringscodeOmschrijving,
    financieringscodeOmschrijvingIsempty,
    financieringscodeOmschrijvingIsnull,
    financieringscodeOmschrijvingLike,
    financieringscodeOmschrijvingNot,
    gebruiksdoelCode,
    gebruiksdoelCodeIsempty,
    gebruiksdoelCodeIsnull,
    gebruiksdoelCodeLike,
    gebruiksdoelCodeNot,
    gebruiksdoelOmschrijving,
    gebruiksdoelOmschrijvingIsempty,
    gebruiksdoelOmschrijvingIsnull,
    gebruiksdoelOmschrijvingLike,
    gebruiksdoelOmschrijvingNot,
    gebruiksdoelGezondheidszorgfunctieCode,
    gebruiksdoelGezondheidszorgfunctieOmschrijving,
    gebruiksdoelGezondheidszorgfunctieOmschrijvingIsempty,
    gebruiksdoelGezondheidszorgfunctieOmschrijvingIsnull,
    gebruiksdoelGezondheidszorgfunctieOmschrijvingLike,
    gebruiksdoelGezondheidszorgfunctieOmschrijvingNot,
    gebruiksdoelWoonfunctieCode,
    gebruiksdoelWoonfunctieOmschrijving,
    gebruiksdoelWoonfunctieOmschrijvingIsempty,
    gebruiksdoelWoonfunctieOmschrijvingIsnull,
    gebruiksdoelWoonfunctieOmschrijvingLike,
    gebruiksdoelWoonfunctieOmschrijvingNot,
    geconstateerd,
    geometrie,
    heeftDossierId,
    heeftDossierIdIn,
    heeftDossierIdIsnull,
    heeftDossierIdNot,
    heeftHoofdadresId,
    heeftHoofdadresIdIn,
    heeftHoofdadresIdIsnull,
    heeftHoofdadresIdNot,
    heeftHoofdadresIdentificatie,
    heeftHoofdadresIdentificatieIsempty,
    heeftHoofdadresIdentificatieIsnull,
    heeftHoofdadresIdentificatieLike,
    heeftHoofdadresIdentificatieNot,
    heeftHoofdadresVolgnummer,
    heeftNevenadres,
    heeftOnderzoeken,
    hoogsteBouwlaag,
    id,
    idIsempty,
    idIsnull,
    idLike,
    idNot,
    identificatie,
    identificatieIsempty,
    identificatieIsnull,
    identificatieLike,
    identificatieNot,
    indicatieWoningvoorraad,
    indicatieWoningvoorraadIsempty,
    indicatieWoningvoorraadIsnull,
    indicatieWoningvoorraadLike,
    indicatieWoningvoorraadNot,
    laagsteBouwlaag,
    ligtInBuurtId,
    ligtInBuurtIdIn,
    ligtInBuurtIdIsnull,
    ligtInBuurtIdNot,
    ligtInBuurtIdentificatie,
    ligtInBuurtIdentificatieIsempty,
    ligtInBuurtIdentificatieIsnull,
    ligtInBuurtIdentificatieLike,
    ligtInBuurtIdentificatieNot,
    ligtInBuurtVolgnummer,
    ligtInPanden,
    oppervlakte,
    page,
    redenafvoerCode,
    redenafvoerOmschrijving,
    redenafvoerOmschrijvingIsempty,
    redenafvoerOmschrijvingIsnull,
    redenafvoerOmschrijvingLike,
    redenafvoerOmschrijvingNot,
    redenopvoerCode,
    redenopvoerOmschrijving,
    redenopvoerOmschrijvingIsempty,
    redenopvoerOmschrijvingIsnull,
    redenopvoerOmschrijvingLike,
    redenopvoerOmschrijvingNot,
    registratiedatum,
    registratiedatumGt,
    registratiedatumGte,
    registratiedatumIsnull,
    registratiedatumLt,
    registratiedatumLte,
    registratiedatumNot,
    statusCode,
    statusOmschrijving,
    statusOmschrijvingIsempty,
    statusOmschrijvingIsnull,
    statusOmschrijvingLike,
    statusOmschrijvingNot,
    toegangCode,
    toegangCodeIsempty,
    toegangCodeIsnull,
    toegangCodeLike,
    toegangCodeNot,
    toegangOmschrijving,
    toegangOmschrijvingIsempty,
    toegangOmschrijvingIsnull,
    toegangOmschrijvingLike,
    toegangOmschrijvingNot,
    verdiepingToegang,
    volgnummer,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    aantalBouwlagen?: number
    aantalEenhedenComplex?: number
    aantalKamers?: number
    bagprocesCode?: number
    bagprocesOmschrijving?: string
    bagprocesOmschrijvingIsempty?: boolean
    bagprocesOmschrijvingIsnull?: boolean
    bagprocesOmschrijvingLike?: string
    bagprocesOmschrijvingNot?: string | null
    beginGeldigheid?: string
    beginGeldigheidGt?: string
    beginGeldigheidGte?: string
    beginGeldigheidIsnull?: boolean
    beginGeldigheidLt?: string
    beginGeldigheidLte?: string
    beginGeldigheidNot?: string | null
    cbsNummer?: string
    cbsNummerIsempty?: boolean
    cbsNummerIsnull?: boolean
    cbsNummerLike?: string
    cbsNummerNot?: string | null
    documentdatum?: string
    documentdatumGt?: string
    documentdatumGte?: string
    documentdatumIsnull?: boolean
    documentdatumLt?: string
    documentdatumLte?: string
    documentdatumNot?: string | null
    documentnummer?: string
    documentnummerIsempty?: boolean
    documentnummerIsnull?: boolean
    documentnummerLike?: string
    documentnummerNot?: string | null
    eigendomsverhoudingCode?: number
    eigendomsverhoudingOmschrijving?: string
    eigendomsverhoudingOmschrijvingIsempty?: boolean
    eigendomsverhoudingOmschrijvingIsnull?: boolean
    eigendomsverhoudingOmschrijvingLike?: string
    eigendomsverhoudingOmschrijvingNot?: string | null
    eindGeldigheid?: string
    eindGeldigheidGt?: string
    eindGeldigheidGte?: string
    eindGeldigheidIsnull?: boolean
    eindGeldigheidLt?: string
    eindGeldigheidLte?: string
    eindGeldigheidNot?: string | null
    feitelijkGebruikCode?: number
    feitelijkGebruikOmschrijving?: string
    feitelijkGebruikOmschrijvingIsempty?: boolean
    feitelijkGebruikOmschrijvingIsnull?: boolean
    feitelijkGebruikOmschrijvingLike?: string
    feitelijkGebruikOmschrijvingNot?: string | null
    financieringscodeCode?: number
    financieringscodeOmschrijving?: string
    financieringscodeOmschrijvingIsempty?: boolean
    financieringscodeOmschrijvingIsnull?: boolean
    financieringscodeOmschrijvingLike?: string
    financieringscodeOmschrijvingNot?: string | null
    gebruiksdoelCode?: string
    gebruiksdoelCodeIsempty?: string
    gebruiksdoelCodeIsnull?: string
    gebruiksdoelCodeLike?: string
    gebruiksdoelCodeNot?: string | null
    gebruiksdoelOmschrijving?: string
    gebruiksdoelOmschrijvingIsempty?: string
    gebruiksdoelOmschrijvingIsnull?: string
    gebruiksdoelOmschrijvingLike?: string
    gebruiksdoelOmschrijvingNot?: string | null
    gebruiksdoelGezondheidszorgfunctieCode?: number
    gebruiksdoelGezondheidszorgfunctieOmschrijving?: string
    gebruiksdoelGezondheidszorgfunctieOmschrijvingIsempty?: boolean
    gebruiksdoelGezondheidszorgfunctieOmschrijvingIsnull?: boolean
    gebruiksdoelGezondheidszorgfunctieOmschrijvingLike?: string
    gebruiksdoelGezondheidszorgfunctieOmschrijvingNot?: string | null
    gebruiksdoelWoonfunctieCode?: number
    gebruiksdoelWoonfunctieOmschrijving?: string
    gebruiksdoelWoonfunctieOmschrijvingIsempty?: boolean
    gebruiksdoelWoonfunctieOmschrijvingIsnull?: boolean
    gebruiksdoelWoonfunctieOmschrijvingLike?: string
    gebruiksdoelWoonfunctieOmschrijvingNot?: string | null
    geconstateerd?: boolean
    geometrie?: string
    heeftDossierId?: string | null
    heeftDossierIdIn?: (string | null)[]
    heeftDossierIdIsnull?: boolean
    heeftDossierIdNot?: string | null
    heeftHoofdadresId?: string | null
    heeftHoofdadresIdIn?: (string | null)[]
    heeftHoofdadresIdIsnull?: boolean
    heeftHoofdadresIdNot?: string | null
    heeftHoofdadresIdentificatie?: string
    heeftHoofdadresIdentificatieIsempty?: boolean
    heeftHoofdadresIdentificatieIsnull?: boolean
    heeftHoofdadresIdentificatieLike?: string
    heeftHoofdadresIdentificatieNot?: string | null
    heeftHoofdadresVolgnummer?: number
    heeftNevenadres?: string[]
    heeftOnderzoeken?: string[]
    hoogsteBouwlaag?: number
    id?: string
    idIsempty?: boolean
    idIsnull?: boolean
    idLike?: string
    idNot?: string
    identificatie?: string
    identificatieIsempty?: boolean
    identificatieIsnull?: boolean
    identificatieLike?: string
    identificatieNot?: string
    indicatieWoningvoorraad?: string
    indicatieWoningvoorraadIsempty?: boolean
    indicatieWoningvoorraadIsnull?: boolean
    indicatieWoningvoorraadLike?: string
    indicatieWoningvoorraadNot?: string | null
    laagsteBouwlaag?: number
    ligtInBuurtId?: string | null
    ligtInBuurtIdIn?: (string | null)[]
    ligtInBuurtIdIsnull?: boolean
    ligtInBuurtIdNot?: string | null
    ligtInBuurtIdentificatie?: string
    ligtInBuurtIdentificatieIsempty?: boolean
    ligtInBuurtIdentificatieIsnull?: boolean
    ligtInBuurtIdentificatieLike?: string
    ligtInBuurtIdentificatieNot?: string | null
    ligtInBuurtVolgnummer?: number
    ligtInPanden?: string[]
    oppervlakte?: number
    page?: number
    redenafvoerCode?: number
    redenafvoerOmschrijving?: string
    redenafvoerOmschrijvingIsempty?: boolean
    redenafvoerOmschrijvingIsnull?: boolean
    redenafvoerOmschrijvingLike?: string
    redenafvoerOmschrijvingNot?: string | null
    redenopvoerCode?: number
    redenopvoerOmschrijving?: string
    redenopvoerOmschrijvingIsempty?: boolean
    redenopvoerOmschrijvingIsnull?: boolean
    redenopvoerOmschrijvingLike?: string
    redenopvoerOmschrijvingNot?: string | null
    registratiedatum?: string
    registratiedatumGt?: string
    registratiedatumGte?: string
    registratiedatumIsnull?: boolean
    registratiedatumLt?: string
    registratiedatumLte?: string
    registratiedatumNot?: string | null
    statusCode?: number
    statusOmschrijving?: string
    statusOmschrijvingIsempty?: boolean
    statusOmschrijvingIsnull?: boolean
    statusOmschrijvingLike?: string
    statusOmschrijvingNot?: string | null
    toegangCode?: string
    toegangCodeIsempty?: string
    toegangCodeIsnull?: string
    toegangCodeLike?: string
    toegangCodeNot?: string | null
    toegangOmschrijving?: string
    toegangOmschrijvingIsempty?: string
    toegangOmschrijvingIsnull?: string
    toegangOmschrijvingLike?: string
    toegangOmschrijvingNot?: string | null
    verdiepingToegang?: number
    volgnummer?: number
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedBagverblijfsobjectenList
  }>(
    `/v1/bag/verblijfsobjecten/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        aantalBouwlagen,
        aantalEenhedenComplex,
        aantalKamers,
        bagprocesCode,
        bagprocesOmschrijving,
        'bagprocesOmschrijving[isempty]': bagprocesOmschrijvingIsempty,
        'bagprocesOmschrijving[isnull]': bagprocesOmschrijvingIsnull,
        'bagprocesOmschrijving[like]': bagprocesOmschrijvingLike,
        'bagprocesOmschrijving[not]': bagprocesOmschrijvingNot,
        beginGeldigheid,
        'beginGeldigheid[gt]': beginGeldigheidGt,
        'beginGeldigheid[gte]': beginGeldigheidGte,
        'beginGeldigheid[isnull]': beginGeldigheidIsnull,
        'beginGeldigheid[lt]': beginGeldigheidLt,
        'beginGeldigheid[lte]': beginGeldigheidLte,
        'beginGeldigheid[not]': beginGeldigheidNot,
        cbsNummer,
        'cbsNummer[isempty]': cbsNummerIsempty,
        'cbsNummer[isnull]': cbsNummerIsnull,
        'cbsNummer[like]': cbsNummerLike,
        'cbsNummer[not]': cbsNummerNot,
        documentdatum,
        'documentdatum[gt]': documentdatumGt,
        'documentdatum[gte]': documentdatumGte,
        'documentdatum[isnull]': documentdatumIsnull,
        'documentdatum[lt]': documentdatumLt,
        'documentdatum[lte]': documentdatumLte,
        'documentdatum[not]': documentdatumNot,
        documentnummer,
        'documentnummer[isempty]': documentnummerIsempty,
        'documentnummer[isnull]': documentnummerIsnull,
        'documentnummer[like]': documentnummerLike,
        'documentnummer[not]': documentnummerNot,
        eigendomsverhoudingCode,
        eigendomsverhoudingOmschrijving,
        'eigendomsverhoudingOmschrijving[isempty]': eigendomsverhoudingOmschrijvingIsempty,
        'eigendomsverhoudingOmschrijving[isnull]': eigendomsverhoudingOmschrijvingIsnull,
        'eigendomsverhoudingOmschrijving[like]': eigendomsverhoudingOmschrijvingLike,
        'eigendomsverhoudingOmschrijving[not]': eigendomsverhoudingOmschrijvingNot,
        eindGeldigheid,
        'eindGeldigheid[gt]': eindGeldigheidGt,
        'eindGeldigheid[gte]': eindGeldigheidGte,
        'eindGeldigheid[isnull]': eindGeldigheidIsnull,
        'eindGeldigheid[lt]': eindGeldigheidLt,
        'eindGeldigheid[lte]': eindGeldigheidLte,
        'eindGeldigheid[not]': eindGeldigheidNot,
        feitelijkGebruikCode,
        feitelijkGebruikOmschrijving,
        'feitelijkGebruikOmschrijving[isempty]': feitelijkGebruikOmschrijvingIsempty,
        'feitelijkGebruikOmschrijving[isnull]': feitelijkGebruikOmschrijvingIsnull,
        'feitelijkGebruikOmschrijving[like]': feitelijkGebruikOmschrijvingLike,
        'feitelijkGebruikOmschrijving[not]': feitelijkGebruikOmschrijvingNot,
        financieringscodeCode,
        financieringscodeOmschrijving,
        'financieringscodeOmschrijving[isempty]': financieringscodeOmschrijvingIsempty,
        'financieringscodeOmschrijving[isnull]': financieringscodeOmschrijvingIsnull,
        'financieringscodeOmschrijving[like]': financieringscodeOmschrijvingLike,
        'financieringscodeOmschrijving[not]': financieringscodeOmschrijvingNot,
        'gebruiksdoel.code': gebruiksdoelCode,
        'gebruiksdoel.code[isempty]': gebruiksdoelCodeIsempty,
        'gebruiksdoel.code[isnull]': gebruiksdoelCodeIsnull,
        'gebruiksdoel.code[like]': gebruiksdoelCodeLike,
        'gebruiksdoel.code[not]': gebruiksdoelCodeNot,
        'gebruiksdoel.omschrijving': gebruiksdoelOmschrijving,
        'gebruiksdoel.omschrijving[isempty]': gebruiksdoelOmschrijvingIsempty,
        'gebruiksdoel.omschrijving[isnull]': gebruiksdoelOmschrijvingIsnull,
        'gebruiksdoel.omschrijving[like]': gebruiksdoelOmschrijvingLike,
        'gebruiksdoel.omschrijving[not]': gebruiksdoelOmschrijvingNot,
        gebruiksdoelGezondheidszorgfunctieCode,
        gebruiksdoelGezondheidszorgfunctieOmschrijving,
        'gebruiksdoelGezondheidszorgfunctieOmschrijving[isempty]':
          gebruiksdoelGezondheidszorgfunctieOmschrijvingIsempty,
        'gebruiksdoelGezondheidszorgfunctieOmschrijving[isnull]':
          gebruiksdoelGezondheidszorgfunctieOmschrijvingIsnull,
        'gebruiksdoelGezondheidszorgfunctieOmschrijving[like]':
          gebruiksdoelGezondheidszorgfunctieOmschrijvingLike,
        'gebruiksdoelGezondheidszorgfunctieOmschrijving[not]':
          gebruiksdoelGezondheidszorgfunctieOmschrijvingNot,
        gebruiksdoelWoonfunctieCode,
        gebruiksdoelWoonfunctieOmschrijving,
        'gebruiksdoelWoonfunctieOmschrijving[isempty]': gebruiksdoelWoonfunctieOmschrijvingIsempty,
        'gebruiksdoelWoonfunctieOmschrijving[isnull]': gebruiksdoelWoonfunctieOmschrijvingIsnull,
        'gebruiksdoelWoonfunctieOmschrijving[like]': gebruiksdoelWoonfunctieOmschrijvingLike,
        'gebruiksdoelWoonfunctieOmschrijving[not]': gebruiksdoelWoonfunctieOmschrijvingNot,
        geconstateerd,
        geometrie,
        heeftDossierId,
        'heeftDossierId[in]': heeftDossierIdIn,
        'heeftDossierId[isnull]': heeftDossierIdIsnull,
        'heeftDossierId[not]': heeftDossierIdNot,
        heeftHoofdadresId,
        'heeftHoofdadresId[in]': heeftHoofdadresIdIn,
        'heeftHoofdadresId[isnull]': heeftHoofdadresIdIsnull,
        'heeftHoofdadresId[not]': heeftHoofdadresIdNot,
        heeftHoofdadresIdentificatie,
        'heeftHoofdadresIdentificatie[isempty]': heeftHoofdadresIdentificatieIsempty,
        'heeftHoofdadresIdentificatie[isnull]': heeftHoofdadresIdentificatieIsnull,
        'heeftHoofdadresIdentificatie[like]': heeftHoofdadresIdentificatieLike,
        'heeftHoofdadresIdentificatie[not]': heeftHoofdadresIdentificatieNot,
        heeftHoofdadresVolgnummer,
        hoogsteBouwlaag,
        id,
        'id[isempty]': idIsempty,
        'id[isnull]': idIsnull,
        'id[like]': idLike,
        'id[not]': idNot,
        identificatie,
        'identificatie[isempty]': identificatieIsempty,
        'identificatie[isnull]': identificatieIsnull,
        'identificatie[like]': identificatieLike,
        'identificatie[not]': identificatieNot,
        indicatieWoningvoorraad,
        'indicatieWoningvoorraad[isempty]': indicatieWoningvoorraadIsempty,
        'indicatieWoningvoorraad[isnull]': indicatieWoningvoorraadIsnull,
        'indicatieWoningvoorraad[like]': indicatieWoningvoorraadLike,
        'indicatieWoningvoorraad[not]': indicatieWoningvoorraadNot,
        laagsteBouwlaag,
        ligtInBuurtId,
        'ligtInBuurtId[in]': ligtInBuurtIdIn,
        'ligtInBuurtId[isnull]': ligtInBuurtIdIsnull,
        'ligtInBuurtId[not]': ligtInBuurtIdNot,
        ligtInBuurtIdentificatie,
        'ligtInBuurtIdentificatie[isempty]': ligtInBuurtIdentificatieIsempty,
        'ligtInBuurtIdentificatie[isnull]': ligtInBuurtIdentificatieIsnull,
        'ligtInBuurtIdentificatie[like]': ligtInBuurtIdentificatieLike,
        'ligtInBuurtIdentificatie[not]': ligtInBuurtIdentificatieNot,
        ligtInBuurtVolgnummer,
        oppervlakte,
        page,
        redenafvoerCode,
        redenafvoerOmschrijving,
        'redenafvoerOmschrijving[isempty]': redenafvoerOmschrijvingIsempty,
        'redenafvoerOmschrijving[isnull]': redenafvoerOmschrijvingIsnull,
        'redenafvoerOmschrijving[like]': redenafvoerOmschrijvingLike,
        'redenafvoerOmschrijving[not]': redenafvoerOmschrijvingNot,
        redenopvoerCode,
        redenopvoerOmschrijving,
        'redenopvoerOmschrijving[isempty]': redenopvoerOmschrijvingIsempty,
        'redenopvoerOmschrijving[isnull]': redenopvoerOmschrijvingIsnull,
        'redenopvoerOmschrijving[like]': redenopvoerOmschrijvingLike,
        'redenopvoerOmschrijving[not]': redenopvoerOmschrijvingNot,
        registratiedatum,
        'registratiedatum[gt]': registratiedatumGt,
        'registratiedatum[gte]': registratiedatumGte,
        'registratiedatum[isnull]': registratiedatumIsnull,
        'registratiedatum[lt]': registratiedatumLt,
        'registratiedatum[lte]': registratiedatumLte,
        'registratiedatum[not]': registratiedatumNot,
        statusCode,
        statusOmschrijving,
        'statusOmschrijving[isempty]': statusOmschrijvingIsempty,
        'statusOmschrijving[isnull]': statusOmschrijvingIsnull,
        'statusOmschrijving[like]': statusOmschrijvingLike,
        'statusOmschrijving[not]': statusOmschrijvingNot,
        'toegang.code': toegangCode,
        'toegang.code[isempty]': toegangCodeIsempty,
        'toegang.code[isnull]': toegangCodeIsnull,
        'toegang.code[like]': toegangCodeLike,
        'toegang.code[not]': toegangCodeNot,
        'toegang.omschrijving': toegangOmschrijving,
        'toegang.omschrijving[isempty]': toegangOmschrijvingIsempty,
        'toegang.omschrijving[isnull]': toegangOmschrijvingIsnull,
        'toegang.omschrijving[like]': toegangOmschrijvingLike,
        'toegang.omschrijving[not]': toegangOmschrijvingNot,
        verdiepingToegang,
        volgnummer,
      }),
      QS.explode({
        heeftNevenadres,
        heeftOnderzoeken,
        ligtInPanden,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagVerblijfsobjectenRetrieve(
  id: string,
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: Bagverblijfsobjecten
  }>(
    `/v1/bag/verblijfsobjecten/${id}/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagWoonplaatsenList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    bagprocesCode,
    bagprocesOmschrijving,
    bagprocesOmschrijvingIsempty,
    bagprocesOmschrijvingIsnull,
    bagprocesOmschrijvingLike,
    bagprocesOmschrijvingNot,
    beginGeldigheid,
    beginGeldigheidGt,
    beginGeldigheidGte,
    beginGeldigheidIsnull,
    beginGeldigheidLt,
    beginGeldigheidLte,
    beginGeldigheidNot,
    documentdatum,
    documentdatumGt,
    documentdatumGte,
    documentdatumIsnull,
    documentdatumLt,
    documentdatumLte,
    documentdatumNot,
    documentnummer,
    documentnummerIsempty,
    documentnummerIsnull,
    documentnummerLike,
    documentnummerNot,
    eindGeldigheid,
    eindGeldigheidGt,
    eindGeldigheidGte,
    eindGeldigheidIsnull,
    eindGeldigheidLt,
    eindGeldigheidLte,
    eindGeldigheidNot,
    geconstateerd,
    geconstateerdIsempty,
    geconstateerdIsnull,
    geconstateerdLike,
    geconstateerdNot,
    geometrie,
    heeftDossierId,
    heeftDossierIdIn,
    heeftDossierIdIsnull,
    heeftDossierIdNot,
    heeftOnderzoeken,
    id,
    idIsempty,
    idIsnull,
    idLike,
    idNot,
    identificatie,
    identificatieIsempty,
    identificatieIsnull,
    identificatieLike,
    identificatieNot,
    ligtInGemeenteId,
    ligtInGemeenteIdIn,
    ligtInGemeenteIdIsnull,
    ligtInGemeenteIdNot,
    naam,
    naamIsempty,
    naamIsnull,
    naamLike,
    naamNot,
    page,
    registratiedatum,
    registratiedatumGt,
    registratiedatumGte,
    registratiedatumIsnull,
    registratiedatumLt,
    registratiedatumLte,
    registratiedatumNot,
    statusCode,
    statusOmschrijving,
    statusOmschrijvingIsempty,
    statusOmschrijvingIsnull,
    statusOmschrijvingLike,
    statusOmschrijvingNot,
    volgnummer,
    woonplaatsPtt,
    woonplaatsPttIsempty,
    woonplaatsPttIsnull,
    woonplaatsPttLike,
    woonplaatsPttNot,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    bagprocesCode?: number
    bagprocesOmschrijving?: string
    bagprocesOmschrijvingIsempty?: boolean
    bagprocesOmschrijvingIsnull?: boolean
    bagprocesOmschrijvingLike?: string
    bagprocesOmschrijvingNot?: string | null
    beginGeldigheid?: string
    beginGeldigheidGt?: string
    beginGeldigheidGte?: string
    beginGeldigheidIsnull?: boolean
    beginGeldigheidLt?: string
    beginGeldigheidLte?: string
    beginGeldigheidNot?: string | null
    documentdatum?: string
    documentdatumGt?: string
    documentdatumGte?: string
    documentdatumIsnull?: boolean
    documentdatumLt?: string
    documentdatumLte?: string
    documentdatumNot?: string | null
    documentnummer?: string
    documentnummerIsempty?: boolean
    documentnummerIsnull?: boolean
    documentnummerLike?: string
    documentnummerNot?: string | null
    eindGeldigheid?: string
    eindGeldigheidGt?: string
    eindGeldigheidGte?: string
    eindGeldigheidIsnull?: boolean
    eindGeldigheidLt?: string
    eindGeldigheidLte?: string
    eindGeldigheidNot?: string | null
    geconstateerd?: string
    geconstateerdIsempty?: boolean
    geconstateerdIsnull?: boolean
    geconstateerdLike?: string
    geconstateerdNot?: string | null
    geometrie?: string
    heeftDossierId?: string | null
    heeftDossierIdIn?: (string | null)[]
    heeftDossierIdIsnull?: boolean
    heeftDossierIdNot?: string | null
    heeftOnderzoeken?: string[]
    id?: string
    idIsempty?: boolean
    idIsnull?: boolean
    idLike?: string
    idNot?: string
    identificatie?: string
    identificatieIsempty?: boolean
    identificatieIsnull?: boolean
    identificatieLike?: string
    identificatieNot?: string
    ligtInGemeenteId?: string | null
    ligtInGemeenteIdIn?: (string | null)[]
    ligtInGemeenteIdIsnull?: boolean
    ligtInGemeenteIdNot?: string | null
    naam?: string
    naamIsempty?: boolean
    naamIsnull?: boolean
    naamLike?: string
    naamNot?: string | null
    page?: number
    registratiedatum?: string
    registratiedatumGt?: string
    registratiedatumGte?: string
    registratiedatumIsnull?: boolean
    registratiedatumLt?: string
    registratiedatumLte?: string
    registratiedatumNot?: string | null
    statusCode?: number
    statusOmschrijving?: string
    statusOmschrijvingIsempty?: boolean
    statusOmschrijvingIsnull?: boolean
    statusOmschrijvingLike?: string
    statusOmschrijvingNot?: string | null
    volgnummer?: number
    woonplaatsPtt?: string
    woonplaatsPttIsempty?: boolean
    woonplaatsPttIsnull?: boolean
    woonplaatsPttLike?: string
    woonplaatsPttNot?: string | null
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedBagwoonplaatsenList
  }>(
    `/v1/bag/woonplaatsen/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        bagprocesCode,
        bagprocesOmschrijving,
        'bagprocesOmschrijving[isempty]': bagprocesOmschrijvingIsempty,
        'bagprocesOmschrijving[isnull]': bagprocesOmschrijvingIsnull,
        'bagprocesOmschrijving[like]': bagprocesOmschrijvingLike,
        'bagprocesOmschrijving[not]': bagprocesOmschrijvingNot,
        beginGeldigheid,
        'beginGeldigheid[gt]': beginGeldigheidGt,
        'beginGeldigheid[gte]': beginGeldigheidGte,
        'beginGeldigheid[isnull]': beginGeldigheidIsnull,
        'beginGeldigheid[lt]': beginGeldigheidLt,
        'beginGeldigheid[lte]': beginGeldigheidLte,
        'beginGeldigheid[not]': beginGeldigheidNot,
        documentdatum,
        'documentdatum[gt]': documentdatumGt,
        'documentdatum[gte]': documentdatumGte,
        'documentdatum[isnull]': documentdatumIsnull,
        'documentdatum[lt]': documentdatumLt,
        'documentdatum[lte]': documentdatumLte,
        'documentdatum[not]': documentdatumNot,
        documentnummer,
        'documentnummer[isempty]': documentnummerIsempty,
        'documentnummer[isnull]': documentnummerIsnull,
        'documentnummer[like]': documentnummerLike,
        'documentnummer[not]': documentnummerNot,
        eindGeldigheid,
        'eindGeldigheid[gt]': eindGeldigheidGt,
        'eindGeldigheid[gte]': eindGeldigheidGte,
        'eindGeldigheid[isnull]': eindGeldigheidIsnull,
        'eindGeldigheid[lt]': eindGeldigheidLt,
        'eindGeldigheid[lte]': eindGeldigheidLte,
        'eindGeldigheid[not]': eindGeldigheidNot,
        geconstateerd,
        'geconstateerd[isempty]': geconstateerdIsempty,
        'geconstateerd[isnull]': geconstateerdIsnull,
        'geconstateerd[like]': geconstateerdLike,
        'geconstateerd[not]': geconstateerdNot,
        geometrie,
        heeftDossierId,
        'heeftDossierId[in]': heeftDossierIdIn,
        'heeftDossierId[isnull]': heeftDossierIdIsnull,
        'heeftDossierId[not]': heeftDossierIdNot,
        id,
        'id[isempty]': idIsempty,
        'id[isnull]': idIsnull,
        'id[like]': idLike,
        'id[not]': idNot,
        identificatie,
        'identificatie[isempty]': identificatieIsempty,
        'identificatie[isnull]': identificatieIsnull,
        'identificatie[like]': identificatieLike,
        'identificatie[not]': identificatieNot,
        ligtInGemeenteId,
        'ligtInGemeenteId[in]': ligtInGemeenteIdIn,
        'ligtInGemeenteId[isnull]': ligtInGemeenteIdIsnull,
        'ligtInGemeenteId[not]': ligtInGemeenteIdNot,
        naam,
        'naam[isempty]': naamIsempty,
        'naam[isnull]': naamIsnull,
        'naam[like]': naamLike,
        'naam[not]': naamNot,
        page,
        registratiedatum,
        'registratiedatum[gt]': registratiedatumGt,
        'registratiedatum[gte]': registratiedatumGte,
        'registratiedatum[isnull]': registratiedatumIsnull,
        'registratiedatum[lt]': registratiedatumLt,
        'registratiedatum[lte]': registratiedatumLte,
        'registratiedatum[not]': registratiedatumNot,
        statusCode,
        statusOmschrijving,
        'statusOmschrijving[isempty]': statusOmschrijvingIsempty,
        'statusOmschrijving[isnull]': statusOmschrijvingIsnull,
        'statusOmschrijving[like]': statusOmschrijvingLike,
        'statusOmschrijving[not]': statusOmschrijvingNot,
        volgnummer,
        woonplaatsPtt,
        'woonplaatsPtt[isempty]': woonplaatsPttIsempty,
        'woonplaatsPtt[isnull]': woonplaatsPttIsnull,
        'woonplaatsPtt[like]': woonplaatsPttLike,
        'woonplaatsPtt[not]': woonplaatsPttNot,
      }),
      QS.explode({
        heeftOnderzoeken,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
export function bagWoonplaatsenRetrieve(
  id: string,
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: Bagwoonplaatsen
  }>(
    `/v1/bag/woonplaatsen/${id}/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
      }),
    )}`,
    {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        'Accept-Crs': acceptCrs,
        'Content-Crs': contentCrs,
      },
    },
  )
}
