import normalize from 'json-api-normalize'

export const getType = type => type && type.replace('node--', '')

function getNormalizedItem(item, extraData = {}) {
  // Make sure the correct fields have data here to be used by useNormalizedCMSResults()
  return {
    ...extraData,
    ...item,
    type: getType(item.type),
    intro: item.field_intro,
    short_title: item.field_short_title,
    uuid: item.id,
    media_image_url: item.field_cover_image
      ? item.field_cover_image.field_media_image.uri.url
      : item.media_image_url,
    teaser_url: item.field_teaser_image
      ? item.field_teaser_image.field_media_image.uri.url
      : item.teaser_url,
  }
}

export const reformatJSONApiResults = normalizedData => {
  // In case of a Drupal collection resource the returned data will include several objects that need to be normalized
  if (normalizedData.field_items && !normalizedData.field_blocks) {
    return normalizedData.field_items.map(item => getNormalizedItem(item, normalizedData))
  }

  // Todo: Need to refactor this when we really know what types and fields to expect from the CMS
  // This if-statement is an "exeption" for the CollectionDetail pages.
  if (normalizedData.field_items && normalizedData.field_blocks) {
    return {
      ...normalizedData,
      field_blocks: normalizedData.field_blocks.map(fieldBlock => ({
        ...fieldBlock,
        field_content: fieldBlock.field_content.map(item => getNormalizedItem(item)),
      })),
      field_items: normalizedData.field_items.map(item => getNormalizedItem(item)),
    }
  }

  // When a single Drupal resource has been requested return different normalized results
  return getNormalizedItem(normalizedData)
}

const cmsJsonApiNormalizer = (data, fields) => {
  const normalizedData = normalize(data).get(['id', 'title', 'body', 'created', 'type', ...fields])
  return reformatJSONApiResults(normalizedData)
}

export default cmsJsonApiNormalizer
