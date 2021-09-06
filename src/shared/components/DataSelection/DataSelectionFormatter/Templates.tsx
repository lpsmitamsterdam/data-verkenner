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

export { SBIOmschrijving, BezoekAdres, HandelsNaam }
