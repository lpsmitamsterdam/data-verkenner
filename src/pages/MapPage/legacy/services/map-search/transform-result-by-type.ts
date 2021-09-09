import categoryLabelsByType from './category-labels-by-type'
import { getStatusLabel, getStatusLabelAddress } from './status-labels'
import type { GeoSearchFeature } from '../../../../../api/geosearch'

const getDefault = (feature: GeoSearchFeature) => ({
  categoryLabel: categoryLabelsByType[feature.properties.type].singular,
  categoryLabelPlural: categoryLabelsByType[feature.properties.type].plural,
  label: feature.properties.display,
  parent: feature.properties.parent,
  type: feature.properties.type,
  uri: feature.properties.uri,
  statusLabel: getStatusLabel(feature.properties.type),
})

const getAddress = (item: GeoSearchFeature) => ({
  ...getDefault(item),
  isNevenadres: !item.hoofdadres,
  status: item.vbo_status,
  statusLabel: getStatusLabelAddress(item),
})

const getOpenbareRuimte = (item: GeoSearchFeature) => ({
  ...getDefault(item),
  statusLabel: item.properties.opr_type !== 'Weg' ? item.properties.opr_type : '',
})

const getParkeervak = (feature: GeoSearchFeature) => ({
  categoryLabel: categoryLabelsByType[feature.properties.type].singular,
  categoryLabelPlural: categoryLabelsByType[feature.properties.type].plural,
  label: feature.properties.display,
  parent: null,
  type: feature.properties.type,
  uri: feature.properties.uri,
  statusLabel: getStatusLabel(feature.properties.type),
})

const transformResultByType = (result: GeoSearchFeature) => {
  switch (result.properties.type) {
    case 'pand/address':
      return getAddress(result)

    case 'bag/openbareruimte':
      return getOpenbareRuimte(result)

    case 'parkeervakken/parkeervakken':
      return getParkeervak(result)

    default:
      return getDefault(result)
  }
}

export default transformResultByType
