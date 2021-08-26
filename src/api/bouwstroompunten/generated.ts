/**
 * Bouwstroompunten
 * 1.0.0
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
export interface BouwstroompuntenbouwstroompuntenLinks {
  schema: string
  self?: SelfLink
}
export interface Geometry {
  type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'
}
export type Point3D = number[]
export type Point = Geometry & {
  coordinates?: Point3D
}
export interface Bouwstroompuntenbouwstroompunten {
  _links: BouwstroompuntenbouwstroompuntenLinks
  id: string
  bouwstroompuntId?: string | null
  geometry?: Point
  provincie?: string | null
  capaciteit?: string | null
  locatie?: string | null
  beschikbareAansluitingen?: string[] | null
  postcode?: string | null
  straat?: string | null
  huisnummer?: string | null
  plaats?: string | null
  vergunningsplichtig?: boolean | null
  contactPersoon?: string | null
  organisatie?: string | null
  gemeente?: string | null
  email?: string | null
  datumtijdAangemaakt?: string | null
  toegangswijze?: string | null
  primaireFunctie?: string | null
  minimaleGebruikscapaciteit?: string | null
  afbeelding?: string | null
  contactnummerBijMeldenStoring?: string | null
}
export interface PaginatedBouwstroompuntenbouwstroompuntenList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Bouwstroompuntenbouwstroompunten[]
}
export function bouwstroompuntenBouwstroompuntenList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    afbeelding,
    afbeeldingIsempty,
    afbeeldingIsnull,
    afbeeldingLike,
    afbeeldingNot,
    beschikbareAansluitingenContains,
    bouwstroompuntId,
    bouwstroompuntIdIsempty,
    bouwstroompuntIdIsnull,
    bouwstroompuntIdLike,
    bouwstroompuntIdNot,
    capaciteit,
    capaciteitIsempty,
    capaciteitIsnull,
    capaciteitLike,
    capaciteitNot,
    contactPersoon,
    contactPersoonIsempty,
    contactPersoonIsnull,
    contactPersoonLike,
    contactPersoonNot,
    contactnummerBijMeldenStoring,
    contactnummerBijMeldenStoringIsempty,
    contactnummerBijMeldenStoringIsnull,
    contactnummerBijMeldenStoringLike,
    contactnummerBijMeldenStoringNot,
    datumtijdAangemaakt,
    datumtijdAangemaaktGt,
    datumtijdAangemaaktGte,
    datumtijdAangemaaktIsnull,
    datumtijdAangemaaktLt,
    datumtijdAangemaaktLte,
    datumtijdAangemaaktNot,
    email,
    emailIsempty,
    emailIsnull,
    emailLike,
    emailNot,
    gemeente,
    gemeenteIsempty,
    gemeenteIsnull,
    gemeenteLike,
    gemeenteNot,
    geometry,
    huisnummer,
    huisnummerIsempty,
    huisnummerIsnull,
    huisnummerLike,
    huisnummerNot,
    id,
    idIsempty,
    idIsnull,
    idLike,
    idNot,
    locatie,
    locatieIsempty,
    locatieIsnull,
    locatieLike,
    locatieNot,
    minimaleGebruikscapaciteit,
    minimaleGebruikscapaciteitIsempty,
    minimaleGebruikscapaciteitIsnull,
    minimaleGebruikscapaciteitLike,
    minimaleGebruikscapaciteitNot,
    organisatie,
    organisatieIsempty,
    organisatieIsnull,
    organisatieLike,
    organisatieNot,
    page,
    plaats,
    plaatsIsempty,
    plaatsIsnull,
    plaatsLike,
    plaatsNot,
    postcode,
    postcodeIsempty,
    postcodeIsnull,
    postcodeLike,
    postcodeNot,
    primaireFunctie,
    primaireFunctieIsempty,
    primaireFunctieIsnull,
    primaireFunctieLike,
    primaireFunctieNot,
    provincie,
    provincieIsempty,
    provincieIsnull,
    provincieLike,
    provincieNot,
    straat,
    straatIsempty,
    straatIsnull,
    straatLike,
    straatNot,
    toegangswijze,
    toegangswijzeIsempty,
    toegangswijzeIsnull,
    toegangswijzeLike,
    toegangswijzeNot,
    vergunningsplichtig,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    afbeelding?: string
    afbeeldingIsempty?: boolean
    afbeeldingIsnull?: boolean
    afbeeldingLike?: string
    afbeeldingNot?: string | null
    beschikbareAansluitingenContains?: string[]
    bouwstroompuntId?: string
    bouwstroompuntIdIsempty?: boolean
    bouwstroompuntIdIsnull?: boolean
    bouwstroompuntIdLike?: string
    bouwstroompuntIdNot?: string | null
    capaciteit?: string
    capaciteitIsempty?: boolean
    capaciteitIsnull?: boolean
    capaciteitLike?: string
    capaciteitNot?: string | null
    contactPersoon?: string
    contactPersoonIsempty?: boolean
    contactPersoonIsnull?: boolean
    contactPersoonLike?: string
    contactPersoonNot?: string | null
    contactnummerBijMeldenStoring?: string
    contactnummerBijMeldenStoringIsempty?: boolean
    contactnummerBijMeldenStoringIsnull?: boolean
    contactnummerBijMeldenStoringLike?: string
    contactnummerBijMeldenStoringNot?: string | null
    datumtijdAangemaakt?: string
    datumtijdAangemaaktGt?: string
    datumtijdAangemaaktGte?: string
    datumtijdAangemaaktIsnull?: boolean
    datumtijdAangemaaktLt?: string
    datumtijdAangemaaktLte?: string
    datumtijdAangemaaktNot?: string | null
    email?: string
    emailIsempty?: boolean
    emailIsnull?: boolean
    emailLike?: string
    emailNot?: string | null
    gemeente?: string
    gemeenteIsempty?: boolean
    gemeenteIsnull?: boolean
    gemeenteLike?: string
    gemeenteNot?: string | null
    geometry?: string
    huisnummer?: string
    huisnummerIsempty?: boolean
    huisnummerIsnull?: boolean
    huisnummerLike?: string
    huisnummerNot?: string | null
    id?: string
    idIsempty?: boolean
    idIsnull?: boolean
    idLike?: string
    idNot?: string
    locatie?: string
    locatieIsempty?: boolean
    locatieIsnull?: boolean
    locatieLike?: string
    locatieNot?: string | null
    minimaleGebruikscapaciteit?: string
    minimaleGebruikscapaciteitIsempty?: boolean
    minimaleGebruikscapaciteitIsnull?: boolean
    minimaleGebruikscapaciteitLike?: string
    minimaleGebruikscapaciteitNot?: string | null
    organisatie?: string
    organisatieIsempty?: boolean
    organisatieIsnull?: boolean
    organisatieLike?: string
    organisatieNot?: string | null
    page?: number
    plaats?: string
    plaatsIsempty?: boolean
    plaatsIsnull?: boolean
    plaatsLike?: string
    plaatsNot?: string | null
    postcode?: string
    postcodeIsempty?: boolean
    postcodeIsnull?: boolean
    postcodeLike?: string
    postcodeNot?: string | null
    primaireFunctie?: string
    primaireFunctieIsempty?: boolean
    primaireFunctieIsnull?: boolean
    primaireFunctieLike?: string
    primaireFunctieNot?: string | null
    provincie?: string
    provincieIsempty?: boolean
    provincieIsnull?: boolean
    provincieLike?: string
    provincieNot?: string | null
    straat?: string
    straatIsempty?: boolean
    straatIsnull?: boolean
    straatLike?: string
    straatNot?: string | null
    toegangswijze?: string
    toegangswijzeIsempty?: boolean
    toegangswijzeIsnull?: boolean
    toegangswijzeLike?: string
    toegangswijzeNot?: string | null
    vergunningsplichtig?: boolean
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedBouwstroompuntenbouwstroompuntenList
  }>(
    `/v1/bouwstroompunten/bouwstroompunten/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        afbeelding,
        'afbeelding[isempty]': afbeeldingIsempty,
        'afbeelding[isnull]': afbeeldingIsnull,
        'afbeelding[like]': afbeeldingLike,
        'afbeelding[not]': afbeeldingNot,
        'beschikbareAansluitingen[contains]': beschikbareAansluitingenContains,
        bouwstroompuntId,
        'bouwstroompuntId[isempty]': bouwstroompuntIdIsempty,
        'bouwstroompuntId[isnull]': bouwstroompuntIdIsnull,
        'bouwstroompuntId[like]': bouwstroompuntIdLike,
        'bouwstroompuntId[not]': bouwstroompuntIdNot,
        capaciteit,
        'capaciteit[isempty]': capaciteitIsempty,
        'capaciteit[isnull]': capaciteitIsnull,
        'capaciteit[like]': capaciteitLike,
        'capaciteit[not]': capaciteitNot,
        contactPersoon,
        'contactPersoon[isempty]': contactPersoonIsempty,
        'contactPersoon[isnull]': contactPersoonIsnull,
        'contactPersoon[like]': contactPersoonLike,
        'contactPersoon[not]': contactPersoonNot,
        contactnummerBijMeldenStoring,
        'contactnummerBijMeldenStoring[isempty]': contactnummerBijMeldenStoringIsempty,
        'contactnummerBijMeldenStoring[isnull]': contactnummerBijMeldenStoringIsnull,
        'contactnummerBijMeldenStoring[like]': contactnummerBijMeldenStoringLike,
        'contactnummerBijMeldenStoring[not]': contactnummerBijMeldenStoringNot,
        datumtijdAangemaakt,
        'datumtijdAangemaakt[gt]': datumtijdAangemaaktGt,
        'datumtijdAangemaakt[gte]': datumtijdAangemaaktGte,
        'datumtijdAangemaakt[isnull]': datumtijdAangemaaktIsnull,
        'datumtijdAangemaakt[lt]': datumtijdAangemaaktLt,
        'datumtijdAangemaakt[lte]': datumtijdAangemaaktLte,
        'datumtijdAangemaakt[not]': datumtijdAangemaaktNot,
        email,
        'email[isempty]': emailIsempty,
        'email[isnull]': emailIsnull,
        'email[like]': emailLike,
        'email[not]': emailNot,
        gemeente,
        'gemeente[isempty]': gemeenteIsempty,
        'gemeente[isnull]': gemeenteIsnull,
        'gemeente[like]': gemeenteLike,
        'gemeente[not]': gemeenteNot,
        geometry,
        huisnummer,
        'huisnummer[isempty]': huisnummerIsempty,
        'huisnummer[isnull]': huisnummerIsnull,
        'huisnummer[like]': huisnummerLike,
        'huisnummer[not]': huisnummerNot,
        id,
        'id[isempty]': idIsempty,
        'id[isnull]': idIsnull,
        'id[like]': idLike,
        'id[not]': idNot,
        locatie,
        'locatie[isempty]': locatieIsempty,
        'locatie[isnull]': locatieIsnull,
        'locatie[like]': locatieLike,
        'locatie[not]': locatieNot,
        minimaleGebruikscapaciteit,
        'minimaleGebruikscapaciteit[isempty]': minimaleGebruikscapaciteitIsempty,
        'minimaleGebruikscapaciteit[isnull]': minimaleGebruikscapaciteitIsnull,
        'minimaleGebruikscapaciteit[like]': minimaleGebruikscapaciteitLike,
        'minimaleGebruikscapaciteit[not]': minimaleGebruikscapaciteitNot,
        organisatie,
        'organisatie[isempty]': organisatieIsempty,
        'organisatie[isnull]': organisatieIsnull,
        'organisatie[like]': organisatieLike,
        'organisatie[not]': organisatieNot,
        page,
        plaats,
        'plaats[isempty]': plaatsIsempty,
        'plaats[isnull]': plaatsIsnull,
        'plaats[like]': plaatsLike,
        'plaats[not]': plaatsNot,
        postcode,
        'postcode[isempty]': postcodeIsempty,
        'postcode[isnull]': postcodeIsnull,
        'postcode[like]': postcodeLike,
        'postcode[not]': postcodeNot,
        primaireFunctie,
        'primaireFunctie[isempty]': primaireFunctieIsempty,
        'primaireFunctie[isnull]': primaireFunctieIsnull,
        'primaireFunctie[like]': primaireFunctieLike,
        'primaireFunctie[not]': primaireFunctieNot,
        provincie,
        'provincie[isempty]': provincieIsempty,
        'provincie[isnull]': provincieIsnull,
        'provincie[like]': provincieLike,
        'provincie[not]': provincieNot,
        straat,
        'straat[isempty]': straatIsempty,
        'straat[isnull]': straatIsnull,
        'straat[like]': straatLike,
        'straat[not]': straatNot,
        toegangswijze,
        'toegangswijze[isempty]': toegangswijzeIsempty,
        'toegangswijze[isnull]': toegangswijzeIsnull,
        'toegangswijze[like]': toegangswijzeLike,
        'toegangswijze[not]': toegangswijzeNot,
        vergunningsplichtig,
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
export function bouwstroompuntenBouwstroompuntenRetrieve(
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
    data: Bouwstroompuntenbouwstroompunten
  }>(
    `/v1/bouwstroompunten/bouwstroompunten/${id}/${QS.query(
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
