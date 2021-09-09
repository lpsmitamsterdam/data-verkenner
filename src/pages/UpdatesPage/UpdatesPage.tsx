import {
  Column,
  Container,
  Heading,
  Row,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  themeColor,
} from '@amsterdam/asc-ui'
import type { FunctionComponent } from 'react'
import styled from 'styled-components'
import { getMetadata } from '../../api/metadata'
import ContentContainer from '../../shared/components/ContentContainer/ContentContainer'
import PromiseResult from '../../shared/components/PromiseResult/PromiseResult'

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: ${themeColor('tint', 'level3')};
  }
`

const UpdatesPage: FunctionComponent = () => (
  <ContentContainer>
    <Container>
      <Row>
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <div>
            <Heading>Actualiteit</Heading>
            <div>
              <PromiseResult factory={() => getMetadata()}>
                {({ value }) => (
                  <TableContainer>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableCell as="th">Thema</TableCell>
                          <TableCell as="th">Actualisatie (aanmaak producten)</TableCell>
                          <TableCell as="th">Peildatum gegevens</TableCell>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {value.map((source) => (
                          <StyledTableRow>
                            {source.title && <TableCell>{source.title}</TableCell>}
                            <TableCell>{source.update_frequency}</TableCell>
                            <TableCell>{source.data_modified_date}</TableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </PromiseResult>
            </div>
          </div>
        </Column>
      </Row>
    </Container>
  </ContentContainer>
)

export default UpdatesPage
