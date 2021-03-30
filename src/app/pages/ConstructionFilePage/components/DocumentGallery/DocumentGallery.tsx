import { Enlarge, Minimise } from '@amsterdam/asc-assets'
import { Alert, Column, Heading, Link, Row, themeColor, themeSpacing } from '@amsterdam/asc-ui'
import { FunctionComponent, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Document } from '../../../../../api/iiif-metadata/bouwdossier'
import { NOT_FOUND_THUMBNAIL } from '../../../../../shared/config/constants'
import { getUserScopes } from '../../../../../shared/ducks/user/user'
import { SCOPES } from '../../../../../shared/services/auth/auth'
import ActionButton from '../../../../components/ActionButton/ActionButton'
import { toConstructionFile } from '../../../../links'
import { useAuthToken } from '../../AuthTokenContext'
import IIIFThumbnail from '../IIIFThumbnail'
import LinkButton from '../LinkButton'
import LoginLinkButton from '../LoginLinkButton'

const StyledAlert = styled(Alert)`
  margin-bottom: ${themeSpacing(5)} !important;
`

const GalleryContainer = styled.div`
  border-bottom: 1px solid ${themeColor('tint', 'level3')};
  padding: ${themeSpacing(5, 5, 10, 5)};
`

const StyledRow = styled(Row)<{ hasMarginBottom: boolean }>`
  justify-content: flex-start;
  margin-bottom: ${({ hasMarginBottom }) => (hasMarginBottom ? themeSpacing(8) : 0)};
`

const StyledColumn = styled(Column)`
  margin-right: ${themeSpacing(4)};
  margin-bottom: ${themeSpacing(4)};
`

const StyledLink = styled(Link)<{ disabled: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  display: inline-block;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: no-drop;

      & * {
        cursor: no-drop;
      }
    `}

  // To make the link square
  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  & > * {
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
  }
`

const MAX_LENGTH = 6

export interface DocumentGalleryProps {
  fileId: string
  document: Document
  onRequestLoginLink: () => void
}

const DocumentGallery: FunctionComponent<DocumentGalleryProps> = ({
  fileId,
  document,
  onRequestLoginLink,
  ...otherProps
}) => {
  const lessFiles = useMemo(() => document.bestanden.slice(0, MAX_LENGTH), [document.bestanden])
  const [files, setFiles] = useState(lessFiles)
  const scopes = useSelector(getUserScopes)
  const token = useAuthToken()
  const tokenQueryString = useMemo(
    () => (token ? `?${new URLSearchParams({ auth: token }).toString()}` : ''),
    [token],
  )

  const hasRights = scopes.includes(SCOPES['BD/R']) || !!token
  const hasExtendedRights = scopes.includes(SCOPES['BD/X'])

  const hasMore = document.bestanden.length > MAX_LENGTH
  const restricted = document.access === 'RESTRICTED'

  return (
    <GalleryContainer {...otherProps}>
      {files.length ? (
        <>
          {!hasRights && !hasExtendedRights ? (
            <StyledAlert level="info" dismissible data-testid="noRights">
              <div>
                U kunt hier{' '}
                <LinkButton type="button" onClick={onRequestLoginLink}>
                  toegang aanvragen
                </LinkButton>{' '}
                om de om bouw- en omgevingsdossiers in te zien. Medewerkers/ketenpartners van
                Gemeente Amsterdam kunnen <LoginLinkButton>inloggen</LoginLinkButton> om deze te
                bekijken.
              </div>
            </StyledAlert>
          ) : (
            restricted &&
            !hasExtendedRights && (
              <StyledAlert level="info" dismissible data-testid="noExtendedRights">
                <div>
                  Medewerkers/ketenpartners van Gemeente Amsterdam met extra bevoegdheden kunnen{' '}
                  <LoginLinkButton>inloggen</LoginLinkButton> om alle bouw- en omgevingsdossiers te
                  bekijken.
                </div>
              </StyledAlert>
            )
          )}

          <StyledRow hasMarginBottom={hasMore} hasMargin={false} hasMaxWidth={false}>
            {files.map((file) => {
              const disabled =
                (!hasRights && !hasExtendedRights) || (restricted && !hasExtendedRights)

              return (
                <StyledColumn
                  key={file.url}
                  span={{ small: 1, medium: 2, big: 2, large: 2, xLarge: 2 }}
                  data-testid="fileResult"
                >
                  {/*
                  // @ts-ignore */}
                  <StyledLink
                    forwardedAs={disabled ? 'span' : RouterLink}
                    to={toConstructionFile(fileId, file.filename, file.url)}
                    title={file.filename}
                    disabled={disabled}
                    data-testid="detailLink"
                  >
                    <IIIFThumbnail
                      src={
                        disabled
                          ? NOT_FOUND_THUMBNAIL // use the default not found image when user has no rights
                          : `${file.url}/square/180,180/0/default.jpg${tokenQueryString}`
                      }
                      title={file.filename}
                      data-testid="thumbnail"
                    />
                  </StyledLink>
                </StyledColumn>
              )
            })}
          </StyledRow>
          {hasMore &&
            (document.bestanden.length !== files.length ? (
              <ActionButton
                fetching={false}
                iconLeft={<Enlarge />}
                onClick={() => setFiles(document.bestanden)}
                label={`Toon alle (${document.bestanden.length})`}
                data-testid="showMore"
              />
            ) : (
              <ActionButton
                fetching={false}
                iconLeft={<Minimise />}
                onClick={() => setFiles(lessFiles)}
                label="Minder tonen"
                data-testid="showLess"
              />
            ))}
        </>
      ) : (
        <Heading as="em" data-testid="noResults">
          Geen bouwtekening(en) beschikbaar.
        </Heading>
      )}
    </GalleryContainer>
  )
}

export default DocumentGallery
