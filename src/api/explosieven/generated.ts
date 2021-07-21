/**
 * explosieven
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
export interface ExplosievenbominslagLinks {
  schema: string
  self?: SelfLink
}
export interface Geometry {
  type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'
}
export interface Explosievenbominslag {
  _links: ExplosievenbominslagLinks
  id: number
  pdf?: string | null
  bron?: string | null
  datum?: string | null
  kenmerk?: string | null
  geometry?: Geometry
  detailType?: string | null
  intekening?: string | null
  nauwkeurig?: string | null
  oorlogsinc?: string | null
  datumInslag?: string | null
  opmerkingen?: string | null
}
export interface PaginatedExplosievenbominslagList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Explosievenbominslag[]
}
export interface ExplosievengevrijwaardgebiedLinks {
  schema: string
  self?: SelfLink
}
export interface Explosievengevrijwaardgebied {
  _links: ExplosievengevrijwaardgebiedLinks
  id: number
  bron?: string | null
  datum?: string | null
  kenmerk?: string | null
  geometry?: Geometry
  detailType?: string | null
  intekening?: string | null
  nauwkeurig?: string | null
  opmerkingen?: string | null
}
export interface PaginatedExplosievengevrijwaardgebiedList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Explosievengevrijwaardgebied[]
}
export interface ExplosievenuitgevoerdonderzoekLinks {
  schema: string
  self?: SelfLink
}
export interface Explosievenuitgevoerdonderzoek {
  _links: ExplosievenuitgevoerdonderzoekLinks
  id: number
  datum?: string | null
  kenmerk?: string | null
  geometry?: Geometry
  detailType?: string | null
  opdrachtgever?: string | null
  opdrachtnemer?: string | null
  verdachtgebied?: string | null
  onderzoeksgebied?: string | null
}
export interface PaginatedExplosievenuitgevoerdonderzoekList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Explosievenuitgevoerdonderzoek[]
}
export interface ExplosievenverdachtgebiedLinks {
  schema: string
  self?: SelfLink
}
export interface Explosievenverdachtgebied {
  _links: ExplosievenverdachtgebiedLinks
  id: number
  pdf?: string | null
  aantal?: string | null
  kaliber?: string | null
  kenmerk?: string | null
  subtype?: string | null
  geometry?: Geometry
  afbakening?: string | null
  detailType?: string | null
  cartografie?: string | null
  horizontaal?: string | null
  opmerkingen?: string | null
  verschijning?: string | null
  oorlogshandeling?: string | null
}
export interface PaginatedExplosievenverdachtgebiedList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Explosievenverdachtgebied[]
}
export function explosievenBominslagList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    bron,
    bronIsempty,
    bronIsnull,
    bronLike,
    bronNot,
    datum,
    datumInslag,
    datumInslagGt,
    datumInslagGte,
    datumInslagIsnull,
    datumInslagLt,
    datumInslagLte,
    datumInslagNot,
    datumGt,
    datumGte,
    datumIsnull,
    datumLt,
    datumLte,
    datumNot,
    detailType,
    detailTypeIsempty,
    detailTypeIsnull,
    detailTypeLike,
    detailTypeNot,
    geometry,
    id,
    intekening,
    intekeningIsempty,
    intekeningIsnull,
    intekeningLike,
    intekeningNot,
    kenmerk,
    kenmerkIsempty,
    kenmerkIsnull,
    kenmerkLike,
    kenmerkNot,
    nauwkeurig,
    nauwkeurigIsempty,
    nauwkeurigIsnull,
    nauwkeurigLike,
    nauwkeurigNot,
    oorlogsinc,
    oorlogsincIsempty,
    oorlogsincIsnull,
    oorlogsincLike,
    oorlogsincNot,
    opmerkingen,
    opmerkingenIsempty,
    opmerkingenIsnull,
    opmerkingenLike,
    opmerkingenNot,
    page,
    pdf,
    pdfIsempty,
    pdfIsnull,
    pdfLike,
    pdfNot,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    bron?: string
    bronIsempty?: boolean
    bronIsnull?: boolean
    bronLike?: string
    bronNot?: string | null
    datum?: string
    datumInslag?: string
    datumInslagGt?: string
    datumInslagGte?: string
    datumInslagIsnull?: boolean
    datumInslagLt?: string
    datumInslagLte?: string
    datumInslagNot?: string | null
    datumGt?: string
    datumGte?: string
    datumIsnull?: boolean
    datumLt?: string
    datumLte?: string
    datumNot?: string | null
    detailType?: string
    detailTypeIsempty?: boolean
    detailTypeIsnull?: boolean
    detailTypeLike?: string
    detailTypeNot?: string | null
    geometry?: string
    id?: number
    intekening?: string
    intekeningIsempty?: boolean
    intekeningIsnull?: boolean
    intekeningLike?: string
    intekeningNot?: string | null
    kenmerk?: string
    kenmerkIsempty?: boolean
    kenmerkIsnull?: boolean
    kenmerkLike?: string
    kenmerkNot?: string | null
    nauwkeurig?: string
    nauwkeurigIsempty?: boolean
    nauwkeurigIsnull?: boolean
    nauwkeurigLike?: string
    nauwkeurigNot?: string | null
    oorlogsinc?: string
    oorlogsincIsempty?: boolean
    oorlogsincIsnull?: boolean
    oorlogsincLike?: string
    oorlogsincNot?: string | null
    opmerkingen?: string
    opmerkingenIsempty?: boolean
    opmerkingenIsnull?: boolean
    opmerkingenLike?: string
    opmerkingenNot?: string | null
    page?: number
    pdf?: string
    pdfIsempty?: boolean
    pdfIsnull?: boolean
    pdfLike?: string
    pdfNot?: string | null
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedExplosievenbominslagList
  }>(
    `/v1/explosieven/bominslag/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        bron,
        'bron[isempty]': bronIsempty,
        'bron[isnull]': bronIsnull,
        'bron[like]': bronLike,
        'bron[not]': bronNot,
        datum,
        datumInslag,
        'datumInslag[gt]': datumInslagGt,
        'datumInslag[gte]': datumInslagGte,
        'datumInslag[isnull]': datumInslagIsnull,
        'datumInslag[lt]': datumInslagLt,
        'datumInslag[lte]': datumInslagLte,
        'datumInslag[not]': datumInslagNot,
        'datum[gt]': datumGt,
        'datum[gte]': datumGte,
        'datum[isnull]': datumIsnull,
        'datum[lt]': datumLt,
        'datum[lte]': datumLte,
        'datum[not]': datumNot,
        detailType,
        'detailType[isempty]': detailTypeIsempty,
        'detailType[isnull]': detailTypeIsnull,
        'detailType[like]': detailTypeLike,
        'detailType[not]': detailTypeNot,
        geometry,
        id,
        intekening,
        'intekening[isempty]': intekeningIsempty,
        'intekening[isnull]': intekeningIsnull,
        'intekening[like]': intekeningLike,
        'intekening[not]': intekeningNot,
        kenmerk,
        'kenmerk[isempty]': kenmerkIsempty,
        'kenmerk[isnull]': kenmerkIsnull,
        'kenmerk[like]': kenmerkLike,
        'kenmerk[not]': kenmerkNot,
        nauwkeurig,
        'nauwkeurig[isempty]': nauwkeurigIsempty,
        'nauwkeurig[isnull]': nauwkeurigIsnull,
        'nauwkeurig[like]': nauwkeurigLike,
        'nauwkeurig[not]': nauwkeurigNot,
        oorlogsinc,
        'oorlogsinc[isempty]': oorlogsincIsempty,
        'oorlogsinc[isnull]': oorlogsincIsnull,
        'oorlogsinc[like]': oorlogsincLike,
        'oorlogsinc[not]': oorlogsincNot,
        opmerkingen,
        'opmerkingen[isempty]': opmerkingenIsempty,
        'opmerkingen[isnull]': opmerkingenIsnull,
        'opmerkingen[like]': opmerkingenLike,
        'opmerkingen[not]': opmerkingenNot,
        page,
        pdf,
        'pdf[isempty]': pdfIsempty,
        'pdf[isnull]': pdfIsnull,
        'pdf[like]': pdfLike,
        'pdf[not]': pdfNot,
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
export function explosievenBominslagRetrieve(
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
    data: Explosievenbominslag
  }>(
    `/v1/explosieven/bominslag/${id}/${QS.query(
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
export function explosievenGevrijwaardgebiedList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    bron,
    bronIsempty,
    bronIsnull,
    bronLike,
    bronNot,
    datum,
    datumGt,
    datumGte,
    datumIsnull,
    datumLt,
    datumLte,
    datumNot,
    detailType,
    detailTypeIsempty,
    detailTypeIsnull,
    detailTypeLike,
    detailTypeNot,
    geometry,
    id,
    intekening,
    intekeningIsempty,
    intekeningIsnull,
    intekeningLike,
    intekeningNot,
    kenmerk,
    kenmerkIsempty,
    kenmerkIsnull,
    kenmerkLike,
    kenmerkNot,
    nauwkeurig,
    nauwkeurigIsempty,
    nauwkeurigIsnull,
    nauwkeurigLike,
    nauwkeurigNot,
    opmerkingen,
    opmerkingenIsempty,
    opmerkingenIsnull,
    opmerkingenLike,
    opmerkingenNot,
    page,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    bron?: string
    bronIsempty?: boolean
    bronIsnull?: boolean
    bronLike?: string
    bronNot?: string | null
    datum?: string
    datumGt?: string
    datumGte?: string
    datumIsnull?: boolean
    datumLt?: string
    datumLte?: string
    datumNot?: string | null
    detailType?: string
    detailTypeIsempty?: boolean
    detailTypeIsnull?: boolean
    detailTypeLike?: string
    detailTypeNot?: string | null
    geometry?: string
    id?: number
    intekening?: string
    intekeningIsempty?: boolean
    intekeningIsnull?: boolean
    intekeningLike?: string
    intekeningNot?: string | null
    kenmerk?: string
    kenmerkIsempty?: boolean
    kenmerkIsnull?: boolean
    kenmerkLike?: string
    kenmerkNot?: string | null
    nauwkeurig?: string
    nauwkeurigIsempty?: boolean
    nauwkeurigIsnull?: boolean
    nauwkeurigLike?: string
    nauwkeurigNot?: string | null
    opmerkingen?: string
    opmerkingenIsempty?: boolean
    opmerkingenIsnull?: boolean
    opmerkingenLike?: string
    opmerkingenNot?: string | null
    page?: number
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedExplosievengevrijwaardgebiedList
  }>(
    `/v1/explosieven/gevrijwaardgebied/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        bron,
        'bron[isempty]': bronIsempty,
        'bron[isnull]': bronIsnull,
        'bron[like]': bronLike,
        'bron[not]': bronNot,
        datum,
        'datum[gt]': datumGt,
        'datum[gte]': datumGte,
        'datum[isnull]': datumIsnull,
        'datum[lt]': datumLt,
        'datum[lte]': datumLte,
        'datum[not]': datumNot,
        detailType,
        'detailType[isempty]': detailTypeIsempty,
        'detailType[isnull]': detailTypeIsnull,
        'detailType[like]': detailTypeLike,
        'detailType[not]': detailTypeNot,
        geometry,
        id,
        intekening,
        'intekening[isempty]': intekeningIsempty,
        'intekening[isnull]': intekeningIsnull,
        'intekening[like]': intekeningLike,
        'intekening[not]': intekeningNot,
        kenmerk,
        'kenmerk[isempty]': kenmerkIsempty,
        'kenmerk[isnull]': kenmerkIsnull,
        'kenmerk[like]': kenmerkLike,
        'kenmerk[not]': kenmerkNot,
        nauwkeurig,
        'nauwkeurig[isempty]': nauwkeurigIsempty,
        'nauwkeurig[isnull]': nauwkeurigIsnull,
        'nauwkeurig[like]': nauwkeurigLike,
        'nauwkeurig[not]': nauwkeurigNot,
        opmerkingen,
        'opmerkingen[isempty]': opmerkingenIsempty,
        'opmerkingen[isnull]': opmerkingenIsnull,
        'opmerkingen[like]': opmerkingenLike,
        'opmerkingen[not]': opmerkingenNot,
        page,
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
export function explosievenGevrijwaardgebiedRetrieve(
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
    data: Explosievengevrijwaardgebied
  }>(
    `/v1/explosieven/gevrijwaardgebied/${id}/${QS.query(
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
export function explosievenUitgevoerdonderzoekList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    datum,
    datumGt,
    datumGte,
    datumIsnull,
    datumLt,
    datumLte,
    datumNot,
    detailType,
    detailTypeIsempty,
    detailTypeIsnull,
    detailTypeLike,
    detailTypeNot,
    geometry,
    id,
    kenmerk,
    kenmerkIsempty,
    kenmerkIsnull,
    kenmerkLike,
    kenmerkNot,
    onderzoeksgebied,
    onderzoeksgebiedIsempty,
    onderzoeksgebiedIsnull,
    onderzoeksgebiedLike,
    onderzoeksgebiedNot,
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
    verdachtgebied,
    verdachtgebiedIsempty,
    verdachtgebiedIsnull,
    verdachtgebiedLike,
    verdachtgebiedNot,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    datum?: string
    datumGt?: string
    datumGte?: string
    datumIsnull?: boolean
    datumLt?: string
    datumLte?: string
    datumNot?: string | null
    detailType?: string
    detailTypeIsempty?: boolean
    detailTypeIsnull?: boolean
    detailTypeLike?: string
    detailTypeNot?: string | null
    geometry?: string
    id?: number
    kenmerk?: string
    kenmerkIsempty?: boolean
    kenmerkIsnull?: boolean
    kenmerkLike?: string
    kenmerkNot?: string | null
    onderzoeksgebied?: string
    onderzoeksgebiedIsempty?: boolean
    onderzoeksgebiedIsnull?: boolean
    onderzoeksgebiedLike?: string
    onderzoeksgebiedNot?: string | null
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
    verdachtgebied?: string
    verdachtgebiedIsempty?: boolean
    verdachtgebiedIsnull?: boolean
    verdachtgebiedLike?: string
    verdachtgebiedNot?: string | null
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedExplosievenuitgevoerdonderzoekList
  }>(
    `/v1/explosieven/uitgevoerdonderzoek/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        datum,
        'datum[gt]': datumGt,
        'datum[gte]': datumGte,
        'datum[isnull]': datumIsnull,
        'datum[lt]': datumLt,
        'datum[lte]': datumLte,
        'datum[not]': datumNot,
        detailType,
        'detailType[isempty]': detailTypeIsempty,
        'detailType[isnull]': detailTypeIsnull,
        'detailType[like]': detailTypeLike,
        'detailType[not]': detailTypeNot,
        geometry,
        id,
        kenmerk,
        'kenmerk[isempty]': kenmerkIsempty,
        'kenmerk[isnull]': kenmerkIsnull,
        'kenmerk[like]': kenmerkLike,
        'kenmerk[not]': kenmerkNot,
        onderzoeksgebied,
        'onderzoeksgebied[isempty]': onderzoeksgebiedIsempty,
        'onderzoeksgebied[isnull]': onderzoeksgebiedIsnull,
        'onderzoeksgebied[like]': onderzoeksgebiedLike,
        'onderzoeksgebied[not]': onderzoeksgebiedNot,
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
        verdachtgebied,
        'verdachtgebied[isempty]': verdachtgebiedIsempty,
        'verdachtgebied[isnull]': verdachtgebiedIsnull,
        'verdachtgebied[like]': verdachtgebiedLike,
        'verdachtgebied[not]': verdachtgebiedNot,
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
export function explosievenUitgevoerdonderzoekRetrieve(
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
    data: Explosievenuitgevoerdonderzoek
  }>(
    `/v1/explosieven/uitgevoerdonderzoek/${id}/${QS.query(
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
export function explosievenVerdachtgebiedList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    aantal,
    aantalIsempty,
    aantalIsnull,
    aantalLike,
    aantalNot,
    afbakening,
    afbakeningIsempty,
    afbakeningIsnull,
    afbakeningLike,
    afbakeningNot,
    cartografie,
    cartografieIsempty,
    cartografieIsnull,
    cartografieLike,
    cartografieNot,
    detailType,
    detailTypeIsempty,
    detailTypeIsnull,
    detailTypeLike,
    detailTypeNot,
    geometry,
    horizontaal,
    horizontaalIsempty,
    horizontaalIsnull,
    horizontaalLike,
    horizontaalNot,
    id,
    kaliber,
    kaliberIsempty,
    kaliberIsnull,
    kaliberLike,
    kaliberNot,
    kenmerk,
    kenmerkIsempty,
    kenmerkIsnull,
    kenmerkLike,
    kenmerkNot,
    oorlogshandeling,
    oorlogshandelingIsempty,
    oorlogshandelingIsnull,
    oorlogshandelingLike,
    oorlogshandelingNot,
    opmerkingen,
    opmerkingenIsempty,
    opmerkingenIsnull,
    opmerkingenLike,
    opmerkingenNot,
    page,
    pdf,
    pdfIsempty,
    pdfIsnull,
    pdfLike,
    pdfNot,
    subtype,
    subtypeIsempty,
    subtypeIsnull,
    subtypeLike,
    subtypeNot,
    verschijning,
    verschijningIsempty,
    verschijningIsnull,
    verschijningLike,
    verschijningNot,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    aantal?: string
    aantalIsempty?: boolean
    aantalIsnull?: boolean
    aantalLike?: string
    aantalNot?: string | null
    afbakening?: string
    afbakeningIsempty?: boolean
    afbakeningIsnull?: boolean
    afbakeningLike?: string
    afbakeningNot?: string | null
    cartografie?: string
    cartografieIsempty?: boolean
    cartografieIsnull?: boolean
    cartografieLike?: string
    cartografieNot?: string | null
    detailType?: string
    detailTypeIsempty?: boolean
    detailTypeIsnull?: boolean
    detailTypeLike?: string
    detailTypeNot?: string | null
    geometry?: string
    horizontaal?: string
    horizontaalIsempty?: boolean
    horizontaalIsnull?: boolean
    horizontaalLike?: string
    horizontaalNot?: string | null
    id?: number
    kaliber?: string
    kaliberIsempty?: boolean
    kaliberIsnull?: boolean
    kaliberLike?: string
    kaliberNot?: string | null
    kenmerk?: string
    kenmerkIsempty?: boolean
    kenmerkIsnull?: boolean
    kenmerkLike?: string
    kenmerkNot?: string | null
    oorlogshandeling?: string
    oorlogshandelingIsempty?: boolean
    oorlogshandelingIsnull?: boolean
    oorlogshandelingLike?: string
    oorlogshandelingNot?: string | null
    opmerkingen?: string
    opmerkingenIsempty?: boolean
    opmerkingenIsnull?: boolean
    opmerkingenLike?: string
    opmerkingenNot?: string | null
    page?: number
    pdf?: string
    pdfIsempty?: boolean
    pdfIsnull?: boolean
    pdfLike?: string
    pdfNot?: string | null
    subtype?: string
    subtypeIsempty?: boolean
    subtypeIsnull?: boolean
    subtypeLike?: string
    subtypeNot?: string | null
    verschijning?: string
    verschijningIsempty?: boolean
    verschijningIsnull?: boolean
    verschijningLike?: string
    verschijningNot?: string | null
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedExplosievenverdachtgebiedList
  }>(
    `/v1/explosieven/verdachtgebied/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        aantal,
        'aantal[isempty]': aantalIsempty,
        'aantal[isnull]': aantalIsnull,
        'aantal[like]': aantalLike,
        'aantal[not]': aantalNot,
        afbakening,
        'afbakening[isempty]': afbakeningIsempty,
        'afbakening[isnull]': afbakeningIsnull,
        'afbakening[like]': afbakeningLike,
        'afbakening[not]': afbakeningNot,
        cartografie,
        'cartografie[isempty]': cartografieIsempty,
        'cartografie[isnull]': cartografieIsnull,
        'cartografie[like]': cartografieLike,
        'cartografie[not]': cartografieNot,
        detailType,
        'detailType[isempty]': detailTypeIsempty,
        'detailType[isnull]': detailTypeIsnull,
        'detailType[like]': detailTypeLike,
        'detailType[not]': detailTypeNot,
        geometry,
        horizontaal,
        'horizontaal[isempty]': horizontaalIsempty,
        'horizontaal[isnull]': horizontaalIsnull,
        'horizontaal[like]': horizontaalLike,
        'horizontaal[not]': horizontaalNot,
        id,
        kaliber,
        'kaliber[isempty]': kaliberIsempty,
        'kaliber[isnull]': kaliberIsnull,
        'kaliber[like]': kaliberLike,
        'kaliber[not]': kaliberNot,
        kenmerk,
        'kenmerk[isempty]': kenmerkIsempty,
        'kenmerk[isnull]': kenmerkIsnull,
        'kenmerk[like]': kenmerkLike,
        'kenmerk[not]': kenmerkNot,
        oorlogshandeling,
        'oorlogshandeling[isempty]': oorlogshandelingIsempty,
        'oorlogshandeling[isnull]': oorlogshandelingIsnull,
        'oorlogshandeling[like]': oorlogshandelingLike,
        'oorlogshandeling[not]': oorlogshandelingNot,
        opmerkingen,
        'opmerkingen[isempty]': opmerkingenIsempty,
        'opmerkingen[isnull]': opmerkingenIsnull,
        'opmerkingen[like]': opmerkingenLike,
        'opmerkingen[not]': opmerkingenNot,
        page,
        pdf,
        'pdf[isempty]': pdfIsempty,
        'pdf[isnull]': pdfIsnull,
        'pdf[like]': pdfLike,
        'pdf[not]': pdfNot,
        subtype,
        'subtype[isempty]': subtypeIsempty,
        'subtype[isnull]': subtypeIsnull,
        'subtype[like]': subtypeLike,
        'subtype[not]': subtypeNot,
        verschijning,
        'verschijning[isempty]': verschijningIsempty,
        'verschijning[isnull]': verschijningIsnull,
        'verschijning[like]': verschijningLike,
        'verschijning[not]': verschijningNot,
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
export function explosievenVerdachtgebiedRetrieve(
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
    data: Explosievenverdachtgebied
  }>(
    `/v1/explosieven/verdachtgebied/${id}/${QS.query(
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
