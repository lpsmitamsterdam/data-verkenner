import {
  Paragraph,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from '@amsterdam/asc-ui'
import type { FunctionComponent } from 'react'
import type { DetailResultItemTable } from '../../legacy/types/details'

export interface DetailTableProps {
  item: DetailResultItemTable
}

const DetailTable: FunctionComponent<DetailTableProps> = ({ item }) =>
  item.values?.length ? (
    <TableContainer data-testid="detailTable">
      <Table>
        <TableHeader>
          <TableRow>
            {item.headings.map(({ key, title }) => (
              <TableCell as="th" key={key}>
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {item.values.map((value, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={index}>
              {item.headings.map(({ key }) => (
                <TableCell key={key}>{value[key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Paragraph>Geen resultaten gevonden</Paragraph>
  )

export default DetailTable
