import { Heading, Link, Paragraph } from '@amsterdam/asc-ui'
import type { FunctionComponent } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { login } from '../../utils/auth/auth'
import { toAddresses, toCadastralObjects, toEstablishments } from '../../../links'
import { StyledList, StyledListItem } from './NoSearchResults'
import { formatNoResultsMessage } from './utils'

export interface NoDataSearchResultsProps {
  query: string
  unauthorized: string[]
}

const NoDataSearchResults: FunctionComponent<NoDataSearchResultsProps> = ({
  query,
  unauthorized,
  ...otherProps
}) => {
  const handleLogin = () => {
    login()
  }

  return (
    <div {...otherProps}>
      <Paragraph>{formatNoResultsMessage(query, 'Data')}</Paragraph>
      <Heading as="h2">Algemene zoeksuggesties</Heading>
      <Paragraph>Maak de zoekcriteria eventueel minder specifiek. </Paragraph>
      <Paragraph>Zoeken binnen ‘Data’ kan op de volgende onderdelen:</Paragraph>
      <Heading as="h3">Adressen, straatnamen en andere openbare ruimtes</Heading>
      <StyledList>
        <StyledListItem>
          Naam of postcode (eventueel met huisnummer, letter en toevoeging).
        </StyledListItem>
        <StyledListItem>
          BAG-identificatie (landelijke 16-cijferig nummer van openbare ruimte, nummeraanduiding,
          verblijfsobject, standplaats, of ligplaats).
        </StyledListItem>
        <StyledListItem>
          Blader (en filter) door de{' '}
          <Link variant="inline" as={RouterLink} to={toAddresses()}>
            adressentabel
          </Link>
          .
        </StyledListItem>
      </StyledList>
      <Heading as="h3">Panden</Heading>
      <Paragraph>Zoek panden op pandnaam en bag-identificatie.</Paragraph>
      <Heading as="h3">Kadastrale objecten</Heading>
      <StyledList>
        <StyledListItem>
          Zoek kadastrale objecten op (delen van) kadastrale aanduiding.
        </StyledListItem>
        <StyledListItem>
          Blader (en filter) door de{' '}
          <Link variant="inline" as={RouterLink} to={toCadastralObjects()}>
            kadastertabel
          </Link>
          .
        </StyledListItem>
      </StyledList>
      <Heading as="h3">Gebieden</Heading>
      <Paragraph>Zoek gebieden op naam en bouwblokken op bouwblokcode.</Paragraph>
      <Heading as="h3">Meetbouten</Heading>
      <Paragraph>Zoek gebieden op meetboutnummer of bouwblokcode.</Paragraph>
      <Heading as="h3">Monumenten</Heading>
      <Paragraph>Zoek monumenten op naam.</Paragraph>
      <Heading as="h3">bouw- en omgevingsdossiers</Heading>
      <Paragraph>
        Zoek bouw- en omgevingsdossiers op stadsdeelcode met dossiernummer of op OLO of liaan nummer
        met voorvoegsel OLO (bijv: &lsquo;OLO123121&lsquo;).
      </Paragraph>
      <br />
      <br />
      <Heading as="h2">Ingelogde medewerkers</Heading>
      {!!unauthorized && (
        <Paragraph>
          Medewerkers/ketenpartners van Gemeente Amsterdam kunnen{' '}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link variant="inline" as="button" onClick={handleLogin}>
            inloggen
          </Link>{' '}
          om meer gegevens te zien.
        </Paragraph>
      )}
      <Heading as="h3">Vestigingen</Heading>
      <StyledList>
        <StyledListItem>
          Zoek vestigingen (alleen voor ingelogde gebruikers) op handelsnaam of vestigingsnummer
        </StyledListItem>
        <StyledListItem>
          Blader (en filter) door de{' '}
          <Link variant="inline" as={RouterLink} to={toEstablishments()}>
            handelsregistertabel
          </Link>
          .
        </StyledListItem>
      </StyledList>
      <Heading as="h3">Maatschappelijke activiteiten</Heading>
      <Paragraph>
        Zoek maatschappelijke activiteiten (alleen voor ingelogde gebruikers) op handelsnaam of
        KvK-nummer.
      </Paragraph>
      <Heading as="h3">Kadastrale subjecten</Heading>
      <Paragraph>
        Zoek kadastrale subjecten (natuurlijke en niet-natuurlijke personen, alleen voor ingelogde
        gebruikers) op naam.
      </Paragraph>
    </div>
  )
}

export default NoDataSearchResults
