import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'
import type { FunctionComponent } from 'react'
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Link,
  themeColor,
} from '@amsterdam/asc-ui'
import getDetailPageData from '../../utils/getDetailPageData'
import { toDataDetail } from '../../links'
import DataSelectionFormatter from './DataSelectionFormatter/DataSelectionFormatter'
import type { Data } from './types'

const StyledTableCell = styled(TableCell)`
  white-space: nowrap;
`
const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: ${themeColor('tint', 'level3')};
  }
`
export interface DataSelectionTableProps {
  content: Data
}

const DataSelectionTable: FunctionComponent<DataSelectionTableProps> = ({ content }) =>
  content.body.length > 0 ? (
    <TableContainer>
      <Table data-testid="dataSelectionTable">
        <TableHeader>
          <TableRow>
            {content.head.map((field) => (
              <StyledTableCell as="th" key={field} scope="col">
                {field}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {content.body.map((row) => (
            <StyledTableRow key={row.id} data-testid="dataSelectionTableRow">
              {row.content.map((variables, index) => {
                if (index === 0) {
                  return (
                    <StyledTableCell key={variables[0].id}>
                      <Link
                        variant="inline"
                        as={RouterLink}
                        to={toDataDetail(getDetailPageData(row.detailEndpoint as string))}
                      >
                        <DataSelectionFormatter
                          variables={variables}
                          formatter={content.formatters[index]}
                          template={content.templates[index]}
                        />
                      </Link>
                    </StyledTableCell>
                  )
                }
                return (
                  <StyledTableCell key={variables[0].id}>
                    <DataSelectionFormatter
                      variables={variables}
                      formatter={content.formatters[index]}
                      template={content.templates[index]}
                    />
                  </StyledTableCell>
                )
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null

export default DataSelectionTable
