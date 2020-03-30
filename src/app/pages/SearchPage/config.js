import { CmsType } from '../../../shared/config/cms.config'
import {
  toArticleSearch,
  toCollectionSearch,
  toDataSearch,
  toDatasetSearch,
  toMapCollectionSearch,
  toMapLayerSearch,
  toPublicationSearch,
  toSearch,
  toSpecialSearch,
} from '../../../store/redux-first-router/actions'
import EditorialResults from '../../components/EditorialResults'
import { routing } from '../../routes'
import DataSearchResults from './DataSearchResults'
import DatasetSearchResults from './DatasetSearchResults'
import {
  articleSearchQuery,
  collectionSearchQuery,
  dataSearchQuery,
  datasetSearchQuery,
  mapCollectionSearchQuery,
  mapLayerSearchQuery,
  publicationSearchQuery,
  searchQuery,
  specialSearchQuery,
} from './documents.graphql'
import MapCollectionSearchResults from './MapCollectionSearchResults'
import MapLayerSearchResults from './MapLayerSearchResults'

export const MAX_RESULTS = 50
export const DEFAULT_LIMIT = 10

export const DATA_FILTERS = 'dataTypes'

export const TYPES = {
  SEARCH: 'search',
  DATA: 'data',
  DATASET: 'dataset',
  MAP_COLLECTION: 'mapcollection',
  MAP_LAYER: 'maplayer',
}

// This object is used to define the sort order of the search page
const SEARCH_TYPES_CONFIG = {
  [routing.collectionSearch.page]: {
    resolver: 'collectionSearch',
    query: collectionSearchQuery,
    to: toCollectionSearch,
    label: routing.collectionSearch.title,
    type: CmsType.Collection,
    component: EditorialResults,
  },
  [routing.mapLayerSearch.page]: {
    resolver: 'mapLayerSearch',
    query: mapLayerSearchQuery,
    to: toMapLayerSearch,
    label: routing.mapLayerSearch.title,
    type: TYPES.MAP_LAYER,
    component: MapLayerSearchResults,
  },
  [routing.mapCollectionSearch.page]: {
    resolver: 'mapCollectionSearch',
    query: mapCollectionSearchQuery,
    to: toMapCollectionSearch,
    label: routing.mapCollectionSearch.title,
    type: TYPES.MAP_COLLECTION,
    component: MapCollectionSearchResults,
  },
  [routing.specialSearch.page]: {
    resolver: 'specialSearch',
    query: specialSearchQuery,
    to: toSpecialSearch,
    label: routing.specialSearch.title,
    type: CmsType.Special,
    component: EditorialResults,
  },
  [routing.dataSearch.page]: {
    resolver: 'dataSearch',
    query: dataSearchQuery,
    to: toDataSearch,
    label: routing.dataSearch.title,
    type: TYPES.DATA,
    component: DataSearchResults,
  },
  [routing.datasetSearch.page]: {
    resolver: 'datasetSearch',
    query: datasetSearchQuery,
    to: toDatasetSearch,
    label: routing.datasetSearch.title,
    type: TYPES.DATASET,
    component: DatasetSearchResults,
  },
  [routing.publicationSearch.page]: {
    resolver: 'publicationSearch',
    query: publicationSearchQuery,
    to: toPublicationSearch,
    label: routing.publicationSearch.title,
    type: CmsType.Publication,
    component: EditorialResults,
  },
  [routing.articleSearch.page]: {
    resolver: 'articleSearch',
    query: articleSearchQuery,
    to: toArticleSearch,
    label: routing.articleSearch.title,
    type: CmsType.Article,
    component: EditorialResults,
  },
}

export const EDITORIAL_SEARCH_PAGES = [
  routing.publicationSearch.page,
  routing.specialSearch.page,
  routing.articleSearch.page,
  routing.collectionSearch.page,
]

export default {
  [routing.search.page]: {
    // The all search results page calls the resolver for each search type
    resolver: Object.values(SEARCH_TYPES_CONFIG).map(({ resolver }) => resolver),
    to: toSearch,
    query: searchQuery,
    label: routing.search.title,
    type: TYPES.SEARCH,
  },
  ...SEARCH_TYPES_CONFIG,
}
