import { DocumentEdit } from '@amsterdam/asc-assets'
import {
  Alert,
  breakpoint,
  Button,
  Column,
  Container,
  CustomHTMLBlock,
  Heading,
  Link,
  Row,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@amsterdam/asc-ui'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import marked from 'marked'
import { Fragment, FunctionComponent, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import type { DcatTemporal } from '../../../api/dcatd/datasets'
import getDatasetData from '../../../api/dcatd/datasets/getDatasetData'
import { NotFoundError } from '../../../shared/services/api/customError'
import { dcatdScopes, getScopes } from '../../../shared/services/auth/auth'
import type { DatasetFilterOption } from '../../../shared/services/datasets-filters/datasets-filters'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import DefinitionList, { DefinitionListItem } from '../../components/DefinitionList'
import PromiseResult from '../../components/PromiseResult/PromiseResult'
import ShareBar from '../../components/ShareBar/ShareBar'
import { toNotFound } from '../../links'
import formatDate from '../../utils/formatDate'
import redirectToDcatd from '../../utils/redirectToDcatd'
import {
  Content,
  DatasetDetailPageBlock,
  DatasetDetailPageButtonGroup,
  DatasetDetailPageHeader,
  DatasetDetailPageSubtitle,
  DatasetDetailPageTitle,
  StyledTableContainer,
  StyledTag,
  TagListItem,
} from './DatasetDetailPageStyles'

/**
 * Gets the label by the identifier of the specified options, if no option could be found it will default to the id.
 *
 * @param id The identifier of the option to match.
 * @param options The options to get the label from.
 */
function getOptionLabel(id: string, options: DatasetFilterOption[]) {
  return options.find((item) => item.id === id)?.label ?? id ?? ''
}

function getFileSize(bytes: number) {
  const precision = 1 // single decimal
  const base = 1024
  const log1024 = Math.log(base)
  const cutOff = 0.1 * 1024 * 1024 // 0.1 MB
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB'] // bytes and KB units not used
  const smallestUnit = 2 // index of units, === 'MB'
  const largestUnit = units.length - 1 // index of units, === 'TB'

  // eslint-disable-next-line no-restricted-globals
  if (!isFinite(bytes)) {
    return '-'
  }

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

function getTimePeriodLabel(period: DcatTemporal) {
  const startDate = period['time:hasBeginning'] ? new Date(period['time:hasBeginning']) : null
  const endDate = period['time:hasEnd'] ? new Date(period['time:hasEnd']) : null

  if (startDate && endDate) {
    return `${formatDate(startDate)} tot ${formatDate(endDate)}`
  }

  if (startDate) {
    return `Vanaf ${formatDate(startDate)}`
  }

  if (endDate) {
    return `Tot ${formatDate(endDate)}`
  }

  return null
}

// TODO: remove when Typography is aligned https://github.com/Amsterdam/amsterdam-styled-components/issues/727
const StyledCustomHTMLBlock = styled(CustomHTMLBlock)`
  & * {
    @media screen and ${breakpoint('min-width', 'laptop')} {
      font-size: 16px !important;
      line-height: 22px !important;
    }
  }
`

interface MarkdownProps {
  children: string
}

const Markdown: FunctionComponent<MarkdownProps> = ({ children }) => {
  const formattedContent = useMemo(() => marked(children), [children])

  return <StyledCustomHTMLBlock body={formattedContent} />
}

interface DatasetDetailPageParams {
  id: string
  slug: string
}

const DatasetDetailPage: FunctionComponent = () => {
  const { trackEvent } = useMatomo()
  const { id } = useParams<DatasetDetailPageParams>()
  const userScopes = getScopes()
  const history = useHistory()
  const canEdit = useMemo(
    () => userScopes.some((scope) => dcatdScopes.includes(scope)),
    [userScopes],
  )

  const onError = (e: Error) => {
    if (e instanceof NotFoundError && e.code === 404) {
      history.push(toNotFound())
    }
  }

  return (
    <ContentContainer className="qa-detail">
      <Container>
        <Row>
          <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
            <Content className="dataset-detail">
              <PromiseResult factory={() => getDatasetData(id)} deps={[id]} onError={onError}>
                {({ value: { resources, dataset, filters } }) => (
                  <>
                    <Helmet>
                      <meta name="description" content={dataset['dct:description']} />
                    </Helmet>
                    <DatasetDetailPageHeader>
                      <DatasetDetailPageTitle> {dataset['dct:title']}</DatasetDetailPageTitle>
                      <DatasetDetailPageSubtitle forwardedAs="h2">
                        <span>Dataset</span>
                        {canEdit && dataset['dct:identifier'] && (
                          <DatasetDetailPageButtonGroup>
                            <Button
                              variant="primaryInverted"
                              type="button"
                              iconLeft={<DocumentEdit />}
                              onClick={() => redirectToDcatd(dataset['dct:identifier'] as string)}
                            >
                              Wijzigen
                            </Button>
                          </DatasetDetailPageButtonGroup>
                        )}
                      </DatasetDetailPageSubtitle>
                    </DatasetDetailPageHeader>
                    <Markdown>{dataset['dct:description']}</Markdown>
                    <div>
                      {['gepland', 'in_onderzoek', 'niet_beschikbaar'].includes(
                        dataset['ams:status'],
                      ) && (
                        <Alert>
                          {dataset['ams:status'] === 'gepland' && 'Deze dataset is gepland.'}
                          {dataset['ams:status'] === 'in_onderzoek' &&
                            'De correctheid van deze dataset wordt momenteel onderzocht.'}
                          {dataset['ams:status'] === 'niet_beschikbaar' &&
                            'Deze dataset is momenteel niet beschikbaar'}
                        </Alert>
                      )}
                    </div>

                    <DatasetDetailPageSubtitle forwardedAs="h2">
                      Resources
                    </DatasetDetailPageSubtitle>

                    {resources.map((resource) => (
                      <Fragment key={resource.type}>
                        <Heading as="h3">
                          {getOptionLabel(resource.type, filters.resourceTypes)}
                        </Heading>
                        <StyledTableContainer>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableCell as="th">Naam</TableCell>
                                <TableCell as="th">Bestandstype</TableCell>
                                <TableCell as="th">Laatst gewijzigd</TableCell>
                                <TableCell as="th">Type</TableCell>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {resource.rows.map((row) => (
                                <TableRow key={row['dc:identifier']}>
                                  <TableCell>
                                    <Link
                                      href={row['ams:purl']}
                                      rel="noreferrer"
                                      target="_blank"
                                      variant="inline"
                                      onClick={() => {
                                        trackEvent({
                                          category: 'Download',
                                          action: dataset['dct:title'],
                                          name: row['ams:purl'],
                                        })
                                      }}
                                    >
                                      {row['dct:title']}
                                    </Link>
                                  </TableCell>
                                  <TableCell>
                                    {[
                                      getOptionLabel(
                                        row['dcat:mediaType'] ?? '',
                                        filters.formatTypes,
                                      ),
                                      getOptionLabel(row['ams:serviceType'], filters.serviceTypes),
                                    ]
                                      .filter((item) => item)
                                      .join(', ')}
                                  </TableCell>
                                  <TableCell>
                                    {row['dct:modified'] &&
                                      formatDate(new Date(row['dct:modified']))}
                                  </TableCell>
                                  <TableCell>
                                    {[
                                      getOptionLabel(
                                        row['ams:distributionType'],
                                        filters.distributionTypes,
                                      ),
                                      getFileSize(row['dcat:byteSize'] ?? 0),
                                      getOptionLabel(row['dcat:serviceType'], filters.serviceTypes),
                                    ]
                                      .filter((item) => item)
                                      .join(', ')}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </StyledTableContainer>
                      </Fragment>
                    ))}

                    <div>
                      <DatasetDetailPageSubtitle forwardedAs="h2">
                        Details
                      </DatasetDetailPageSubtitle>
                      <DefinitionList>
                        <DefinitionListItem term="Doel">
                          <Markdown>{dataset['overheidds:doel']}</Markdown>
                        </DefinitionListItem>
                        {dataset['dcat:landingPage'] && (
                          <DefinitionListItem term="Meer informatie">
                            <Link
                              href={dataset['dcat:landingPage']}
                              title={dataset['dcat:landingPage']}
                            >
                              {dataset['dcat:landingPage']}
                            </Link>
                          </DefinitionListItem>
                        )}
                        <DefinitionListItem term="Publicatiedatum">
                          {formatDate(new Date(dataset['foaf:isPrimaryTopicOf']['dct:issued']))}
                        </DefinitionListItem>
                        {dataset['ams:sort_modified'] && (
                          <DefinitionListItem term="Wijzigingsdatum">
                            {formatDate(new Date(dataset['ams:sort_modified']))}
                          </DefinitionListItem>
                        )}
                        {dataset['dct:accrualPeriodicity'] && (
                          <DefinitionListItem term="Wijzigingsfrequentie">
                            {getOptionLabel(
                              dataset['dct:accrualPeriodicity'],
                              filters.accrualPeriodicities,
                            )}
                          </DefinitionListItem>
                        )}
                        {dataset['dct:temporal'] && (
                          <DefinitionListItem term="Tijdsperiode">
                            {getTimePeriodLabel(dataset['dct:temporal'])}
                          </DefinitionListItem>
                        )}
                        {dataset['ams:temporalUnit'] && (
                          <DefinitionListItem term="Tijdseenheid">
                            {getOptionLabel(dataset['ams:temporalUnit'], filters.temporalUnits)}
                          </DefinitionListItem>
                        )}
                        {dataset['ams:spatialDescription'] && (
                          <DefinitionListItem term="Omschrijving gebied">
                            {dataset['ams:spatialDescription']}
                          </DefinitionListItem>
                        )}
                        {dataset['dct:spatial'] && (
                          <DefinitionListItem term="Coördinaten gebied">
                            {dataset['dct:spatial']}
                          </DefinitionListItem>
                        )}
                        {dataset['ams:spatialUnit'] && (
                          <DefinitionListItem term="Gebiedseenheid">
                            {getOptionLabel(dataset['ams:spatialUnit'], filters.spatialUnits)}
                          </DefinitionListItem>
                        )}
                        {dataset['overheid:grondslag'] && (
                          <DefinitionListItem term="Juridische grondslag">
                            <Markdown>{dataset['overheid:grondslag']}</Markdown>
                          </DefinitionListItem>
                        )}
                        {dataset['dct:language'] && (
                          <DefinitionListItem term="Taal">
                            {getOptionLabel(
                              dataset['dct:language'].split(':').pop() ?? '',
                              filters.languages,
                            )}
                          </DefinitionListItem>
                        )}
                        <DefinitionListItem term="Eigenaar">
                          {getOptionLabel(dataset['ams:owner'], filters.ownerTypes)}
                        </DefinitionListItem>
                        <DefinitionListItem term="Inhoudelijk contactpersoon">
                          {dataset['dcat:contactPoint']['vcard:hasEmail'] && (
                            <Link
                              inList
                              title={dataset['dcat:contactPoint']['vcard:fn']}
                              href={`mailto:${dataset['dcat:contactPoint']['vcard:hasEmail']}`}
                            >
                              {dataset['dcat:contactPoint']['vcard:fn']} (
                              {dataset['dcat:contactPoint']['vcard:hasEmail']})
                            </Link>
                          )}
                          {!dataset['dcat:contactPoint']['vcard:hasEmail'] &&
                            dataset['dcat:contactPoint']['vcard:fn'] && (
                              <span>{dataset['dcat:contactPoint']['vcard:fn']}</span>
                            )}
                          {dataset['dcat:contactPoint']['vcard:hasURL'] && (
                            <Link
                              inList
                              href={dataset['dcat:contactPoint']['vcard:hasURL']}
                              title={dataset['dcat:contactPoint']['vcard:hasURL']}
                            >
                              {dataset['dcat:contactPoint']['vcard:hasURL']}
                            </Link>
                          )}
                        </DefinitionListItem>
                        <DefinitionListItem term="Technisch contactpersoon">
                          {dataset['dct:publisher']['foaf:mbox'] && (
                            <Link
                              inList
                              href={`mailto:${dataset['dct:publisher']['foaf:mbox']}`}
                              title={dataset['dct:publisher']['foaf:name']}
                            >
                              {dataset['dct:publisher']['foaf:name']} (
                              {dataset['dct:publisher']['foaf:mbox']})
                            </Link>
                          )}
                          {!dataset['dct:publisher']['foaf:mbox'] &&
                            dataset['dct:publisher']['foaf:name'] && (
                              <span>{dataset['dct:publisher']['foaf:name']}</span>
                            )}
                          {dataset['dct:publisher']['foaf:homepage'] && (
                            <Link
                              inList
                              href={dataset['dct:publisher']['foaf:homepage']}
                              title={dataset['dct:publisher']['foaf:homepage']}
                            >
                              {dataset['dct:publisher']['foaf:homepage']}
                            </Link>
                          )}
                        </DefinitionListItem>
                      </DefinitionList>
                    </div>

                    <DatasetDetailPageBlock>
                      <DatasetDetailPageSubtitle forwardedAs="h2">
                        Thema&apos;s
                      </DatasetDetailPageSubtitle>
                      <ul>
                        {dataset['dcat:theme'].map((group: string) => (
                          <StyledTag key={group} forwardedAs="li">
                            {getOptionLabel(group.split(':')[1], filters.groupTypes)}
                          </StyledTag>
                        ))}
                      </ul>
                    </DatasetDetailPageBlock>

                    <DatasetDetailPageBlock>
                      <DatasetDetailPageSubtitle forwardedAs="h2">Tags</DatasetDetailPageSubtitle>
                      <ul>
                        {dataset['dcat:keyword'].map((tag: string) => (
                          <TagListItem key={tag}>
                            <StyledTag>{tag}</StyledTag>
                          </TagListItem>
                        ))}
                      </ul>
                    </DatasetDetailPageBlock>

                    <DatasetDetailPageBlock>
                      <DatasetDetailPageSubtitle forwardedAs="h2">
                        Licentie
                      </DatasetDetailPageSubtitle>
                      {dataset['ams:license'] && (
                        <div>{getOptionLabel(dataset['ams:license'], filters.licenseTypes)}</div>
                      )}
                    </DatasetDetailPageBlock>
                  </>
                )}
              </PromiseResult>
            </Content>
          </Column>
          <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
            <ShareBar />
          </Column>
        </Row>
      </Container>
    </ContentContainer>
  )
}

export default DatasetDetailPage
