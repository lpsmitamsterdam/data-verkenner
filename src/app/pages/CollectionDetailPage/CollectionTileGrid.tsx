import React from 'react'
import styled from 'styled-components'
import {
  CompactThemeProvider,
  Heading,
  Paragraph,
  themeColor,
  themeSpacing,
} from '@datapunt/asc-ui'
import RouterLink from 'redux-first-router-link'
import { Tile, TileLabel } from '../../components/Tile'
import { SizeOnBreakpoint, TileGridItem } from '../../components/TileGrid/TileGridStyle'
import TileGrid from '../../components/TileGrid/TileGrid'
import { CMSResultItem } from '../../utils/useFromCMS'

const FullColumnTileGridItem = styled(TileGridItem)`
  flex-basis: 100% !important; // IE11
`

const StyledHeading = styled(Heading)`
  color: ${themeColor('tint', 'level1')};
`

const StyledParagraph = styled(Paragraph)`
  color: ${themeColor('tint', 'level1')};
  margin-top: ${themeSpacing(4)};
`

type Props = {
  results: CMSResultItem[]
  loading: boolean
  title?: string
  description?: string
}

type Template = {
  3: [SizeOnBreakpoint, SizeOnBreakpoint, SizeOnBreakpoint]
  4: [SizeOnBreakpoint, SizeOnBreakpoint, SizeOnBreakpoint, SizeOnBreakpoint]
  5: [SizeOnBreakpoint, SizeOnBreakpoint, SizeOnBreakpoint, SizeOnBreakpoint, SizeOnBreakpoint]
  6: [
    SizeOnBreakpoint,
    SizeOnBreakpoint,
    SizeOnBreakpoint,
    SizeOnBreakpoint,
    SizeOnBreakpoint,
    SizeOnBreakpoint,
  ]
  [key: number]: SizeOnBreakpoint[]
}

const GRID_ITEM_TEMPLATE: Template = {
  3: [
    { mobileL: [2, 2], tabletM: [2, 2], laptop: [2, 2] },
    { mobileL: [2, 2], tabletM: [1, 2], laptop: [1, 1] },
    { mobileL: [2, 2], tabletM: [1, 2], laptop: [1, 1] },
  ],
  4: [
    { mobileL: [1, 2], tabletM: [1, 2], laptop: [1, 2] },
    { mobileL: [1, 2], tabletM: [1, 2], laptop: [1, 1] },
    { mobileL: [1, 2], tabletM: [1, 2], laptop: [1, 1] },
    { mobileL: [1, 2], tabletM: [1, 2], laptop: [1, 2] },
  ],
  5: [
    { mobileL: [2, 2], tabletS: [1, 2], laptop: [1, 2] },
    { mobileL: [2, 2], tabletS: [1, 2], laptop: [1, 1] },
    { mobileL: [2, 2], tabletS: [1, 2], laptop: [1, 1] },
    { mobileL: [2, 2], tabletS: [1, 2], laptop: [1, 1] },
    { mobileL: [2, 2], tabletS: [1, 2], laptop: [1, 1] },
  ],
  6: [
    { mobileL: [1, 2], tabletM: [1, 2], laptop: [1, 1] },
    { mobileL: [1, 2], tabletM: [1, 2], laptop: [1, 1] },
    { mobileL: [2, 2], tabletM: [1, 2], laptop: [1, 1] },
    { mobileL: [2, 2], tabletM: [1, 2], laptop: [1, 1] },
    { mobileL: [2, 2], tabletM: [1, 2], laptop: [1, 1] },
    { mobileL: [2, 2], tabletM: [1, 2], laptop: [1, 1] },
  ],
}

const GRID_TEMPLATE: SizeOnBreakpoint = { mobileL: [1, 1], tabletM: [1, 4], laptop: [1, 5] }

const CollectionTileGrid: React.FC<Props> = ({ results, loading, title, description }) => (
  <TileGrid grid={GRID_TEMPLATE}>
    <FullColumnTileGridItem span={{ mobileL: [2, 2] }}>
      <Tile as="div" isLoading={loading}>
        {/*
              // @ts-ignore */}
        <StyledHeading forwardedAs="strong" styleAs="h1">
          Dossier
        </StyledHeading>
        <Heading gutterBottom={20} as="h3" styleAs="h1">
          {title}
        </Heading>
        {/*
        // @ts-ignore */}
        <StyledParagraph strong dangerouslySetInnerHTML={{ __html: description }} />
      </Tile>
    </FullColumnTileGridItem>
    {results.map((item, i) => {
      // Only with 3 items, the first tile (the biggest) shouldn't have the compact style
      const Provider = results.length === 3 && i === 0 ? React.Fragment : CompactThemeProvider
      const span = GRID_ITEM_TEMPLATE[results.length][i]
      return (
        <TileGridItem key={item.id} span={span}>
          {/*
                    // @ts-ignore */}
          <Tile
            isLoading={loading}
            forwardedAs={RouterLink}
            to={item.to}
            span={span}
            backgroundImage={item.teaserImage || '/assets/images/not_found_thumbnail.jpg'}
          >
            <TileLabel>
              <Provider>
                <Paragraph strong gutterBottom={0}>
                  {item.shortTitle || item.title}
                </Paragraph>
              </Provider>
            </TileLabel>
          </Tile>
        </TileGridItem>
      )
    })}
  </TileGrid>
)

export default CollectionTileGrid
