/**
 * Varen
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
export interface VarenligplaatsLinks {
  schema: string
  self?: SelfLink
  gbdBuurt?: string | null
}
export interface Geometry {
  type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'
}
export interface Varenligplaats {
  _links: VarenligplaatsLinks
  id: string
  gbdBuurtId: string
  geometrie?: Geometry
  idLigplaats?: string | null
  locatieAdres?: string | null
  naamKlantKvk?: string | null
  naamVaartuig?: string | null
  ligplaatsSegment?: string | null
  verwerkingsdatum?: string | null
  kenmerkVergunning?: string | null
  datumEindeVergunning?: string | null
}
export interface PaginatedVarenligplaatsList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Varenligplaats[]
}
export interface VarenopafstapplaatsLinks {
  schema: string
  self?: SelfLink
  gbdBuurt?: string | null
}
export interface Varenopafstapplaats {
  _links: VarenopafstapplaatsLinks
  id: string
  volgnr: string
  laadLos?: string | null
  gbdBuurtId: string
  eLaadpunt?: string | null
  geometrie?: Geometry
  opEnAfstap?: string | null
  kleurOpKaart?: string | null
  tekstOnMouseover?: string | null
  verwerkingsdatum?: string | null
}
export interface PaginatedVarenopafstapplaatsList {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Varenopafstapplaats[]
}
/**
 * Deze dataset bevat de gegevens over de ligplaatsen register in Amsterdam.
 */
export function varenLigplaatsList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    datumEindeVergunning,
    datumEindeVergunningIsempty,
    datumEindeVergunningIsnull,
    datumEindeVergunningLike,
    datumEindeVergunningNot,
    gbdBuurt,
    geometrie,
    id,
    idLigplaats,
    idLigplaatsIsempty,
    idLigplaatsIsnull,
    idLigplaatsLike,
    idLigplaatsNot,
    idIsempty,
    idIsnull,
    idLike,
    idNot,
    kenmerkVergunning,
    kenmerkVergunningIsempty,
    kenmerkVergunningIsnull,
    kenmerkVergunningLike,
    kenmerkVergunningNot,
    ligplaatsSegment,
    ligplaatsSegmentIsempty,
    ligplaatsSegmentIsnull,
    ligplaatsSegmentLike,
    ligplaatsSegmentNot,
    locatieAdres,
    locatieAdresIsempty,
    locatieAdresIsnull,
    locatieAdresLike,
    locatieAdresNot,
    naamKlantKvk,
    naamKlantKvkIsempty,
    naamKlantKvkIsnull,
    naamKlantKvkLike,
    naamKlantKvkNot,
    naamVaartuig,
    naamVaartuigIsempty,
    naamVaartuigIsnull,
    naamVaartuigLike,
    naamVaartuigNot,
    page,
    verwerkingsdatum,
    verwerkingsdatumGt,
    verwerkingsdatumGte,
    verwerkingsdatumIsnull,
    verwerkingsdatumLt,
    verwerkingsdatumLte,
    verwerkingsdatumNot,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    datumEindeVergunning?: string
    datumEindeVergunningIsempty?: boolean
    datumEindeVergunningIsnull?: boolean
    datumEindeVergunningLike?: string
    datumEindeVergunningNot?: string | null
    gbdBuurt?: string
    geometrie?: string
    id?: string
    idLigplaats?: string
    idLigplaatsIsempty?: boolean
    idLigplaatsIsnull?: boolean
    idLigplaatsLike?: string
    idLigplaatsNot?: string | null
    idIsempty?: boolean
    idIsnull?: boolean
    idLike?: string
    idNot?: string
    kenmerkVergunning?: string
    kenmerkVergunningIsempty?: boolean
    kenmerkVergunningIsnull?: boolean
    kenmerkVergunningLike?: string
    kenmerkVergunningNot?: string | null
    ligplaatsSegment?: string
    ligplaatsSegmentIsempty?: boolean
    ligplaatsSegmentIsnull?: boolean
    ligplaatsSegmentLike?: string
    ligplaatsSegmentNot?: string | null
    locatieAdres?: string
    locatieAdresIsempty?: boolean
    locatieAdresIsnull?: boolean
    locatieAdresLike?: string
    locatieAdresNot?: string | null
    naamKlantKvk?: string
    naamKlantKvkIsempty?: boolean
    naamKlantKvkIsnull?: boolean
    naamKlantKvkLike?: string
    naamKlantKvkNot?: string | null
    naamVaartuig?: string
    naamVaartuigIsempty?: boolean
    naamVaartuigIsnull?: boolean
    naamVaartuigLike?: string
    naamVaartuigNot?: string | null
    page?: number
    verwerkingsdatum?: string
    verwerkingsdatumGt?: string
    verwerkingsdatumGte?: string
    verwerkingsdatumIsnull?: boolean
    verwerkingsdatumLt?: string
    verwerkingsdatumLte?: string
    verwerkingsdatumNot?: string | null
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedVarenligplaatsList
  }>(
    `/v1/varen/ligplaats/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        datumEindeVergunning,
        'datumEindeVergunning[isempty]': datumEindeVergunningIsempty,
        'datumEindeVergunning[isnull]': datumEindeVergunningIsnull,
        'datumEindeVergunning[like]': datumEindeVergunningLike,
        'datumEindeVergunning[not]': datumEindeVergunningNot,
        gbdBuurt,
        geometrie,
        id,
        idLigplaats,
        'idLigplaats[isempty]': idLigplaatsIsempty,
        'idLigplaats[isnull]': idLigplaatsIsnull,
        'idLigplaats[like]': idLigplaatsLike,
        'idLigplaats[not]': idLigplaatsNot,
        'id[isempty]': idIsempty,
        'id[isnull]': idIsnull,
        'id[like]': idLike,
        'id[not]': idNot,
        kenmerkVergunning,
        'kenmerkVergunning[isempty]': kenmerkVergunningIsempty,
        'kenmerkVergunning[isnull]': kenmerkVergunningIsnull,
        'kenmerkVergunning[like]': kenmerkVergunningLike,
        'kenmerkVergunning[not]': kenmerkVergunningNot,
        ligplaatsSegment,
        'ligplaatsSegment[isempty]': ligplaatsSegmentIsempty,
        'ligplaatsSegment[isnull]': ligplaatsSegmentIsnull,
        'ligplaatsSegment[like]': ligplaatsSegmentLike,
        'ligplaatsSegment[not]': ligplaatsSegmentNot,
        locatieAdres,
        'locatieAdres[isempty]': locatieAdresIsempty,
        'locatieAdres[isnull]': locatieAdresIsnull,
        'locatieAdres[like]': locatieAdresLike,
        'locatieAdres[not]': locatieAdresNot,
        naamKlantKvk,
        'naamKlantKvk[isempty]': naamKlantKvkIsempty,
        'naamKlantKvk[isnull]': naamKlantKvkIsnull,
        'naamKlantKvk[like]': naamKlantKvkLike,
        'naamKlantKvk[not]': naamKlantKvkNot,
        naamVaartuig,
        'naamVaartuig[isempty]': naamVaartuigIsempty,
        'naamVaartuig[isnull]': naamVaartuigIsnull,
        'naamVaartuig[like]': naamVaartuigLike,
        'naamVaartuig[not]': naamVaartuigNot,
        page,
        verwerkingsdatum,
        'verwerkingsdatum[gt]': verwerkingsdatumGt,
        'verwerkingsdatum[gte]': verwerkingsdatumGte,
        'verwerkingsdatum[isnull]': verwerkingsdatumIsnull,
        'verwerkingsdatum[lt]': verwerkingsdatumLt,
        'verwerkingsdatum[lte]': verwerkingsdatumLte,
        'verwerkingsdatum[not]': verwerkingsdatumNot,
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
export function varenLigplaatsRetrieve(
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
    data: Varenligplaats
  }>(
    `/v1/varen/ligplaats/${id}/${QS.query(
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
/**
 * Deze dataset bevat de gegevens over op- en afstaplocaties voor pleziervaart, passagiersvaart en transport over het water. De gemeente wil daarbij voldoende ruimte voor bewoners creëren, onder andere doorbeheersing van het aantal vaarbewegingen en het spreiden van plezier- en passagiersvaart.
 */
export function varenOpafstapplaatsList(
  {
    acceptCrs,
    contentCrs,
    expand,
    expandScope,
    format,
    pageSize,
    sort,
    eLaadpunt,
    eLaadpuntIsempty,
    eLaadpuntIsnull,
    eLaadpuntLike,
    eLaadpuntNot,
    gbdBuurt,
    geometrie,
    id,
    idIsempty,
    idIsnull,
    idLike,
    idNot,
    kleurOpKaart,
    kleurOpKaartIsempty,
    kleurOpKaartIsnull,
    kleurOpKaartLike,
    kleurOpKaartNot,
    laadLos,
    laadLosIsempty,
    laadLosIsnull,
    laadLosLike,
    laadLosNot,
    opEnAfstap,
    opEnAfstapIsempty,
    opEnAfstapIsnull,
    opEnAfstapLike,
    opEnAfstapNot,
    page,
    tekstOnMouseover,
    tekstOnMouseoverIsempty,
    tekstOnMouseoverIsnull,
    tekstOnMouseoverLike,
    tekstOnMouseoverNot,
    verwerkingsdatum,
    verwerkingsdatumGt,
    verwerkingsdatumGte,
    verwerkingsdatumIsnull,
    verwerkingsdatumLt,
    verwerkingsdatumLte,
    verwerkingsdatumNot,
    volgnr,
    volgnrIsempty,
    volgnrIsnull,
    volgnrLike,
    volgnrNot,
  }: {
    acceptCrs?: string
    contentCrs?: string
    expand?: boolean
    expandScope?: string
    format?: 'csv' | 'geojson' | 'json'
    pageSize?: number
    sort?: string
    eLaadpunt?: string
    eLaadpuntIsempty?: boolean
    eLaadpuntIsnull?: boolean
    eLaadpuntLike?: string
    eLaadpuntNot?: string | null
    gbdBuurt?: string
    geometrie?: string
    id?: string
    idIsempty?: boolean
    idIsnull?: boolean
    idLike?: string
    idNot?: string
    kleurOpKaart?: string
    kleurOpKaartIsempty?: boolean
    kleurOpKaartIsnull?: boolean
    kleurOpKaartLike?: string
    kleurOpKaartNot?: string | null
    laadLos?: string
    laadLosIsempty?: boolean
    laadLosIsnull?: boolean
    laadLosLike?: string
    laadLosNot?: string | null
    opEnAfstap?: string
    opEnAfstapIsempty?: boolean
    opEnAfstapIsnull?: boolean
    opEnAfstapLike?: string
    opEnAfstapNot?: string | null
    page?: number
    tekstOnMouseover?: string
    tekstOnMouseoverIsempty?: boolean
    tekstOnMouseoverIsnull?: boolean
    tekstOnMouseoverLike?: string
    tekstOnMouseoverNot?: string | null
    verwerkingsdatum?: string
    verwerkingsdatumGt?: string
    verwerkingsdatumGte?: string
    verwerkingsdatumIsnull?: boolean
    verwerkingsdatumLt?: string
    verwerkingsdatumLte?: string
    verwerkingsdatumNot?: string | null
    volgnr?: string
    volgnrIsempty?: boolean
    volgnrIsnull?: boolean
    volgnrLike?: string
    volgnrNot?: string
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedVarenopafstapplaatsList
  }>(
    `/v1/varen/opafstapplaats/${QS.query(
      QS.form({
        _expand: expand,
        _expandScope: expandScope,
        _format: format,
        _pageSize: pageSize,
        _sort: sort,
        eLaadpunt,
        'eLaadpunt[isempty]': eLaadpuntIsempty,
        'eLaadpunt[isnull]': eLaadpuntIsnull,
        'eLaadpunt[like]': eLaadpuntLike,
        'eLaadpunt[not]': eLaadpuntNot,
        gbdBuurt,
        geometrie,
        id,
        'id[isempty]': idIsempty,
        'id[isnull]': idIsnull,
        'id[like]': idLike,
        'id[not]': idNot,
        kleurOpKaart,
        'kleurOpKaart[isempty]': kleurOpKaartIsempty,
        'kleurOpKaart[isnull]': kleurOpKaartIsnull,
        'kleurOpKaart[like]': kleurOpKaartLike,
        'kleurOpKaart[not]': kleurOpKaartNot,
        laadLos,
        'laadLos[isempty]': laadLosIsempty,
        'laadLos[isnull]': laadLosIsnull,
        'laadLos[like]': laadLosLike,
        'laadLos[not]': laadLosNot,
        opEnAfstap,
        'opEnAfstap[isempty]': opEnAfstapIsempty,
        'opEnAfstap[isnull]': opEnAfstapIsnull,
        'opEnAfstap[like]': opEnAfstapLike,
        'opEnAfstap[not]': opEnAfstapNot,
        page,
        tekstOnMouseover,
        'tekstOnMouseover[isempty]': tekstOnMouseoverIsempty,
        'tekstOnMouseover[isnull]': tekstOnMouseoverIsnull,
        'tekstOnMouseover[like]': tekstOnMouseoverLike,
        'tekstOnMouseover[not]': tekstOnMouseoverNot,
        verwerkingsdatum,
        'verwerkingsdatum[gt]': verwerkingsdatumGt,
        'verwerkingsdatum[gte]': verwerkingsdatumGte,
        'verwerkingsdatum[isnull]': verwerkingsdatumIsnull,
        'verwerkingsdatum[lt]': verwerkingsdatumLt,
        'verwerkingsdatum[lte]': verwerkingsdatumLte,
        'verwerkingsdatum[not]': verwerkingsdatumNot,
        volgnr,
        'volgnr[isempty]': volgnrIsempty,
        'volgnr[isnull]': volgnrIsnull,
        'volgnr[like]': volgnrLike,
        'volgnr[not]': volgnrNot,
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
export function varenOpafstapplaatsRetrieve(
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
    data: Varenopafstapplaats
  }>(
    `/v1/varen/opafstapplaats/${id}/${QS.query(
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
