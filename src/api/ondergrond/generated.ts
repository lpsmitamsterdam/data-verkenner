/**
 * Ondergrond
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
export interface OndergrondhistorischeonderzoekenLinks {
  schema: string
  self?: SelfLink
}
export interface Geometry {
  type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'
}
export type Point3D = number[]
export type MultiPolygon = Geometry & {
  coordinates?: Point3D[][][]
}
export interface Ondergrondhistorischeonderzoeken {
  _links: OndergrondhistorischeonderzoekenLinks
  id: number
  geometrie?: MultiPolygon
  permalink?: string | null
  naamRapport?: string | null
  beschrijving?: string | null
  datumRapport?: string | null
  nummerRapport?: string | null
  opdrachtgever?: string | null
  opdrachtnemer?: string | null
  typeOnderzoek?: string | null
  locatieOfAdres?: string | null
  indicatieKwaliteit?: string | null
}
export interface PaginatedOndergrondhistorischeonderzoekenList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Ondergrondhistorischeonderzoeken[]
}
/**
 * Uitgevoerde onderzoeken naar bijvoorbeeld Archeologische verwachtingen (A), Bodemkwaliteit (B), Conventionele explosieven (C) kademuren Dateren (D) en Ondergrondse Obstakels (OO).
 */
export function ondergrondHistorischeonderzoekenList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    auteurRapport,
    auteurRapportIsempty,
    auteurRapportIsnull,
    auteurRapportLike,
    auteurRapportNot,
    beschrijving,
    beschrijvingIsempty,
    beschrijvingIsnull,
    beschrijvingLike,
    beschrijvingNot,
    datumRapport,
    datumRapportGt,
    datumRapportGte,
    datumRapportIsnull,
    datumRapportLt,
    datumRapportLte,
    datumRapportNot,
    geometrie,
    geometrieContains,
    geometrieIsnull,
    geometrieNot,
    id,
    indicatieKwaliteit,
    indicatieKwaliteitIsempty,
    indicatieKwaliteitIsnull,
    indicatieKwaliteitLike,
    indicatieKwaliteitNot,
    locatieOfAdres,
    locatieOfAdresIsempty,
    locatieOfAdresIsnull,
    locatieOfAdresLike,
    locatieOfAdresNot,
    naamRapport,
    naamRapportIsempty,
    naamRapportIsnull,
    naamRapportLike,
    naamRapportNot,
    nummerRapport,
    nummerRapportIsempty,
    nummerRapportIsnull,
    nummerRapportLike,
    nummerRapportNot,
    opdrachtgever,
    opdrachtgeverIsempty,
    opdrachtgeverIsnull,
    opdrachtgeverLike,
    opdrachtgeverNot,
    opdrachtnemer,
    opdrachtnemerIsempty,
    opdrachtnemerIsnull,
    opdrachtnemerLike,
    opdrachtnemerNot,
    page,
    permalink,
    permalinkIsempty,
    permalinkIsnull,
    permalinkLike,
    permalinkNot,
    typeOnderzoek,
    typeOnderzoekIsempty,
    typeOnderzoekIsnull,
    typeOnderzoekLike,
    typeOnderzoekNot,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    auteurRapport?: string
    auteurRapportIsempty?: boolean
    auteurRapportIsnull?: boolean
    auteurRapportLike?: string
    auteurRapportNot?: string | null
    beschrijving?: string
    beschrijvingIsempty?: boolean
    beschrijvingIsnull?: boolean
    beschrijvingLike?: string
    beschrijvingNot?: string | null
    datumRapport?: string
    datumRapportGt?: string
    datumRapportGte?: string
    datumRapportIsnull?: boolean
    datumRapportLt?: string
    datumRapportLte?: string
    datumRapportNot?: string | null
    geometrie?: string
    geometrieContains?: string
    geometrieIsnull?: boolean
    geometrieNot?: string
    id?: number
    indicatieKwaliteit?: string
    indicatieKwaliteitIsempty?: boolean
    indicatieKwaliteitIsnull?: boolean
    indicatieKwaliteitLike?: string
    indicatieKwaliteitNot?: string | null
    locatieOfAdres?: string
    locatieOfAdresIsempty?: boolean
    locatieOfAdresIsnull?: boolean
    locatieOfAdresLike?: string
    locatieOfAdresNot?: string | null
    naamRapport?: string
    naamRapportIsempty?: boolean
    naamRapportIsnull?: boolean
    naamRapportLike?: string
    naamRapportNot?: string | null
    nummerRapport?: string
    nummerRapportIsempty?: boolean
    nummerRapportIsnull?: boolean
    nummerRapportLike?: string
    nummerRapportNot?: string | null
    opdrachtgever?: string
    opdrachtgeverIsempty?: boolean
    opdrachtgeverIsnull?: boolean
    opdrachtgeverLike?: string
    opdrachtgeverNot?: string | null
    opdrachtnemer?: string
    opdrachtnemerIsempty?: boolean
    opdrachtnemerIsnull?: boolean
    opdrachtnemerLike?: string
    opdrachtnemerNot?: string | null
    page?: number
    permalink?: string
    permalinkIsempty?: boolean
    permalinkIsnull?: boolean
    permalinkLike?: string
    permalinkNot?: string | null
    typeOnderzoek?: string
    typeOnderzoekIsempty?: boolean
    typeOnderzoekIsnull?: boolean
    typeOnderzoekLike?: string
    typeOnderzoekNot?: string | null
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedOndergrondhistorischeonderzoekenList
  }>(
    `/v1/ondergrond/historischeonderzoeken/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        auteurRapport,
        'auteurRapport[isempty]': auteurRapportIsempty,
        'auteurRapport[isnull]': auteurRapportIsnull,
        'auteurRapport[like]': auteurRapportLike,
        'auteurRapport[not]': auteurRapportNot,
        beschrijving,
        'beschrijving[isempty]': beschrijvingIsempty,
        'beschrijving[isnull]': beschrijvingIsnull,
        'beschrijving[like]': beschrijvingLike,
        'beschrijving[not]': beschrijvingNot,
        datumRapport,
        'datumRapport[gt]': datumRapportGt,
        'datumRapport[gte]': datumRapportGte,
        'datumRapport[isnull]': datumRapportIsnull,
        'datumRapport[lt]': datumRapportLt,
        'datumRapport[lte]': datumRapportLte,
        'datumRapport[not]': datumRapportNot,
        geometrie,
        'geometrie[contains]': geometrieContains,
        'geometrie[isnull]': geometrieIsnull,
        'geometrie[not]': geometrieNot,
        id,
        indicatieKwaliteit,
        'indicatieKwaliteit[isempty]': indicatieKwaliteitIsempty,
        'indicatieKwaliteit[isnull]': indicatieKwaliteitIsnull,
        'indicatieKwaliteit[like]': indicatieKwaliteitLike,
        'indicatieKwaliteit[not]': indicatieKwaliteitNot,
        locatieOfAdres,
        'locatieOfAdres[isempty]': locatieOfAdresIsempty,
        'locatieOfAdres[isnull]': locatieOfAdresIsnull,
        'locatieOfAdres[like]': locatieOfAdresLike,
        'locatieOfAdres[not]': locatieOfAdresNot,
        naamRapport,
        'naamRapport[isempty]': naamRapportIsempty,
        'naamRapport[isnull]': naamRapportIsnull,
        'naamRapport[like]': naamRapportLike,
        'naamRapport[not]': naamRapportNot,
        nummerRapport,
        'nummerRapport[isempty]': nummerRapportIsempty,
        'nummerRapport[isnull]': nummerRapportIsnull,
        'nummerRapport[like]': nummerRapportLike,
        'nummerRapport[not]': nummerRapportNot,
        opdrachtgever,
        'opdrachtgever[isempty]': opdrachtgeverIsempty,
        'opdrachtgever[isnull]': opdrachtgeverIsnull,
        'opdrachtgever[like]': opdrachtgeverLike,
        'opdrachtgever[not]': opdrachtgeverNot,
        opdrachtnemer,
        'opdrachtnemer[isempty]': opdrachtnemerIsempty,
        'opdrachtnemer[isnull]': opdrachtnemerIsnull,
        'opdrachtnemer[like]': opdrachtnemerLike,
        'opdrachtnemer[not]': opdrachtnemerNot,
        page,
        permalink,
        'permalink[isempty]': permalinkIsempty,
        'permalink[isnull]': permalinkIsnull,
        'permalink[like]': permalinkLike,
        'permalink[not]': permalinkNot,
        typeOnderzoek,
        'typeOnderzoek[isempty]': typeOnderzoekIsempty,
        'typeOnderzoek[isnull]': typeOnderzoekIsnull,
        'typeOnderzoek[like]': typeOnderzoekLike,
        'typeOnderzoek[not]': typeOnderzoekNot,
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
export function ondergrondHistorischeonderzoekenRetrieve(
  id: number,
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
    data: Ondergrondhistorischeonderzoeken
  }>(
    `/v1/ondergrond/historischeonderzoeken/${id}/${QS.query(
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
