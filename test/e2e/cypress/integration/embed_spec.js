import { HEADER, MAP } from '../support/selectors'
import { routing } from '../../../../src/app/routes'
import PARAMETERS from '../../../../src/store/parameters'

const { VIEW, VIEW_CENTER, LAYERS, LEGEND, EMBED_PREVIEW } = PARAMETERS

describe('embed module', () => {
  beforeEach(() => {
    cy.server()
    cy.route('POST', '/cms_search/graphql/').as('graphql')
    cy.hidePopup()
  })
  it('should show the user the embed preview of the hoogte map', () => {
    cy.visit(
      `/${routing.data.path}?${VIEW_CENTER}=52.3617139%2C4.8888734&${LAYERS}=bgem%3A1%7Ckgem%3A1%7Cksec%3A0%7Ckot%3A0&${LEGEND}=true&${VIEW}=kaart`,
    )
    cy.wait('@graphql')
    cy.get(HEADER.root).should('exist')
    cy.get('#Hoogte').check()
    cy.get(MAP.contextMenu).click().get(`${MAP.contextMenuItemEmbed}`).click()
    cy.get(HEADER.root).should('not.exist')
    cy.url().should(
      'include',
      `?${VIEW}=kaart&${VIEW_CENTER}=52.3617139%2C4.8888734&${EMBED_PREVIEW}=true&${LAYERS}=bgem%3A1%7Ckgem%3A1%7Cksec%3A0%7Ckot%3A0%7Chgte-dtm%3A1%7Chgte-dsm%3A1%7Chgte-nap%3A1%7Chgte-mbs%3A1%7Chgte-mbz%3A1%7Chgte-mbr%3A1&${LEGEND}=true`,
    )
  })

  it('should show the user the embed view of the hoogte map', () => {
    cy.visit(
      `/data/?${VIEW}=kaart&${VIEW_CENTER}=52.3617139%2C4.8888734&embed=true&${LAYERS}=gebind-buurt%3A1%7Cgebind-bc%3A1%7Cgebind-sd%3A1%7Cgebind-bbn%3A1%7Cgebind-ggwpg%3A1%7Cgebind-ggwg%3A1%7Cgebind-ggro%3A1%7Cgebind-ggra%3A1&${LEGEND}=true&zoom=9`,
    )
    cy.wait('@graphql')
    cy.get(HEADER.root).should('not.exist')
    cy.get(MAP.embedButton).contains('data.amsterdam.nl').should('exist').and('be.visible')
    // this link has layers active
    cy.get(MAP.imageLayer).should('exist')
    cy.get(MAP.mapLegend).should('be.visible')
    cy.get('[type=checkbox]').should('have.length', 10).and('be.checked')
    cy.get('#gebind-ggw').uncheck()
    cy.get('[type=checkbox]').should('have.length', 8)
  })
  it('should show the user the embed view of the taxi map', () => {
    cy.visit('/themakaart/taxi')
    cy.wait('@graphql')
    cy.get(MAP.contextMenu).click().get(`${MAP.contextMenuItemEmbed}`).click()
    cy.get(HEADER.root).should('not.exist')
    cy.url().should(
      'include',
      `/data/?${VIEW}=kaart&${EMBED_PREVIEW}=true&${LAYERS}=themtaxi-bgt%3A1%7Cthemtaxi-tar%3A1%7Cthemtaxi-pvrts%3A1%7Cthemtaxi-mzt%3A1%7Cthemtaxi-oovtig%3A1%7Cthemtaxi-vezips%3A1%7Cthemtaxi-slpnb%3A1%7Cthemtaxi-slpb%3A1%7Cthemtaxi-nlpnb%3A1%7Cthemtaxi-nlpb%3A1&${LEGEND}=true`,
    )
  })
  it('should show the user the embed view of the taxi map', () => {
    cy.visit(
      `/data/?${VIEW}=kaart&embed=true=true&${LAYERS}=themtaxi-bgt%3A1%7Cthemtaxi-tar%3A1%7Cthemtaxi-pvrts%3A1%7Cthemtaxi-mzt%3A1%7Cthemtaxi-oovtig%3A1%7Cthemtaxi-vezips%3A1%7Cthemtaxi-slpnb%3A1%7Cthemtaxi-slpb%3A1%7Cthemtaxi-nlpnb%3A1%7Cthemtaxi-nlpb%3A1&${LEGEND}=true`,
    )
    cy.get(HEADER.root).should('not.exist')
    cy.get(MAP.embedButton).contains('data.amsterdam.nl').should('exist').and('be.visible')
    cy.get(MAP.imageLayer).should('exist')
    cy.get(MAP.mapLegend).should('be.visible')
    cy.get('[type=checkbox]').should('have.length', 12).and('be.checked')
    cy.get('#themtaxi-oplsnl').uncheck()
    cy.get('[type=checkbox]').should('have.length', 10)
  })
})
