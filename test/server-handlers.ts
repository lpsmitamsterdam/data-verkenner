/* eslint-disable global-require,@typescript-eslint/no-var-requires */

import { rest } from 'msw'
import joinUrl from '../src/app/utils/joinUrl'
import environment from '../src/environment'

const typeaheadUrl = joinUrl([environment.API_ROOT, 'typeahead'])
const iiifMetadataUrl = joinUrl([environment.API_ROOT, 'iiif-metadata/bouwdossier', ':id'])
const dcatDatasetsUrl = joinUrl([environment.API_ROOT, 'dcatd/datasets', ':id'])
const dcatDatasetFiltersUrl = joinUrl([environment.API_ROOT, 'dcatd/openapi'])
const stadsdeelUrl = joinUrl([environment.API_ROOT, 'gebieden/stadsdeel', ':id'])
const cmsListDataUrl = joinUrl([environment.CMS_ROOT, 'jsonapi/node/list', ':id'])
const cmsGraphQlUrl = joinUrl([environment.API_ROOT, 'cms_search/graphql'])
const cmsNotificationUrl = joinUrl([environment.CMS_ROOT, 'jsonapi/node/notification'])

const handlers = [
  rest.get(typeaheadUrl, async (req, res, ctx) => {
    const typeaheadFixture = require('../src/api/typeahead/typeahead.json')

    return res(ctx.json(typeaheadFixture))
  }),

  rest.get(iiifMetadataUrl, async (req, res, ctx) => {
    const bouwdossierFixture = require('../src/api/iiif-metadata/bouwdossier').singleFixture

    return res(ctx.json(bouwdossierFixture))
  }),

  rest.get(dcatDatasetsUrl, async (req, res, ctx) => {
    const datasetsFixture = require('../src/api/dcatd/datasets').singleFixture

    return res(ctx.json(datasetsFixture))
  }),

  rest.get(dcatDatasetFiltersUrl, async (req, res, ctx) => {
    const datasetFiltersFixture = require('../src/api/dcatd/openapi').singleFixture

    return res(ctx.json(datasetFiltersFixture))
  }),

  rest.get(stadsdeelUrl, async (req, res, ctx) => {
    const stadsdeelFixture = require('../src/api/gebieden/stadsdeel').singleFixture

    return res(ctx.json(stadsdeelFixture))
  }),

  rest.get(cmsListDataUrl, async (req, res, ctx) => {
    const cmsListFixture = require('../src/api/cms/list.json')

    return res(ctx.json(cmsListFixture))
  }),

  rest.post(cmsGraphQlUrl, async (req, res, ctx) => {
    const cmsThemesFixture = require('../src/api/cms/themes.json')

    return res(ctx.json(cmsThemesFixture))
  }),

  rest.get(cmsNotificationUrl, async (req, res, ctx) => {
    const cmsNotificationFixture = require('../src/api/cms/notification.json')

    return res(ctx.json(cmsNotificationFixture))
  }),
]

export default handlers
