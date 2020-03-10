import React from 'react'
import styled from '@datapunt/asc-core'
import {
  Paragraph,
  Heading,
  CompactThemeProvider,
  Container,
  Row,
  themeColor,
  themeSpacing,
} from '@datapunt/asc-ui'
import TileGrid from './TileGrid'
import { TileGridItem, SizeOnBreakpoint } from './TileGridStyle'
import { Tile, TileLabel } from '../Tile'

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

export default {
  title: 'Composed/TileGridBlock',

  decorators: [
    (storyFn: () => React.ReactNode) => (
      <div style={{ padding: '40px 10px', margin: '0 auto' }}>{storyFn()}</div>
    ),
  ],
}

type Item = {
  title: string
  image?: string
}

type StoryProps = {
  items: Item[]
}

const Default: React.FC<StoryProps> = ({ items }) => {
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

  return (
    <Container>
      <Row>
        <TileGrid grid={GRID_TEMPLATE}>
          <FullColumnTileGridItem span={{ mobileL: [2, 2] }}>
            <Tile>
              {/*
              // @ts-ignore */}
              <StyledHeading forwardedAs="strong" styleAs="h1">
                Dossier
              </StyledHeading>
              <Heading gutterBottom={20} as="h3" styleAs="h1">
                Toerisme
              </Heading>
              <StyledParagraph strong>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci
                consectetur doloribus nobis non quam suscipit. Accusantium adipisci aperiam
                architecto blanditiis consectetur debitis delectus dolore doloremque earum explicabo
                impedit inventore labore minus nam, nemo nihil non odio officiis possimus quo
                ratione reiciendis rem reprehenderit saepe sed ullam unde vitae voluptas?
              </StyledParagraph>
            </Tile>
          </FullColumnTileGridItem>
          {items.map((item, i) => {
            // Only with 3 items, the first tile (the biggest) shouldn't have the compact style
            const Provider = items.length === 3 && i === 0 ? React.Fragment : CompactThemeProvider
            const span = GRID_ITEM_TEMPLATE[items.length][i]

            return (
              // eslint-disable-next-line react/no-array-index-key
              <TileGridItem key={i} span={span}>
                <Tile span={span} backgroundImageTemplate={item.image}>
                  <TileLabel>
                    <Provider>
                      <Paragraph strong gutterBottom={0}>
                        {item.title}
                      </Paragraph>
                    </Provider>
                  </TileLabel>
                </Tile>
              </TileGridItem>
            )
          })}
        </TileGrid>
      </Row>
    </Container>
  )
}

const exampleItem = {
  title: 'Lorem ipsum dolor sit amet',
  image: 'https://placekitten.com/%w/%h',
}

export const WithThreeImageCards = () => <Default items={new Array(3).fill(exampleItem)} />
export const WithFourImageCards = () => <Default items={new Array(4).fill(exampleItem)} />
export const WithFiveImageCards = () => <Default items={new Array(5).fill(exampleItem)} />
export const WithSixImageCards = () => <Default items={new Array(6).fill(exampleItem)} />
