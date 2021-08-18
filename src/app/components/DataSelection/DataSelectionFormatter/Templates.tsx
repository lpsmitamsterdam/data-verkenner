import classNames from 'classnames'
import type { FunctionComponent } from 'react'
import styled from 'styled-components'
import type { DataBodyContent } from '../types'

interface FormattedValue {
  name: string
  count?: string
}

interface Props {
  variables: DataBodyContent[] | { [key: string]: string }
  formattedValue: FormattedValue[]
}

const BezoekAdres: FunctionComponent<Props> = ({ variables, formattedValue }) => (
  <div
    className={classNames({
      'c-bezoekadres__non-mailing': !Array.isArray(variables) && variables.non_mailing,
    })}
  >
    {formattedValue}
  </div>
)

const FileType: FunctionComponent<Props> = ({ formattedValue }) => (
  <div>
    {formattedValue.map((fileType) => (
      <div className="c-data-selection-file-type">
        <span
          className={`c-data-selection-file-type__name c-data-selection-file-type__format-${fileType.name.toLowerCase()}`}
        >
          {fileType.name ? <span>{fileType.name}</span> : <span>?</span>}
        </span>
        <span className="c-data-selection-file-type__x">x</span>
        <span className="c-data-selection-file-type__count">{fileType.count}</span>
      </div>
    ))}
  </div>
)

// Note: these styles where converted from old sass files to SC
// Handelsnaam and SBI omschrijving could be very long, this prevents a unnecessary wide table cell
const HandelsnaamStyle = styled.span`
  display: inline-block;
  width: 400px;
  white-space: normal;
`

const SBIOmschrijvingStyle = styled.span`
  display: inline-block;
  width: 700px;
  white-space: normal;
`

const HandelsNaam: FunctionComponent<Props> = ({ variables }) => (
  <HandelsnaamStyle>{!Array.isArray(variables) ? variables?.handelsnaam : ''}</HandelsnaamStyle>
)

const SBIOmschrijving: FunctionComponent<Props> = ({ variables }) => (
  <SBIOmschrijvingStyle>{variables?.[0]?.value}</SBIOmschrijvingStyle>
)

const TagWrapper = styled.div`
  display: inline;
`

const Tags: FunctionComponent<Props> = ({ formattedValue }) => (
  <div>
    {formattedValue.map((tag) => (
      <TagWrapper>
        <span className="o-tag o-tag--small">{tag.name}</span>
      </TagWrapper>
    ))}
  </div>
)

export { SBIOmschrijving, BezoekAdres, FileType, HandelsNaam, Tags }
