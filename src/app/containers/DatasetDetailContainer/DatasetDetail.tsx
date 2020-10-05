/* eslint-disable global-require */
import React from 'react'
import { Alert, Row, Container, Button } from '@amsterdam/asc-ui'
import removeMd from 'remove-markdown'
import { Helmet } from 'react-helmet'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import ShareBar from '../../components/ShareBar/ShareBar'
import isDefined from '../../../shared/services/is-defined'
import isObject from '../../../shared/services/is-object'
import formatDate from '../../../shared/services/date-formatter/date-formatter'
import redirectToDcatd from '../../utils/redirectToDcatd'

/**
 * Todo: DI-1176. This page has been migrated from legacy angularjs code. This file however requires
 * a proper clean-up
 */

type CatalogFilters = {
  id: string
  label: string
}

type Props = {
  isLoading: boolean
  catalogFilters: { [label: string]: CatalogFilters[] }
  results: any
  action?: { href: string }
  description: string
}

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

const DatasetDetail: React.FC<Props> = ({
  isLoading,
  catalogFilters,
  results,
  action,
  description,
}) => {
  const { trackEvent } = useMatomo()

  return (
    <div className="c-dashboard__content qa-detail">
      <Container>
        <Row>
          <Helmet>
            {action && action.href && <link rel="canonical" href={action.href} />}
            {description && <meta name="description" content={description} />}
          </Helmet>
          {!isLoading && (
            <div className="u-grid dataset-detail">
              <div className="u-row u-margin__bottom--2">
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
                <span
                  className="dataset-detail__description"
                  dangerouslySetInnerHTML={{ __html: results['dct:description'] }}
                />
              </div>

              <div className="u-row u-margin__bottom--2">
                <div className="u-col-md--12">
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
              </div>

              <div className="u-row u-margin__bottom--3">
                <div className="u-col-md--12">
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
                </div>
              </div>

              <div className="c-detail__block">
                <div className="u-col-md--12">
                  <h3 className="o-header__subtitle">Details</h3>

                  <dl className="c-key-value-list">
                    <dt>Doel</dt>
                    <dd
                      className="c-key-value-md dataset-detail__description"
                      dangerouslySetInnerHTML={{ __html: results['overheid:doel'] || '' }}
                    />
                    <dt>Meer informatie</dt>
                    <dd>
                      {results['dcat:landingPage'] && (
                        <a href={results['dcat:landingPage']} className="o-btn o-btn--link">
                          {results['dcat:landingPage']}
                        </a>
                      )}
                    </dd>
                    <dt>Publicatiedatum</dt>
                    <dd>{getDate(results['foaf:isPrimaryTopicOf']['dct:issued'])}</dd>
                    <dt>Wijzigingsdatum</dt>
                    <dd>{getDate(results['ams:sort_modified'])}</dd>
                    <dt>Wijzigingsfrequentie</dt>
                    <dd>
                      {optionLabel(
                        results['dct:accrualPeriodicity'],
                        catalogFilters.accrualPeriodicities,
                      )}
                    </dd>
                    <dt>Tijdsperiode</dt>
                    <dd>{getTimePeroid(results['dct:temporal'])}</dd>
                    <dt>Tijdseenheid</dt>
                    <dd>
                      {optionLabel(results['ams:temporalUnit'], catalogFilters.temporalUnits)}
                    </dd>
                    <dt>Omschrijving gebied</dt>
                    <dd>{results['ams:spatialDescription']}</dd>
                    <dt>Coördinaten gebied</dt>
                    <dd>{results['dct:spatial']}</dd>
                    <dt>Gebiedseenheid</dt>
                    <dd>{optionLabel(results['ams:spatialUnit'], catalogFilters.spatialUnits)}</dd>
                    <dt>Juridische grondslag</dt>
                    <dd
                      className="c-key-value-md dataset-detail__description"
                      dangerouslySetInnerHTML={{ __html: results['overheid:grondslag'] }}
                    />
                    <dt>Taal</dt>
                    <dd>
                      {optionLabel(results['dct:language'].split(':')[1], catalogFilters.languages)}
                    </dd>
                    <dt>Eigenaar</dt>
                    <dd>{optionLabel(results['ams:owner'], catalogFilters.owners)}</dd>
                    <dt>Inhoudelijk contactpersoon</dt>
                    <dd>
                      <div>
                        {results['dcat:contactPoint']['vcard:hasEmail'] && (
                          <a
                            href={`mailto:${results['dcat:contactPoint']['vcard:hasEmail']}`}
                            className="o-btn o-btn--link dataset-detail__link"
                          >
                            {results['dcat:contactPoint']['vcard:fn']} (
                            {results['dcat:contactPoint']['vcard:hasEmail']})
                          </a>
                        )}
                        {!results['dcat:contactPoint']['vcard:hasEmail'] &&
                          results['dcat:contactPoint']['vcard:fn'] && (
                            <span>{results['dcat:contactPoint']['vcard:fn']}</span>
                          )}
                        {results['dcat:contactPoint']['vcard:hasURL'] && (
                          <a
                            href={results['dcat:contactPoint']['vcard:hasURL']}
                            className="o-btn o-btn--link dataset-detail__link"
                          >
                            {results['dcat:contactPoint']['vcard:hasURL']}
                          </a>
                        )}
                      </div>
                    </dd>
                    <dt>Technisch contactpersoon</dt>
                    <dd>
                      {results['dct:publisher']['foaf:mbox'] && (
                        <a
                          href={`mailto:${results['dct:publisher']['foaf:mbox']}`}
                          className="o-btn o-btn--link dataset-detail__link"
                        >
                          {results['dct:publisher']['foaf:name']} (
                          {results['dct:publisher']['foaf:mbox']})
                        </a>
                      )}
                      {!results['dct:publisher']['foaf:mbox'] &&
                        results['dct:publisher']['foaf:name'] && (
                          <span>{results['dct:publisher']['foaf:name']}</span>
                        )}
                      {results['dct:publisher']['foaf:homepage'] && (
                        <a
                          href={results['dct:publisher']['foaf:homepage']}
                          className="o-btn o-btn--link dataset-detail__link"
                        >
                          {results['dct:publisher']['foaf:homepage']}
                        </a>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="c-detail__block u-padding__bottom--1 u-margin__top--3">
                <div className="u-col-md--12">
                  <h3 className="o-header__subtitle">Thema&apos;s</h3>

                  <div className="catalog-themes">
                    {results['dcat:theme'].map((group: string) => (
                      <div className="catalog-theme">
                        <span className="catalog-theme__detail-icon--{{group.substring(6)}} catalog-theme__label">
                          {optionLabel(group.split(':')[1], catalogFilters.groupTypes)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="c-detail__block u-padding__bottom--1">
                <div className="u-col-md--12">
                  <h3 className="o-header__subtitle">Tags</h3>

                  {results['dcat:keyword'].map((tag: string) => (
                    <ul className="u-inline">
                      <li className="u-inline">
                        <div className="dataset-tag">
                          <i className="dataset-tag__arrow" />
                          <span className="dataset-tag__label">{capitalizeFirstLetter(tag)}</span>
                        </div>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>

              <div className="c-detail__block u-padding__bottom--1">
                <h3 className="o-header__subtitle">Licentie</h3>
                {results['ams:license'] && (
                  <div>{optionLabel(results['ams:license'], catalogFilters.licenseTypes)}</div>
                )}
              </div>
            </div>
          )}
          <div className="u-row">
            <div className="u-col-sm--12">
              <div className="u-margin__left--2 u-margin__bottom--2">
                <ShareBar />
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default DatasetDetail
