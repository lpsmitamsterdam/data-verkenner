// eslint-disable-next-line import/no-extraneous-dependencies
import center from '@turf/center'
// eslint-disable-next-line import/no-extraneous-dependencies
import type { Geometry, Position } from 'geojson'
import type { LatLngLiteral } from 'leaflet'
import { fetchWithToken } from '../../../../../utils/api/api'
import type { DetailInfo, DetailResult } from '../../types/details'
import { RD, WGS84 } from '../crs-config'
import type { ServiceDefinition } from '../map-services.config'
import { getDetailUrl } from './getDetailUrl'
import { getAccessToken } from '../../../../../utils/auth/auth'

// TODO: Write some tests for this method.

export interface DetailResponse {
  data: any
  geometrie?: Geometry
  geometry?: Geometry
  location?: LatLngLiteral
  _display?: LatLngLiteral
}

/**
 * Retrieves detail data for a specific id from the service definition and applies any normalization if needed.
 *
 * @param serviceDefinition The service definition to retrieve the map detail with.
 * @param id The id of the map details item.
 */
export async function fetchDetailData(
  serviceDefinition: ServiceDefinition,
  id: string,
): Promise<DetailResponse> {
  // TODO: Handle a possibly 'unauthorized' scenario.

  const detailUrl = getDetailUrl(serviceDefinition, id)
  // TODO: Remove this when we no longer have v1 endpoints.
  const supportsCrs = serviceDefinition.endpoint?.startsWith('v1')
  // Add request headers to retrieve coordinates in WGS84.
  const headers = new Headers(supportsCrs ? { 'Accept-Crs': 'EPSG:4258' } : undefined)
  // TODO: Fetching logic should be added to the service definition in order to make this code type-safe.
  const responseData = await fetchWithToken(
    detailUrl,
    undefined,
    undefined,
    undefined,
    headers,
    getAccessToken(),
  )

  const normalizedData = (await serviceDefinition.normalization?.(responseData)) ?? responseData

  // TODO: Once fetching logic becomes part of the service definition it should always return the 'geometry' uniformly.
  let geometry: Geometry | undefined =
    responseData.geometrie ||
    // eslint-disable-next-line no-underscore-dangle
    responseData._geometrie ||
    responseData.geometry ||
    normalizedData.geometry

  // Convert RD geometry to standard WGS84.
  if (!supportsCrs && geometry) {
    geometry = await convertGeometry(geometry)
  }

  if (geometry?.type === 'GeometryCollection') {
    throw new Error(
      `Unable to fetch map details, cannot parse geometry of type '${geometry.type}'.`,
    )
  }

  const centerCoordinates = geometry ? center(geometry as any).geometry?.coordinates : undefined

  if (!centerCoordinates && geometry) {
    throw new Error('Unable to fetch map details, cannot parse center of geometry.')
  }

  return {
    data: normalizedData,
    geometry,
    location:
      centerCoordinates &&
      ({
        lng: centerCoordinates[0],
        lat: centerCoordinates[1],
      } as LatLngLiteral),
  }
}

export interface MapDetails {
  data: DetailResult
  geometry?: Geometry
  geometrie?: Geometry
  location?: LatLngLiteral
}

/**
 * Converts the detail data response to one that can be displayed in the detail pages.
 *
 * @param serviceDefinition The service definition to use to convert the response.
 * @param response The response to convert.
 * @param detailInfo Object containing id, type and subType (eg. { id: '123', type: 'bag', subType: 'adressen'})
 */
export async function toMapDetails(
  serviceDefinition: ServiceDefinition,
  { data, location, geometry }: DetailResponse,
  detailInfo: DetailInfo,
): Promise<MapDetails> {
  const detailData = serviceDefinition.mapDetail(data, detailInfo, location)
  const dataResult = detailData instanceof Promise ? await detailData : detailData
  return {
    data: dataResult,
    // Todo: remove 'geometrie' when new map is in use
    geometrie: geometry,
    geometry,
    location,
  }
}

/**
 * Converts geometry that is in the Rijksdriehoek format to standard WGS84.
 *
 * @param geometry The geometry to convert.
 */
async function convertGeometry(geometry: Geometry): Promise<Geometry> {
  if (geometry.type === 'GeometryCollection') {
    const geometries = await Promise.all(geometry.geometries.map(convertGeometry))

    return {
      ...geometry,
      geometries,
    }
  }

  return {
    ...geometry,
    coordinates: await convertPositions(geometry.coordinates),
  } as Geometry
}

type ValueOrArray<T> = T | Array<ValueOrArray<T>>

/**
 * Converts positions in the Rijksdriehoek format to WGS84.
 *
 * @param positions The positions to convert.
 */
async function convertPositions(
  positions: ValueOrArray<Position>,
): Promise<ValueOrArray<Position>> {
  if (isPosition(positions)) {
    const proj4 = await loadProj4()
    return proj4(RD.projection, WGS84.projection, positions)
  }

  return Promise.all(positions.map(convertPositions))
}

function isPosition(position: ValueOrArray<Position>): position is Position {
  return typeof position[0] === 'number'
}

// Load PROJ4 dynamically to reduce bundle size, since only a few API endpoint return RD coordinates this is not a problem.
async function loadProj4() {
  return (await import(/* webpackChunkName: "PROJ4" */ 'proj4')).default
}
