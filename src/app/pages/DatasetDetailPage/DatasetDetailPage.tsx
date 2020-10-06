/* eslint-disable global-require */
import React, { FunctionComponent } from 'react'
// @ts-ignore
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import {
  Alert,
  breakpoint,
  Button,
  Column,
  Container,
  CustomHTMLBlock,
  Link,
  Row,
} from '@amsterdam/asc-ui'
import removeMd from 'remove-markdown'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import styled from 'styled-components'
import { getApiSpecificationData } from '../../../shared/ducks/datasets/datasets'
import { getDetailData, isDetailLoading } from '../../../shared/ducks/detail/selectors'
import linkAttributesFromAction from '../../../shared/services/link-attributes-from-action/linkAttributesFromAction'
import { toDatasetDetail } from '../../../store/redux-first-router/actions'
import ShareBar from '../../components/ShareBar/ShareBar'
import toSlug from '../../utils/toSlug'
import redirectToDcatd from '../../utils/redirectToDcatd'
import isDefined from '../../../shared/services/is-defined'
import isObject from '../../../shared/services/is-object'
import formatDate from '../../../shared/services/date-formatter/date-formatter'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import DefinitionList, { DefinitionListItem } from '../../components/DefinitionList'

function kebabCase(input?: string) {
  return input ? input.toLowerCase().replace(/[: ][ ]*/g, '-') : ''
}

const optionLabel = (input: string, list: { id: string; label: string }[], namespace?: string) => {
  // returns the label of an option from an option list
  // the list array elements contain at least the id and label properties
  const prefix = isDefined(namespace) ? `${namespace}:` : ''
  const index = list && list.findIndex((item) => prefix + item.id === input)
  return index > -1 ? list[index].label : input
}

const getDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('nl-NL', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const getFileSize = (bytes: number) => {
  const precision = 1 // single decimal
  const base = 1024
  const log1024 = Math.log(base)
  const cutOff = 0.1 * 1024 * 1024 // 0.1 MB
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB'] // bytes and KB units not used
  const smallestUnit = 2 // index of units, === 'MB'
  const largestUnit = units.length - 1 // index of units, === 'TB'

  // @ts-ignore
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-'
  if (bytes < cutOff) {
    return '< 0,1 MB'
  }

  let power = Math.floor(Math.log(bytes) / log1024)

  // Use MB as smallest unit
  // e.g.: Change 200 KB to 0.2 MB
  power = Math.max(power, smallestUnit)

  // Do not exceed highest unit
  power = Math.min(power, largestUnit)

  const number = (bytes / base ** power).toFixed(precision)
  return `${number.toLocaleString()} ${units[power]}`
}

const getTimePeroid = (input: { ['time:hasBeginning']: string } | string) => {
  if (isObject(input)) {
    const startDate = input['time:hasBeginning'] && new Date(input['time:hasBeginning'])
    const endDate = input['time:hasEnd'] && new Date(input['time:hasEnd'])
    const result = startDate ? `${formatDate(startDate)} ` : ''

    return endDate ? `${result}tot ${formatDate(endDate)}` : result
  }

  return ''
}

// Todo: remove when Typography is aligned https://github.com/Amsterdam/amsterdam-styled-components/issues/727
const StyledCustomHTMLBlock = styled(CustomHTMLBlock)`
  & * {
    @media screen and ${breakpoint('min-width', 'laptop')} {
      font-size: 16px !important;
      line-height: 22px !important;
    }
  }
`
const Content = styled.div`
  width: 100%;
`

const DatasetDetailPage: FunctionComponent = () => {
  const { trackEvent } = useMatomo()
  const isLoading = useSelector(isDetailLoading)
  const catalogFilters = useSelector(getApiSpecificationData)
  const results = useSelector(getDetailData)
  const description = results['dct:description'] ?? null
  const action =
    !isLoading && results
      ? linkAttributesFromAction(
          toDatasetDetail({
            id: results['dct:identifier'],
            slug: toSlug(results['dct:title']),
          }),
        )
      : null

  const DefList = !isLoading
    ? [
        {
          term: 'Doel',
          content: <StyledCustomHTMLBlock body={results['overheid:doel']} />,
        },
        {
          term: 'Meer informatie',
          content: results['dcat:landingPage'] && (
            <Link href={results['dcat:landingPage']} title={results['dcat:landingPage']}>
              {results['dcat:landingPage']}
            </Link>
          ),
        },
        {
          term: 'Publicatiedatum',
          content: getDate(results['foaf:isPrimaryTopicOf']['dct:issued']),
        },
        {
          term: 'Wijzigingsdatum',
          content: getDate(results['ams:sort_modified']),
        },
        {
          term: 'Wijzigingsfrequentie',
          content: optionLabel(
            results['dct:accrualPeriodicity'],
            catalogFilters.accrualPeriodicities,
          ),
        },
        {
          term: 'Tijdsperiode',
          content: getTimePeroid(results['dct:temporal']),
        },
        {
          term: 'Omschrijving gebied',
          content: results['ams:spatialDescription'],
        },
        {
          term: 'Coördinaten gebied',
          content: results['dct:spatial'],
        },
        {
          term: 'Gebiedseenheid',
          content: optionLabel(results['ams:spatialUnit'], catalogFilters.spatialUnits),
        },
        {
          term: 'Juridische grondslag',
          content: <StyledCustomHTMLBlock body={results['overheid:grondslag']} />,
        },
        {
          term: 'Taal',
          content: optionLabel(results['dct:language'].split(':')[1], catalogFilters.languages),
        },
        {
          term: 'Eigenaar',
          content: optionLabel(results['ams:owner'], catalogFilters.owners),
        },
        {
          term: 'Inhoudelijk contactpersoon',
          content: (
            <div>
              {results['dcat:contactPoint']['vcard:hasEmail'] && (
                <Link
                  inList
                  title={results['dcat:contactPoint']['vcard:fn']}
                  href={`mailto:${results['dcat:contactPoint']['vcard:hasEmail']}`}
                >
                  {results['dcat:contactPoint']['vcard:fn']} (
                  {results['dcat:contactPoint']['vcard:hasEmail']})
                </Link>
              )}
              {!results['dcat:contactPoint']['vcard:hasEmail'] &&
                results['dcat:contactPoint']['vcard:fn'] && (
                  <span>{results['dcat:contactPoint']['vcard:fn']}</span>
                )}
              {results['dcat:contactPoint']['vcard:hasURL'] && (
                <Link
                  inList
                  href={results['dcat:contactPoint']['vcard:hasURL']}
                  title={results['dcat:contactPoint']['vcard:hasURL']}
                >
                  {results['dcat:contactPoint']['vcard:hasURL']}
                </Link>
              )}
            </div>
          ),
        },
        {
          term: 'Technisch contactpersoon',
          content: (
            <div>
              {results['dct:publisher']['foaf:mbox'] && (
                <Link
                  inList
                  href={`mailto:${results['dct:publisher']['foaf:mbox']}`}
                  title={results['dct:publisher']['foaf:name']}
                >
                  {results['dct:publisher']['foaf:name']} ({results['dct:publisher']['foaf:mbox']})
                </Link>
              )}
              {!results['dct:publisher']['foaf:mbox'] && results['dct:publisher']['foaf:name'] && (
                <span>{results['dct:publisher']['foaf:name']}</span>
              )}
              {results['dct:publisher']['foaf:homepage'] && (
                <Link
                  inList
                  href={results['dct:publisher']['foaf:homepage']}
                  title={results['dct:publisher']['foaf:homepage']}
                >
                  {results['dct:publisher']['foaf:homepage']}
                </Link>
              )}
            </div>
          ),
        },
      ]
    : []

  return (
    <div className="qa-detail">
      <Helmet>
        {action && action.href && <link rel="canonical" href={action.href} />}
        {description && <meta name="description" content={description} />}
      </Helmet>
      <ContentContainer>
        <Container>
          <Row>
            {!isLoading && (
              <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
                <Content className="dataset-detail">
                  <div className="o-header">
                    <h3 className="o-header__subtitle">
                      <span>Dataset</span>
                      {results.canEditDataset && (
                        <div className="o-header__buttongroup">
                          <Button
                            type="button"
                            className="dcatd-button--edit"
                            onClick={() => redirectToDcatd(results.editDatasetId)}
                          >
                            Wijzigen
                            <span className="u-sr-only">Wijzigen</span>
                          </Button>
                        </div>
                      )}
                    </h3>
                    <h2 className="o-header__title u-margin__bottom--3 ">{results['dct:title']}</h2>
                  </div>
                  <StyledCustomHTMLBlock body={results['dct:description']} />

                  <div>
                    {results['ams:status'] === 'gepland' ||
                      results['ams:status'] === 'in_onderzoek' ||
                      (results['ams:status'] === 'niet_beschikbaar' && (
                        <Alert>
                          {results['ams:status'] === 'gepland' && (
                            <span>Deze dataset is gepland.</span>
                          )}
                          {results['ams:status'] === 'in_onderzoek' && (
                            <span>De correctheid van deze dataset wordt momenteel onderzocht.</span>
                          )}
                          {results['ams:status'] === 'niet_beschikbaar' && (
                            <span>Deze dataset is momenteel niet beschikbaar.</span>
                          )}
                        </Alert>
                      ))}
                  </div>

                  <h3 className="o-header__subtitle">Resources</h3>

                  <div className="resources">
                    {results.resources.map((resourceType: any) => (
                      <div className="resources-type" key={resourceType.type}>
                        <div className="resources-type__header">
                          <h4 className="resources-type__header-title">
                            {optionLabel(resourceType.type, catalogFilters.resourceTypes)}
                          </h4>
                        </div>
                        {resourceType.rows.map((resource: any) => (
                          <div className="resources-type__content" key={resource['dc:identifier']}>
                            <div className="resources-type__content-item">
                              <a
                                className="resources-item"
                                href={resource['ams:purl']}
                                rel="noreferrer"
                                target="_blank"
                                onClick={() => {
                                  trackEvent({
                                    category: 'Download',
                                    action: results['dct:title'],
                                    name: resource['ams:purl'],
                                  })
                                }}
                              >
                                <div className="resources-item__left">
                                  <div className="resources-item__title">
                                    {resource['dct:title']}
                                  </div>

                                  <div className="resources-item__description">
                                    {resource['ams:distributionType'] === 'file' && (
                                      <span
                                        className={`c-data-selection-file-type
                                                 c-data-selection-file-type__name
                                                 c-data-selection-file-type__format-${kebabCase(
                                                   optionLabel(
                                                     resource['dcat:mediaType'],
                                                     catalogFilters.formatTypes,
                                                   ),
                                                 )}`}
                                      >
                                        {optionLabel(
                                          resource['dcat:mediaType'],
                                          catalogFilters.formatTypes,
                                        )}
                                      </span>
                                    )}
                                    {resource['ams:distributionType'] === 'api' && (
                                      <span
                                        className={`c-data-selection-file-type
                                                 c-data-selection-file-type__name
                                                 c-data-selection-file-type__format-${kebabCase(
                                                   optionLabel(
                                                     resource['ams:serviceType'],
                                                     catalogFilters.serviceTypes,
                                                   ),
                                                 )}`}
                                      >
                                        {optionLabel(
                                          resource['ams:serviceType'],
                                          catalogFilters.serviceTypes,
                                        )}
                                      </span>
                                    )}
                                    {resource['ams:distributionType'] === 'web' && (
                                      <span
                                        className={`c-data-selection-file-type
                                                 c-data-selection-file-type__name
                                                 c-data-selection-file-type__format-${optionLabel(
                                                   resource['ams:distributionType'],
                                                   catalogFilters.distributionTypes,
                                                 )}`}
                                      >
                                        {optionLabel(
                                          resource['ams:distributionType'],
                                          catalogFilters.distributionTypes,
                                        )}
                                      </span>
                                    )}
                                    <div>
                                      {resource['dct:description']
                                        ? removeMd(resource['dct:description'])
                                        : resource['ams:purl']}
                                    </div>
                                  </div>
                                </div>
                                <div className="resources-item__right">
                                  <div className="resources-item__modified">
                                    {resource['dct:modified'] && (
                                      <span>gewijzigd op {getDate(resource['dct:modified'])}</span>
                                    )}
                                  </div>
                                  <div className="resources-item__navigation">
                                    {resource['dcat:byteSize'] > 0 && (
                                      <div className="resources-item__navigation-file-size">
                                        {getFileSize(resource['dcat:byteSize'])}
                                      </div>
                                    )}
                                    <div className="resources-item__navigation-arrow" />
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="o-header__subtitle">Details</h3>

                    <DefinitionList>
                      {DefList.map(({ term, content }) => (
                        <DefinitionListItem term={term}>{content}</DefinitionListItem>
                      ))}
                    </DefinitionList>
                  </div>

                  <div className="c-detail__block u-padding__bottom--1 u-margin__top--3">
                    <h3 className="o-header__subtitle">Thema&apos;s</h3>

                    <div className="catalog-themes">
                      {results['dcat:theme'].map((group: string) => (
                        <div className="catalog-theme" key={group}>
                          <span className="catalog-theme__detail-icon--{{group.substring(6)}} catalog-theme__label">
                            {optionLabel(group.split(':')[1], catalogFilters.groupTypes)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="c-detail__block u-padding__bottom--1">
                    <h3 className="o-header__subtitle">Tags</h3>
                    <ul>
                      {results['dcat:keyword'].map((tag: string) => (
                        <li className="u-inline" key={tag}>
                          <div className="dataset-tag">
                            <i className="dataset-tag__arrow" />
                            <span className="dataset-tag__label">{capitalizeFirstLetter(tag)}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="c-detail__block u-padding__bottom--1">
                    <h3 className="o-header__subtitle">Licentie</h3>
                    {results['ams:license'] && (
                      <div>{optionLabel(results['ams:license'], catalogFilters.licenseTypes)}</div>
                    )}
                  </div>
                </Content>
              </Column>
            )}
            <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
              <ShareBar />
            </Column>
          </Row>
        </Container>
      </ContentContainer>
    </div>
  )
}

export default DatasetDetailPage
