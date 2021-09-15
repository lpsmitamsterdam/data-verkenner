import { MAPPAGE } from '../support/selectorsNew'
import { routing } from '../../src/routes'
import environment from '../../src/environment'

describe('map page', () => {
  describe('user should be able to use the map', () => {
    beforeEach(() => {
      cy.visit('/data/geozoek')
    })

    it('should render the leaflet map', () => {
      cy.get('.leaflet-container').should('be.visible')
    })

    it('user should be able to switch between satellite images and topographic map', () => {
      cy.get(MAPPAGE.baseLayerToggle).should('be.visible')

      cy.get(MAPPAGE.baseLayerToggle).click()
      cy.url().should('include', 'achtergrond=lf2020')
    })

    it('user should be able to toggle the legend drawer', () => {
      cy.get(MAPPAGE.legendaButton).should('be.visible')
      cy.get(MAPPAGE.drawerContent).should('not.be.visible')
      cy.get(MAPPAGE.legendaButton).click()
      cy.get(MAPPAGE.drawerContent).should('be.visible')
    })

    it('should add a map-layer to the leaflet map', () => {
      cy.visit(`/${routing.data.path}?$center=52.3731081%2C4.8932945&modus=kaart`)
      cy.get(MAPPAGE.legendaButton).click()
      cy.get(MAPPAGE.mapPanelHandle).should('be.visible')
      cy.get(MAPPAGE.mapLegendLayerButtonAfvalcontainers).click()
      cy.url().should('not.include', 'lagen=afvlc-wlorst')
      cy.get(MAPPAGE.mapLayerLegendRestafval).click()
      cy.url().should('include', 'lagen=afvlc-wlorst')
    })
  })

  describe('as loggedin', () => {
    it('should see more logged in', () => {
      cy.login({
        root: 'https://iam.amsterdam.nl',
        realm: environment.KEYCLOAK_REALM,
        username: environment.KEYCLOAK_USERNAME,
        password: environment.KEYCLOAK_PASSWORD,
        client_id: environment.KEYCLOAK_CLIENT,
        redirect_uri: environment.ROOT,
      })

      cy.visit('/data/geozoek')

      cy.wait(5000)
    })
  })
})
