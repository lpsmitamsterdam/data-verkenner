export const MAX_RESULTS = 50

export const TYPES = {
  ARTICLE: 'article',
  PUBLICATION: 'publication',
  SPECIAL: 'special',
}

export const cmsSearchQuery = `
    query CmsSearch($q: String!, $limit: Int, $from: Int, $types: [String!]) {
        cmsSearch(q: $q, input: {limit: $limit, from: $from, types: $types}) {
            totalCount
            results {
                type
                label
                totalCount
                results {
                    id
                    label
                    type
                    date
                    slug
                    intro
                    teaser
                    dateLocale
                    teaserImage
                    coverImage
                    specialType
                    link {
                        uri
                    }
                }
            }
        }
    }
`

export default cmsSearchQuery
