import {
  dataSearchQuery,
  datasetSearchQuery,
  searchQuery,
  articleSearchQuery,
  publicationSearchQuery,
  specialSearchQuery,
  collectionSearchQuery,
} from './documents.graphql'

import {
  toSearch,
  toPublicationSearch,
  toArticleSearch,
  toSpecialSearch,
  toDataSearch,
  toDatasetSearch,
  toCollectionSearch,
} from '../../../store/redux-first-router/actions'
import { routing } from '../../routes'
import { CmsType } from '../../../shared/config/cms.config'
import EditorialResults from '../../components/EditorialResults'
import DataSearchResults from './DataSearchResults'
import DatasetSearchResults from './DatasetSearchResults'

export const MAX_RESULTS = 50
export const DEFAULT_LIMIT = 10

export const DATA_FILTERS = 'dataTypes'

export const TYPES = {
  SEARCH: 'search',
  DATA: 'data',
  DATASET: 'dataset',
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
