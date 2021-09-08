import { generatePath } from 'react-router-dom'
import type { PartialLocation } from 'history'
import environment from './environment'
import { BEDIENING_PAGE, HEADER_LINK_HELP } from './shared/config/content-links'
import {
  documentCodeParam,
  fileNameParam,
  fileUrlParam,
} from './pages/ConstructionDossierPage/query-params'
import { ViewMode, viewParam } from './pages/MapPage/query-params'
import { routing } from './routes'
import toSearchParams from './shared/utils/toSearchParams'

export const toAddresses = (): PartialLocation => ({
  pathname: routing.addresses.path,
  search: toSearchParams([[viewParam, ViewMode.Full]]).toString(),
})

export const toArticleDetail = (id: string, slug: string): PartialLocation => ({
  pathname: generatePath(routing.articleDetail.path, { id, slug }),
})

export const toArticleSearch = (): PartialLocation => ({
  pathname: routing.articleSearch.path,
})

export const toCadastralObjects = (): PartialLocation => ({
  pathname: routing.cadastralObjects.path,
  search: toSearchParams([[viewParam, ViewMode.Full]]).toString(),
})

export const toCollectionDetail = (id: string, slug: string): PartialLocation => ({
  pathname: generatePath(routing.collectionDetail.path, { id, slug }),
})

export const toCollectionSearch = (): PartialLocation => ({
  pathname: routing.collectionSearch.path,
})

export const toConstructionDossier = (
  id: string,
  fileName?: string,
  fileUrl?: string,
  documentCode?: string,
): PartialLocation => {
  const pathname = generatePath(routing.constructionDossier.path, { id })
  const searchParams = new URLSearchParams()

  if (fileName) {
    searchParams.set(fileNameParam.name, fileName)
  }

  if (fileUrl) {
    searchParams.set(fileUrlParam.name, fileUrl)
  }

  if (documentCode) {
    searchParams.set(documentCodeParam.name, documentCode)
  }

  return { pathname, search: `?${searchParams.toString()}` }
}

export interface DataDetailParams {
  type: string
  subtype: string
  id: string
}

export const toDataDetail = ({ type, subtype, id }: DataDetailParams): PartialLocation => ({
  pathname: generatePath(routing.dataDetail.path, { type, subtype, id }),
  search: window.location.search,
})

export const toDataSearch = (): PartialLocation => ({
  pathname: routing.dataSearch.path,
})

export interface DatasetDetailParams {
  id: string
  slug: string
}

export const toDatasetDetail = ({ id, slug }: DatasetDetailParams): PartialLocation => ({
  pathname: generatePath(routing.datasetDetail.path, { id, slug }),
})

export const toDatasetSearch = (): PartialLocation => ({
  pathname: routing.datasetSearch.path,
})

export const toEstablishments = (): PartialLocation => ({
  pathname: routing.establishments.path,
  search: toSearchParams([[viewParam, ViewMode.Full]]).toString(),
})

// TODO: Rename this method to match the name of the route.
export const toGeoSearch = (): PartialLocation => ({
  pathname: routing.dataSearchGeo.path,
})

export const toHelpPage = () =>
  toArticleDetail(HEADER_LINK_HELP.id[environment.DEPLOY_ENV], HEADER_LINK_HELP.slug)

export const toBedieningPage = () =>
  toArticleDetail(BEDIENING_PAGE.id[environment.DEPLOY_ENV], BEDIENING_PAGE.slug)

export const toHome = (): PartialLocation => ({
  pathname: routing.home.path,
})

export const toMapSearch = (): PartialLocation => ({
  pathname: routing.mapSearch.path,
})

export const toNotFound = (): PartialLocation => ({
  pathname: routing.notFound.path,
})

export const toPublicationDetail = (id: string, slug: string): PartialLocation => ({
  pathname: generatePath(routing.publicationDetail.path, { id, slug }),
})

export const toPublicationSearch = (): PartialLocation => ({
  pathname: routing.publicationSearch.path,
})

export const toSearch = (): PartialLocation => ({
  pathname: routing.search.path,
})

export const toSpecialDetail = (id: string, type: string, slug: string): PartialLocation => ({
  pathname: generatePath(routing.specialDetail.path, { id, type, slug }),
})

export const toSpecialSearch = (): PartialLocation => ({
  pathname: routing.specialSearch.path,
})
