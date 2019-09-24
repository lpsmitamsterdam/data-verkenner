import SHARED_CONFIG from '../shared-config/shared-config'

const cmsConfig = {
  ARTICLE: {
    type: 'article',
    endpoint: id =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/article/${id}?include=field_cover_image.field_media_image,field_downloads.field_file.field_media_file`,
    fields: [
      'field_cover_image.field_media_image.uri',
      'field_downloads',
      'field_downloads.title',
      'field_downloads.drupal_internal__nid',
      'field_downloads.field_file_type',
      'field_downloads.field_file_size',
      'field_downloads.field_file.field_media_file.uri',
      'field_links',
      'field_byline',
      'field_slug',
      'field_intro',
      'field_publication_date',
    ],
  },
  ARTICLES: {
    type: 'article',
    endpoint: () => `${SHARED_CONFIG.API_ROOT}cms_search/search/article`,
  },
  PUBLICATION: {
    type: 'publication',
    endpoint: id =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/publication/${id}?include=field_cover_image.field_media_image,field_file.field_media_file`,
    fields: [
      'field_cover_image.field_media_image.uri',
      'field_file.field_media_file.uri',
      'field_file_size',
      'field_file_type',
      'field_publication_source',
      'field_intro',
      'field_slug',
      'field_publication_year',
      'field_publication_month',
      'field_publication_day',
    ],
  },
  PUBLICATIONS: {
    type: 'publication',
    endpoint: () => `${SHARED_CONFIG.API_ROOT}cms_search/search/publication`,
  },
  SPECIAL: {
    type: 'special',
    endpoint: id => `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/special/${id}`,
    fields: ['field_iframe_link', 'field_slug', 'field_special_type'],
  },
  SPECIALS: {
    type: 'special',
    endpoint: () => `${SHARED_CONFIG.API_ROOT}cms_search/search/special`,
  },
  HOME_SPECIALS: {
    type: 'home',
    endpoint: () =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/list/fffa0199-9a9a-4cce-86c4-7fe7bfed21a0?include=field_items.field_teaser_image.field_media_image&sort=-created`,
    fields: [
      'field_items.title',
      'field_items.field_teaser_image.field_media_image.uri',
      'field_items.field_slug',
      'field_items.field_special_type',
      'field_items.field_teaser',
    ],
  },
  HOME_ORGANIZATION: {
    type: 'home',
    endpoint: () =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/list/d1500833-cdac-4e4b-9914-a67f1fbaccbe?include=field_items&sort=-created`,
    fields: ['field_items.title', 'field_items.field_teaser'],
  },
  HOME_ABOUT: {
    type: 'home',
    endpoint: () =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/list/bb27218f-8fa3-40cc-8c23-8aae8eab445d?include=field_items&sort=-created`,
    fields: ['field_items.title', 'field_items.field_teaser'],
  },
  HOME_ABOUT_DATA: {
    type: 'home',
    endpoint: () =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/list/d9f076f2-74e6-4f5c-94c1-d95f2be1f2e0?include=field_items&sort=-created`,
    fields: ['field_items.title', 'field_items.field_teaser'],
  },
  HOME_HIGHLIGHT: {
    type: 'home',
    endpoint: () =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/list/fffa0199-9a9a-4cce-86c4-7fe7bfed21a0?include=field_items.field_teaser_image.field_media_image&sort=-created`,
    fields: [
      'field_items.title',
      'field_items.field_teaser_image.field_media_image.uri',
      'field_items.field_slug',
      'field_items.field_special_type',
      'field_items.field_teaser',
    ],
  },
}

export default cmsConfig
