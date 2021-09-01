// eslint-disable-next-line import/no-extraneous-dependencies
import environment from '../../../../../../environment'
import { fetchWithToken, UrlParams } from '../../../../../utils/api/api'
import MAP_CONFIG from '../map.config'
import type { ExtendedMapGroup } from '../index'
import type { GeoSearchFeature, GeoSearchProperties } from '../../../../../../api/geosearch'
import getDetailPageData from '../../../../../utils/getDetailPageData'

// TODO: Replace this type with the 'LatLng' type from Leaflet.
interface Location {
  latitude: number
  longitude: number
}

const generateParams = (layer: ExtendedMapGroup, location: Location, zoom: number) => ({
  ...layer.detailParams,
  lat: location.latitude.toString(),
  lon: location.longitude.toString(),
  radius: layer.detailIsShape
    ? '0'
    : Math.round(2 ** (MAP_CONFIG.BASE_LAYER_OPTIONS.maxZoom - zoom) / 2).toString(),
})

const sortResults = (results: MapLayer[]) =>
  results.sort((a, b) => {
    if (a.detailIsShape && b.detailIsShape) {
      // @ts-ignore
      return a.distance - b.distance
    }
    if (!a.detailIsShape) {
      if (!b.detailIsShape) {
        // @ts-ignore
        return a.distance - b.distance
      }
      return -1
    }
    return 1
  })

export interface MapLayer extends GeoSearchProperties {
  detailIsShape?: boolean
  id: string
}

const retrieveLayers = (detailItems: GeoSearchFeature[], detailIsShape?: boolean): MapLayer[] =>
  detailItems.map((item) => {
    const { type, subtype, id } = getDetailPageData(item.properties.uri)

    let newType = type
    let newSubType = subtype

    // Todo: find out why we need to make this translation
    if (newType === 'kadaster') {
      newType = 'brk'

      if (newSubType === 'kadastraal_object') {
        newSubType = 'object'
      }
    }

    return {
      detailIsShape,
      ...item.properties,
      id,
      type: newType,
      subType: newSubType,
    }
  })

export default async function fetchNearestDetail(
  location: Location,
  layers: ExtendedMapGroup[],
  zoom: number,
) {
  const results = sortResults(
    (
      await Promise.all(
        layers
          .filter((layer) => layer.detailUrl)
          .map(async (layer) => {
            const params = generateParams(layer, location, zoom) as UrlParams
            const result = await fetchWithToken(
              `${environment.API_ROOT}${layer.detailUrl as string}`,
              params,
            )

            return retrieveLayers(result.features, layer.detailIsShape ?? false)
          }),
      )
    ).reduce((a, b) => [...a, ...b]),
  )
  return results[0] ?? null
}
